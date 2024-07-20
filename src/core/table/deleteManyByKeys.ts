import ResponseMessages from '../../constant'
import { isTableExist } from '../../helper'
import { useDatabase } from '../index'

/**
 * 根据主键数组批量删除数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param keys 主键值数组
 * @returns Promise对象，包含删除结果的状态和消息
 */
async function deleteManyByKeys(dbName: string, tableName: string, keys: any[]): Promise<any> {
  if (!dbName) {
    return ResponseMessages.DBNAME_IS_NULL()
  }
  if (!tableName) {
    return ResponseMessages.TBNAME_IS_NULL()
  }
  if (!keys || keys.length === 0) {
    return ResponseMessages.PRIMARY_KEY_IS_NULL()
  }

  const tableExist = await isTableExist(dbName, tableName)
  if (!tableExist) {
    return ResponseMessages.TB_NOTFOUND(`${tableName} 表不存在`)
  }

  try {
    const database: any = await useDatabase(dbName)
    const currentDb = database.result.target.result

    return new Promise<any>((resolve, reject) => {
      const store = currentDb.transaction([tableName], 'readwrite').objectStore(tableName)

      const deletePromises = keys.map(key => {
        return new Promise<void>((resolve, reject) => {
          const request = store.delete(key)
          request.onsuccess = () => resolve()
          request.onerror = (event: any) =>
            reject(ResponseMessages.TB_DELETE_RECORDS_BY_KEYS_ERROR(event.target.error))
        })
      })

      Promise.all(deletePromises)
        .then(() =>
          resolve(
            ResponseMessages.TB_DELETE_RECORDS_BY_KEYS_SUCCESS(`${keys.length} 条数据删除成功`)
          )
        )
        .catch(error => reject(ResponseMessages.TB_DELETE_RECORDS_BY_KEYS_ERROR(error)))
    })
  } catch (error) {
    return ResponseMessages.BASIC_ERROR(error)
  }
}

export default deleteManyByKeys
