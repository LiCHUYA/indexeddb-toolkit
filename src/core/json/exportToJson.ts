import ResponseMessages from '../../constant'
import { findDBData } from '../index'
import { logger } from '../../utils/logger'

interface ExportOptions {
  pretty?: boolean      // 是否美化输出
  download?: boolean    // 是否下载文件
  fileName?: string     // 下载的文件名
}

async function exportToJson(dbName: string, options: ExportOptions = {}): Promise<any> {
  try {
    const { 
      pretty = false, 
      download = true,
      fileName = `${dbName}_export.json` 
    } = options

    // 使用 findDBData 获取所有数据
      const sourceData = await findDBData(dbName)
      console.log(sourceData);
      
    if (!sourceData || !Array.isArray(sourceData)) {
      return ResponseMessages.JSON_EXPORT_ERROR('数据库为空')
    }

    // 构建导出数据
    const exportData = {
      database: dbName,
      exportedAt: new Date().toISOString(),
      tables: sourceData.map(table => table.tableName),
      data: sourceData.reduce((acc, table) => {
        acc[table.tableName] = table.children?.result || []
        return acc
      }, {} as Record<string, any[]>)
    }

    // 转换为JSON
    const jsonString = pretty 
      ? JSON.stringify(exportData, null, 2)
      : JSON.stringify(exportData)

    // 如果需要下载
    if (download) {
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }

    return ResponseMessages.JSON_EXPORT_SUCCESS({
      data: jsonString,
      tables: exportData.tables,
      totalTables: exportData.tables.length,
      fileName: download ? fileName : undefined
    })

  } catch (error) {
    logger.error('导出JSON失败:', error)
    return ResponseMessages.JSON_EXPORT_ERROR(error)
  }
}

export default exportToJson 