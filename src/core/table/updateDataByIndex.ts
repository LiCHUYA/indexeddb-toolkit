import ResponseMessages from '../../constant'
import { isTableExist } from '../../helper'
import { useDatabase } from '../index'

async function updateDataByIndex<T>(
  dbName: any,
  tbName: string,
  indexName: string,
  indexValue: any,
  data: T
): Promise<any> {
  if (!dbName) {
    return ResponseMessages.DBNAME_IS_NULL()
  }
  if (!indexName) {
    return ResponseMessages.TB_SELECT_INDEX_NAME_IS_NULL()
  }
  if (!indexValue) {
    return ResponseMessages.TB_SELECT_INDEX_VALUE_IS_NULL()
  }

  const tableExist = await isTableExist(dbName, tbName)
  if (!tableExist) {
    return ResponseMessages.TB_NOTFOUND(`${tbName} 表不存在`)
  }

  // 使用指定的数据库
  const database: any = await useDatabase(dbName)
  let currentDb = database.result.target.result

  return new Promise<any>((resolve, reject) => {
    try {
      const store = currentDb.transaction([tbName], 'readwrite').objectStore(tbName)
      const index = store.index(indexName)
      const request = index.get(indexValue)

      request.onsuccess = (event: any) => {
        const item = event.target.result
        if (item) {
          const updatedItem = { ...item, ...data }
          const updateRequest = store.put(updatedItem)

          updateRequest.onsuccess = (event: any) => {
            resolve(ResponseMessages.TB_DATA_UPDATE_BY_INDEX_SUCCESS(event))
          }

          updateRequest.onerror = (event: any) => {
            reject(ResponseMessages.TB_DATA_UPDATE_BY_INDEX_ERROR(event))
          }
        } else {
          reject(ResponseMessages.DATA_ERROR('找不到数据'))
        }
      }

      request.onerror = (event: any) => {
        reject(ResponseMessages.TB_DATA_UPDATE_BY_INDEX_ERROR(event))
      }
    } catch (error) {
      reject(ResponseMessages.BASIC_ERROR(error))
    }
  })
}

export default updateDataByIndex
