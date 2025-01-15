import ResponseMessages from '../../constant'
import { isTableExist } from '../../helper'
import { useDatabase } from '../index'

/**
 * 根据索引查询数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param indexName 索引名称
 * @param indexValue 索引值
 * @param isAll 根据索引查询出来的值,查出来全部值还是默认第一条
 * @returns Promise对象，包含查询结果对象
 */
async function findByIndex(
  dbName: string,
  tableName: string,
  indexName: string,
  indexValue: any,
  isAll: boolean = true
): Promise<any> {
  if (!dbName) {
    return ResponseMessages.DBNAME_IS_NULL()
  }
  if (!tableName) {
    return ResponseMessages.TBNAME_IS_NULL()
  }

  if (!indexName) {
    return ResponseMessages.TB_SELECT_INDEX_NAME_IS_NULL()
  }

  if (!indexValue) {
    return ResponseMessages.TB_SELECT_INDEX_VALUE_IS_NULL()
  }
  try {
    const tableExist = await isTableExist(dbName, tableName)
    if (!tableExist) {
      return ResponseMessages.TB_EXIST(`${tableName} 表不存在`)
    }
    const db = await useDatabase(dbName)

    return new Promise<any>((resolve, reject) => {
      const store = db.transaction(tableName, 'readonly').objectStore(tableName)

      if (!Array.from(store.indexNames).includes(indexName))
        reject(ResponseMessages.TB_INDEX_ERROR())

      const index = store.index(indexName)

      if (isAll) {
        const request = index.openCursor(IDBKeyRange.only(indexValue))
        const results: any[] = []

        request.onsuccess = (event: any) => {
          const cursor = event.target.result
          if (cursor) {
            results.push(cursor.value)
            cursor.continue()
          } else {
            resolve(ResponseMessages.TB_SELECT_BY_INDEX_SUCCESS(results))
          }
        }

        request.onerror = (event: any) => {
          reject(ResponseMessages.TB_SELECT_BY_INDEX_ERROR(event))
        }
      } else {
        const request = index.get(indexValue)
        request.onsuccess = (event: any) => {
          const result = event.target.result
          resolve(ResponseMessages.TB_SELECT_BY_INDEX_SUCCESS(result))
        }

        request.onerror = (event: any) => {
          reject(ResponseMessages.TB_SELECT_BY_INDEX_ERROR(event))
        }
      }
    })
  } catch (error) {
    return ResponseMessages.BASIC_ERROR(error)
  }
}

export default findByIndex
