import ResponseMessages from '../../constant'
import { useDatabase } from '../index'
import { logger } from '../../utils/logger'

interface GetAllFilesOptions {
  generateUrl?: boolean  // 是否生成URL，默认 true
  page?: number         // 页码，从1开始
  pageSize?: number     // 每页数量
}

/**
 * 获取所有文件
 * @description 支持分页和URL生成
 */
async function getAllFiles(
  dbName: string,
  tableName: string,
  options: GetAllFilesOptions = {
    generateUrl: true,
    page: 1,
    pageSize: 10
  }
): Promise<any> {
  try {
    if (!dbName) return ResponseMessages.DBNAME_IS_NULL()
    if (!tableName) return ResponseMessages.TBNAME_IS_NULL()

    const db = await useDatabase(dbName)
    const transaction = db.transaction([tableName], 'readonly')
    const store = transaction.objectStore(tableName)

    return new Promise((resolve, reject) => {
      const request = store.getAll()

      request.onsuccess = () => {
        let files = request.result

        // 处理分页
        if (options.page && options.pageSize) {
          const start = (options.page - 1) * options.pageSize
          const end = start + options.pageSize
          files = files.slice(start, end)
        }

        // 处理文件数据
        files = files.map(fileData => {
          // 如果需要生成URL
          if (options.generateUrl) {
            // 生成原始文件URL
            if (fileData.rawFileInfo.file) {
              fileData.url = URL.createObjectURL(fileData.rawFileInfo.file)
              fileData.rawFileInfo.url = fileData.url
            }

            // 如果有缩略图，生成缩略图URL
            if (fileData.rawFileInfo.thumbnail) {
              const rawBlob = dataURLtoBlob(fileData.rawFileInfo.thumbnail)
              fileData.rawFileInfo.thumbnailUrl = URL.createObjectURL(rawBlob)
            }
            if (fileData.handleFileInfo.thumbnail) {
              const handleBlob = dataURLtoBlob(fileData.handleFileInfo.thumbnail)
              fileData.handleFileInfo.thumbnailUrl = URL.createObjectURL(handleBlob)
            }
          }

          return fileData
        })

        logger.debug(`获取到 ${files.length} 个文件`)
        resolve(ResponseMessages.FILE_GET_SUCCESS(files))
      }

      request.onerror = () => {
        logger.error('获取文件列表失败:', request.error)
        reject(ResponseMessages.FILE_GET_ERROR(request.error))
      }
    })

  } catch (error) {
    logger.error('获取文件列表失败:', error)
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

export default getAllFiles 