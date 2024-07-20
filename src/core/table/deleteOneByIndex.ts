import ResponseMessages from '../../constant'
import { isTableExist } from '../../helper'
import { useDatabase } from '../index'

/**
 * 根据索引删除单条数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param indexName 索引名称
 * @param indexValue 索引值
 * @returns Promise对象，包含删除结果的状态和消息
 */
async function deleteOneByIndex(
  dbName: string,
  tableName: string,
  indexName: string,
  indexValue: any
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

  const tableExist = await isTableExist(dbName, tableName)
  if (!tableExist) {
    return ResponseMessages.TB_EXIST(`${tableName} 表不存在`)
  }

  try {
    const database: any = await useDatabase(dbName)
    let currentDb = database.result.target.result

    return new Promise<any>((resolve, reject) => {
      const transaction = currentDb.transaction([tableName], 'readwrite')
      const store = transaction.objectStore(tableName)
      const index = store.index(indexName)

      const request = index.openCursor(IDBKeyRange.only(indexValue))
      request.onsuccess = (event: any) => {
        const cursor = event.target.result
        if (cursor) {
          const deleteRequest = cursor.delete()
          deleteRequest.onsuccess = () => {
            resolve(ResponseMessages.TB_DELETE_BY_INDEX_SUCCESS({ id: cursor.primaryKey }))
          }
          deleteRequest.onerror = (event: any) => {
            reject(ResponseMessages.TB_DELETE_BY_INDEX_ERROR(event))
          }
        } else {
          resolve(ResponseMessages.TB_DELETE_BY_INDEX_SUCCESS(null)) // No record found
        }
      }

      request.onerror = (event: any) => {
        reject(ResponseMessages.TB_DELETE_BY_INDEX_ERROR(event))
      }
    })
  } catch (error) {
    return ResponseMessages.BASIC_ERROR(error)
  }
}

export default deleteOneByIndex
