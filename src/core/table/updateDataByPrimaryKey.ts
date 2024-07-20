// 更新指定主键的数据
import ResponseMessages from '../../constant'
import { isTableExist } from '../../helper'
import { useDatabase } from '../index'

async function updateDataByPrimaryKey<T>(
  dbName: any,
  tbName: string,
  id: number,
  data: T
): Promise<any> {
  if (!dbName) {
    return ResponseMessages.DBNAME_IS_NULL()
  }
  if (!id) {
    return ResponseMessages.PRIMARY_KEY_IS_NULL()
  }
  const tableExist = await isTableExist(dbName, tbName)
  if (!tableExist) {
    // console.log(`${tbName} 表不存在`);
    return ResponseMessages.TB_NOTFOUND(`${tbName} 表不存在`)
  }

  // 使用指定的数据库
  const database: any = await useDatabase(dbName)
  let currentDb = database.result.target.result

  return new Promise<any>(async (resolve, reject) => {
    try {
      const store = currentDb.transaction([tbName], 'readwrite').objectStore(tbName)
      const request = store.get(id)

      request.onsuccess = (event: any) => {
        const item = event.target.result
        if (item) {
          const updatedItem = { ...item, ...data }
          const updateRequest = store.put(updatedItem)

          updateRequest.onsuccess = (event: any) => {
            resolve(ResponseMessages.TB_DATA_UPDATE_BY_PK_SUCCESS(event))
          }

          updateRequest.onerror = (event: any) => {
            reject(ResponseMessages.TB_DATA_UPDATE_BY_PK_ERROR(event))
          }
        } else {
          reject(ResponseMessages.DATA_ERROR('找不到数据'))
        }
      }

      request.onerror = (event: any) => {
        reject(ResponseMessages.TB_DATA_UPDATE_BY_PK_ERROR(event))
      }
    } catch (error) {
      reject(ResponseMessages.BASIC_ERROR(error))
    }
  })
}

export default updateDataByPrimaryKey
