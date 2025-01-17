import ResponseMessages from '../../constant'
import getAllFiles from './getAllFiles'
import { logger } from '../../utils/logger'
import JSZip from 'jszip'

interface DownloadAllOptions {
  type?: 'raw' | 'handled'  // 下载原始文件还是处理后的文件
  zipName?: string         // 打包下载时的压缩包名称
}

/**
 * 批量下载文件
 * @description 支持打包下载多个文件，可选择原始文件或处理后的文件
 */
async function downloadAllFiles(
  dbName: string,
  tableName: string,
  options: DownloadAllOptions = { type: 'raw' }
): Promise<any> {
  try {
    // 获取所有文件
    const result = await getAllFiles(dbName, tableName)
    
    if (result.code !== 200) {
      return result
    }

    const files = result.result
    if (!files.length) {
      return ResponseMessages.BASIC_ERROR('没有可下载的文件')
    }

    // 如果只有一个文件，直接下载
    if (files.length === 1) {
      const fileInfo = options.type === 'handled' ? files[0].handleFileInfo : files[0].rawFileInfo
      const file = fileInfo.file || fileInfo.blob

      if (!file) {
        return ResponseMessages.FILE_GET_ERROR('文件数据不存在')
      }

      const url = URL.createObjectURL(file)
      const a = document.createElement('a')
      a.href = url
      a.download = fileInfo.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      logger.debug(`文件 ${fileInfo.name} 下载成功`)
      return ResponseMessages.FILE_GET_SUCCESS(files[0])
    }

    // 多个文件，使用 JSZip 打包下载
    const zip = new JSZip()

    files.forEach((fileData: any) => {
      const fileInfo = options.type === 'handled' ? fileData.handleFileInfo : fileData.rawFileInfo
      const file = fileInfo.file || fileInfo.blob
      if (file) {
        zip.file(fileInfo.name, file)
      }
    })

    const zipBlob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(zipBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = options.zipName || `files_${Date.now()}.zip`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    logger.debug(`${files.length} 个文件打包下载成功`)
    return ResponseMessages.FILE_GET_SUCCESS(files)

  } catch (error) {
    logger.error('批量下载文件失败:', error)
    return ResponseMessages.FILE_GET_ERROR(error)
  }
}

export default downloadAllFiles 