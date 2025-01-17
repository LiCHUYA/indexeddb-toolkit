import ResponseMessages from '../../constant'
import { useDatabase } from '../index'
import { logger } from '../../utils/logger'
import { isTableExist } from '../../helper'
import { createTable } from '../table'

interface SaveFileOptions {
  generateThumbnail?: boolean  // 是否生成缩略图，仅对图片有效，默认 false
  thumbnailSize?: number       // 缩略图尺寸，默认 100px
  generateUrl?: boolean        // 是否生成URL，默认 true
}

interface FileBaseInfo {
  name: string           // 文件名
  type: string           // 文件类型
  size: number          // 文件大小
  lastModified: number  // 最后修改时间
  width?: number        // 图片宽度
  height?: number       // 图片高度
  fileShortId: string   // 文件短标识
  downloadToken: string // 下载令牌
  url?: string          // 文件URL
  thumbnail?: string    // 缩略图
  thumbnailUrl?: string // 缩略图URL
  compressed?: boolean  // 是否已压缩
  compressedSize?: number // 压缩后大小
  processedAt: number   // 处理时间
  processMethod?: string // 处理方法
}

interface FileData {
  id?: number                // 文件ID，自增主键
  name: string              // 文件名，用于快速访问
  url?: string              // 默认URL(原始文件URL)
  rawFileInfo: FileBaseInfo & {
    file: File              // 原始文件对象
    blob?: Blob             // 原始Blob对象
  }
  handleFileInfo: FileBaseInfo & {
    blob?: Blob             // 处理后的Blob对象
  }
}

/**
 * 保存文件到数据库
 * @description 自动检查并创建数据库表，然后保存文件。支持图片缩略图、文件压缩等处理。
 */
async function saveFilesToDB(
  dbName: string,
  tableName: string,
  file: File,
  options: SaveFileOptions = {
    generateUrl: true,
    generateThumbnail: false,
    thumbnailSize: 100
  }
): Promise<any> {
  try {
    // 参数验证
    if (!dbName) return ResponseMessages.DBNAME_IS_NULL()
    if (!tableName) return ResponseMessages.TBNAME_IS_NULL()
    if (!file) return ResponseMessages.BASIC_ERROR('文件不能为空')

    // 检查表是否存在，不存在则创建
    const exists = await isTableExist(dbName, tableName)
    if (!exists) {
      await createTable(dbName, tableName, {
        primaryKey: 'id',
        autoIncrement: true,
        indexes: ['name']
      })
    }

    // 准备共享信息
    const now = Date.now()
    const fileShortId = generateFileShortId()
    const downloadToken = generateDownloadToken()

    // 准备基础文件信息
    const baseInfo: FileBaseInfo = {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
      processedAt: now,
      fileShortId,
      downloadToken
    }

    // 如果需要生成URL
    if (options.generateUrl) {
      baseInfo.url = URL.createObjectURL(file)
    }

    // 准备文件数据结构
    const fileData: FileData = {
      name: file.name,
      url: URL.createObjectURL(file),
      rawFileInfo: {
        ...baseInfo,
        file,
        blob: file,
        url: URL.createObjectURL(file)
      },
      handleFileInfo: {
        ...baseInfo,
        url: URL.createObjectURL(file)
      }
    }

    // 如果是图片，处理图片相关信息
    if (file.type.startsWith('image/')) {
      const dimensions = await getImageDimensions(file)
      const imageInfo = {
        width: dimensions.width,
        height: dimensions.height
      }
      
      Object.assign(fileData.rawFileInfo, imageInfo)
      Object.assign(fileData.handleFileInfo, imageInfo)

      // 生成缩略图
      if (options.generateThumbnail) {
        try {
          // 生成原始缩略图
          const rawThumbnail = await generateThumbnail(file, options.thumbnailSize || 100, false)
          fileData.rawFileInfo.thumbnail = rawThumbnail.base64
          fileData.rawFileInfo.thumbnailUrl = URL.createObjectURL(rawThumbnail.blob)

          // 生成压缩的缩略图
          const compressedThumbnail = await generateThumbnail(file, options.thumbnailSize || 100, true)
          fileData.handleFileInfo.thumbnail = compressedThumbnail.base64
          fileData.handleFileInfo.thumbnailUrl = URL.createObjectURL(compressedThumbnail.blob)
          fileData.handleFileInfo.compressed = true
          fileData.handleFileInfo.compressedSize = compressedThumbnail.blob.size
          
          fileData.rawFileInfo.processMethod = 'thumbnail'
          fileData.handleFileInfo.processMethod = 'thumbnail+compress'
        } catch (error) {
          logger.warn('生成缩略图失败:', error)
        }
      }
    }

    // 获取数据库连接
    const db = await useDatabase(dbName)
    const transaction = db.transaction([tableName], 'readwrite')
    const store = transaction.objectStore(tableName)

    return new Promise((resolve, reject) => {
      const request = store.add(fileData)

      request.onsuccess = () => {
        logger.debug(`文件 ${file.name} 保存成功`)
        resolve(ResponseMessages.FILE_SAVE_SUCCESS(request.result))
      }

      request.onerror = () => {
        logger.error(`保存文件 ${file.name} 失败:`, request.error)
        reject(ResponseMessages.FILE_SAVE_ERROR(request.error))
      }
    })

  } catch (error) {
    logger.error('保存文件失败:', error)
    return ResponseMessages.FILE_SAVE_ERROR(error)
  }
}

// 获取图片尺寸
async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve({ width: img.width, height: img.height })
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}

// 生成文件短标识
function generateFileShortId(): string {
  return Math.random().toString(36).substring(2, 10)
}

// 生成下载令牌
function generateDownloadToken(): string {
  return Math.random().toString(36).substring(2, 15)
}

/**
 * 生成图片缩略图
 */
async function generateThumbnail(
  file: File, 
  size: number, 
  compress = false
): Promise<{ base64: string; blob: Blob }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        const scale = size / Math.max(img.width, img.height)
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
        
        // 根据是否压缩使用不同的质量参数
        const quality = compress ? 0.6 : 0.9
        const base64 = canvas.toDataURL('image/jpeg', quality)
        
        // 转换为Blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({ base64, blob })
            } else {
              reject(new Error('Failed to create blob'))
            }
          },
          'image/jpeg',
          quality
        )
      }
      img.onerror = reject
      img.src = e.target?.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default saveFilesToDB 