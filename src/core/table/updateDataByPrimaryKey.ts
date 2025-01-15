import ResponseMessages from '../../constant'
import { isTableExist } from '../../helper'
import { useDatabase } from '../index'

/**
 * 更新指定主键的数据
 * @param dbName 数据库名称
 * @param tbName 表名称
 * @param id 主键值
 * @param data 更新的数据
 * @returns Promise对象，包含更新结果
 */
async function updateDataByPrimaryKey<T extends { [key: string]: any }>(
  dbName: string,
  tbName: string,
  id: number,
  data: Partial<T>
): Promise<any> {
  if (!dbName) {
    return ResponseMessages.DBNAME_IS_NULL();
  }
  if (!id) {
    return ResponseMessages.PRIMARY_KEY_IS_NULL();
  }

  const tableExist = await isTableExist(dbName, tbName);
  if (!tableExist) {
    return ResponseMessages.TB_NOTFOUND(`${tbName} 表不存在`);
  }

  try {
    const db = await useDatabase(dbName);

    return new Promise<any>((resolve, reject) => {
      const store = db.transaction([tbName], 'readwrite').objectStore(tbName);
      const request = store.get(id);

      request.onsuccess = (event: Event) => {
        const target = event.target as IDBRequest;
        const item = target.result;
        
        if (item) {
          const updatedItem = { ...item, ...data };
          const updateRequest = store.put(updatedItem);

          updateRequest.onsuccess = (event: Event) => {
            resolve(ResponseMessages.TB_DATA_UPDATE_BY_PK_SUCCESS(event));
          };

          updateRequest.onerror = (event: Event) => {
            reject(ResponseMessages.TB_DATA_UPDATE_BY_PK_ERROR(event));
          };
        } else {
          reject(ResponseMessages.DATA_ERROR('找不到数据'));
        }
      };

      request.onerror = (event: Event) => {
        reject(ResponseMessages.TB_DATA_UPDATE_BY_PK_ERROR(event));
      };
    });
  } catch (error) {
    return ResponseMessages.BASIC_ERROR(error);
  }
}

export default updateDataByPrimaryKey;
