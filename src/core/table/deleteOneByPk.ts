import ResponseMessages from '../../constant'
import { isTableExist } from '../../helper'
import { useDatabase } from '../index'

/**
 * 根据主键删除单条数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param id 主键值
 * @returns Promise对象，包含删除结果的状态和消息
 */
async function deleteOneByPk(dbName: string, tableName: string, id: number) {
  if (!dbName) {
    return ResponseMessages.DBNAME_IS_NULL()
  }
  if (!tableName) {
    return ResponseMessages.TBNAME_IS_NULL()
  }
  const tableExist = await isTableExist(dbName, tableName)
  if (!tableExist) {
    // console.log(`${tableName} 表不存在`);
    return ResponseMessages.TB_EXIST(`${tableName} 表不存在`)
  }
  const database: any = await useDatabase(dbName)
  let currentDb = database.result.target.result

  return new Promise<any>((resolve, reject) => {
    const store = currentDb.transaction([tableName], 'readwrite').objectStore(tableName)

    const request = store.delete(id)
    request.onsuccess = (event: any) => {
      resolve(ResponseMessages.TB_DELETE_BY_PK_SUCCESS(event))
    }
    request.onerror = (event: any) => {
      reject(ResponseMessages.TB_DELETE_BY_PK_ERROR(event))
    }
  })
}

export default deleteOneByPk
