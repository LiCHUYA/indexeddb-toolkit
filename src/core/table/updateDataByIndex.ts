import ResponseMessages from '../../constant'
import { isTableExist } from '../../helper'
import { useDatabase } from '../index'

/**
 * 根据索引更新数据
 * @param dbName 数据库名称
 * @param tbName 表名称
 * @param indexName 索引名称
 * @param indexValue 索引值
 * @param data 更新的数据
 * @returns Promise对象，包含更新结果
 */
async function updateDataByIndex<T extends { [key: string]: any }>(
  dbName: string,
  tbName: string,
  indexName: string,
  indexValue: any,
  data: Partial<T>
): Promise<any> {
  if (!dbName) {
    return ResponseMessages.DBNAME_IS_NULL();
  }
  if (!indexName) {
    return ResponseMessages.TB_SELECT_INDEX_NAME_IS_NULL();
  }
  if (!indexValue) {
    return ResponseMessages.TB_SELECT_INDEX_VALUE_IS_NULL();
  }

  const tableExist = await isTableExist(dbName, tbName);
  if (!tableExist) {
    return ResponseMessages.TB_NOTFOUND();
  }

  try {
    const db = await useDatabase(dbName);

    return new Promise<any>((resolve, reject) => {
      const store = db.transaction([tbName], 'readwrite').objectStore(tbName);
      const index = store.index(indexName);
      const request = index.get(indexValue);

      request.onsuccess = (event: Event) => {
        const target = event.target as IDBRequest;
        const item = target.result;
        
        if (item) {
          const updatedItem = { ...item, ...data };
          const updateRequest = store.put(updatedItem);

          updateRequest.onsuccess = (event: Event) => {
            resolve(ResponseMessages.TB_DATA_UPDATE_BY_INDEX_SUCCESS(event));
          };

          updateRequest.onerror = (event: Event) => {
            reject(ResponseMessages.TB_DATA_UPDATE_BY_INDEX_ERROR(event));
          };
        } else {
          reject(ResponseMessages.DATA_ERROR('找不到数据'));
        }
      };

      request.onerror = (event: Event) => {
        reject(ResponseMessages.TB_DATA_UPDATE_BY_INDEX_ERROR(event));
      };
    });
  } catch (error) {
    return ResponseMessages.BASIC_ERROR(error);
  }
}

export default updateDataByIndex;
