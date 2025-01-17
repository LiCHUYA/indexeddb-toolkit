import ResponseMessages from '../../constant'
import { useDatabase, createTable } from '../index'
import { logger } from '../../utils/logger'

interface ImportProgress {
  phase: 'preparing' | 'importing'
  current: number
  total: number
  percentage: number
  message: string
}

interface ImportOptions {
  overwrite?: boolean
  onProgress?: (progress: ImportProgress) => void
}

async function importFromJson(
  dbName: string,
  jsonData: string,
  options: ImportOptions = {}
): Promise<any> {
  try {
    const { overwrite = false, onProgress } = options

    // 解析JSON数据
    const importData = JSON.parse(jsonData)
    const { tables, data } = importData

    if (!tables || !data) {
      throw new Error('无效的JSON数据格式')
    }

    // 获取数据库连接
    const db = await useDatabase(dbName)

    let totalRecords = 0
    for (const [tableName, tableData] of Object.entries(data)) {
      try {
        // 进度通知 - 准备阶段
        if (onProgress) {
          onProgress({
            phase: 'preparing',
            current: tables.indexOf(tableName),
            total: tables.length,
            percentage: Math.round((tables.indexOf(tableName) / tables.length) * 100),
            message: `正在准备导入表 ${tableName}`
          })
        }

        // 确保表存在
        if (!db.objectStoreNames.contains(tableName)) {
          await createTable(dbName, tableName)
        }

        const transaction = db.transaction(tableName, 'readwrite')
        const store = transaction.objectStore(tableName)

        // 如果需要覆盖，先清空表
        if (overwrite) {
          await new Promise((resolve, reject) => {
            const request = store.clear()
            request.onsuccess = () => resolve(undefined)
            request.onerror = () => reject(request.error)
          })
        }

        // 导入数据
        if (Array.isArray(tableData)) {
          await Promise.all(tableData.map((item: any) => {
            return new Promise((resolve, reject) => {
              const request = store.add(item)
              request.onsuccess = () => resolve(undefined)
              request.onerror = () => reject(request.error)
            })
          }))

          totalRecords += tableData.length
        }

        // 进度通知 - 导入阶段
        if (onProgress) {
          onProgress({
            phase: 'importing',
            current: tables.indexOf(tableName) + 1,
            total: tables.length,
            percentage: Math.round(((tables.indexOf(tableName) + 1) / tables.length) * 100),
            message: `表 ${tableName} 导入完成`
          })
        }

      } catch (error) {
        logger.error(`导入表 ${tableName} 失败:`, error)
        throw error
      }
    }

    return ResponseMessages.JSON_IMPORT_SUCCESS({
      tables,
      totalRecords
    })

  } catch (error) {
    logger.error('导入JSON失败:', error)
    return ResponseMessages.JSON_IMPORT_ERROR(error)
  }
}

export default importFromJson 