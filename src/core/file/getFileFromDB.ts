import ResponseMessages from '../../constant'
import { useDatabase } from '../index'
import { logger } from '../../utils/logger'

interface GetFileOptions {
  generateUrl?: boolean  // 是否生成新的URL，默认 true
}

/**
 * 从数据库获取文件
 * @description 根据ID获取文件信息，支持URL生成
 */
async function getFileFromDB(
  dbName: string,
  tableName: string,
  fileId: number,
  options: GetFileOptions = { generateUrl: true }
): Promise<any> {
  try {
    if (!dbName) return ResponseMessages.DBNAME_IS_NULL()
    if (!tableName) return ResponseMessages.TBNAME_IS_NULL()
    if (!fileId) return ResponseMessages.BASIC_ERROR('文件ID不能为空')

    const db = await useDatabase(dbName)
    const transaction = db.transaction([tableName], 'readonly')
    const store = transaction.objectStore(tableName)

    return new Promise((resolve, reject) => {
      const request = store.get(fileId)

      request.onsuccess = () => {
        const fileData = request.result
        if (!fileData) {
          reject(ResponseMessages.BASIC_ERROR('文件不存在'))
          return
        }

        // 如果需要生成新的URL
        if (options.generateUrl) {
          // 生成原始文件URL
          if (fileData.rawFileInfo.file) {
            fileData.url = URL.createObjectURL(fileData.rawFileInfo.file)
            fileData.rawFileInfo.url = fileData.url
          }

          // 如果有缩略图，也生成缩略图URL
          if (fileData.rawFileInfo.thumbnail) {
            const rawBlob = dataURLtoBlob(fileData.rawFileInfo.thumbnail)
            fileData.rawFileInfo.thumbnailUrl = URL.createObjectURL(rawBlob)
          }
          if (fileData.handleFileInfo.thumbnail) {
            const handleBlob = dataURLtoBlob(fileData.handleFileInfo.thumbnail)
            fileData.handleFileInfo.thumbnailUrl = URL.createObjectURL(handleBlob)
          }
        }

        logger.debug(`获取文件 ${fileData.name} 成功`)
        resolve(ResponseMessages.FILE_GET_SUCCESS(fileData))
      }

      request.onerror = () => {
        logger.error('获取文件失败:', request.error)
        reject(ResponseMessages.FILE_GET_ERROR(request.error))
      }
    })

  } catch (error) {
    logger.error('获取文件失败:', error)
    return ResponseMessages.FILE_GET_ERROR(error)
  }
}

// base64转Blob
function dataURLtoBlob(dataURL: string): Blob {
  const arr = dataURL.split(',')
  const mime = arr[0].match(/:(.*?);/)?.[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

export default getFileFromDB 