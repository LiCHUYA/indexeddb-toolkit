import ResponseMessages from '../../constant'
import { isTableExist } from '../../helper'
import { useDatabase } from '../index'
import { logger } from '../../utils/logger'

interface TableData {
  tableName: string
  version: string | number
  children: any
}

/**
 * 查询指定数据库中的数据，如果提供了表名，则查询该表的数据；如果未提供表名，则查询所有表的数据。
 * @async
 * @param {string} dbName - 数据库名称
 * @param {string} [tableName] - 可选，表名。如果提供了表名，则查询该表的数据；如果未提供表名，则查询所有表的数据
 * @returns {Promise<TableData[] | IReturn>} 返回包含查询结果的Promise对象
 */
async function findDBData(dbName: string, tableName?: string): Promise<TableData[] | any> {
  if (!dbName) {
    return ResponseMessages.DBNAME_IS_NULL()
  }

  try {
    const database = await useDatabase(dbName)
    const result: TableData[] = []

    // 查询单个表数据的函数
    const queryTableData = async (storeName: string): Promise<TableData | null> => {
      try {
        const transaction = database.transaction([storeName], 'readonly')
        const store = transaction.objectStore(storeName)

        const data = await new Promise((resolve, reject) => {
          const request = store.getAll()
          request.onsuccess = () => resolve(request.result)
          request.onerror = (event) => reject(event)
        })

        return {
          tableName: storeName,
          version: database.version || '',
          children: ResponseMessages.TB_SELECT_SUCCESS(data)
        }
      } catch (error) {
        logger.error(`查询表 ${storeName} 数据失败:`, error)
        return null
      }
    }

    // 查询单个表的数据
    if (tableName) {
      const tableExist = await isTableExist(dbName, tableName)
      if (!tableExist) {
        return ResponseMessages.TB_NOTFOUND()
      }

      const tableData = await queryTableData(tableName)
      if (tableData) {
        result.push(tableData)
      }
      return result
    }

    // 查询所有表的数据
    const objectStoreNames = Array.from(database.objectStoreNames || [])
    if (objectStoreNames.length === 0) {
      return []
    }

    // 并行查询所有表的数据
    const tableDataPromises = objectStoreNames.map(async (storeName) => {
      if (!database.objectStoreNames.contains(storeName)) {
        logger.warn(`表 ${storeName} 不存在`)
        return null
      }
      return queryTableData(storeName)
    })

    const tableDataResults = await Promise.all(tableDataPromises)
    
    // 过滤掉查询失败的表数据
    result.push(...tableDataResults.filter((data): data is TableData => data !== null))

    return result

  } catch (error) {
    logger.error('查询数据库数据失败:', error)
    return ResponseMessages.BASIC_ERROR(error)
  }
}

export default findDBData