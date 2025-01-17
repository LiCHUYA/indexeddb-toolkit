import ResponseMessages from '../../constant'
import getFileFromDB from './getFileFromDB'
import { logger } from '../../utils/logger'

interface DownloadOptions {
  type?: 'raw' | 'handled'  // 下载原始文件还是处理后的文件
  fileName?: string        // 自定义文件名
}

/**
 * 下载单个文件
 * @description 从数据库获取并下载文件，支持原始文件和处理后的文件
 */
async function downloadFileFromDB(
  dbName: string,
  tableName: string,
  fileId: number,
  options: DownloadOptions = { type: 'raw' }
): Promise<any> {
  try {
    // 获取文件数据
    const result = await getFileFromDB(dbName, tableName, fileId)
    // console.log(result);
    
    if (result.code !== 200) {
      return result
    }

    const fileData = result.result
    const fileInfo = options.type === 'handled' ? fileData.handleFileInfo : fileData.rawFileInfo
    const file = fileInfo.file || fileInfo.blob

    // console.log(file);
    
    if (!file) {
      return ResponseMessages.FILE_GET_ERROR('文件数据不存在')
    }

    // 创建下载链接
    const url = URL.createObjectURL(file)
    const a = document.createElement('a')
    a.href = url
    a.download = options.fileName || fileInfo.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    logger.debug(`文件 ${fileInfo.name} 下载成功`)
    return ResponseMessages.FILE_GET_SUCCESS(fileData)

  } catch (error) {
    logger.error('下载文件失败:', error)
    return ResponseMessages.FILE_GET_ERROR(error)
  }
}

export default downloadFileFromDB 