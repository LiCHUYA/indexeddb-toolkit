import ResponseMessages from '../../constant'
import { isTableExist } from '../../helper'
import { useDatabase } from '../index'

/**
 * 根据索引批量删除数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param indexName 索引名称
 * @param indexValues 索引值数组
 * @returns Promise对象，包含删除结果的状态和消息
 */
async function deleteManyByIndex(
  dbName: string,
  tableName: string,
  indexName: string,
  indexValues: any[]
): Promise<any> {
  if (!dbName) {
    return ResponseMessages.DBNAME_IS_NULL();
  }
  if (!tableName) {
    return ResponseMessages.TBNAME_IS_NULL();
  }
  const tableExist = await isTableExist(dbName, tableName);
  if (!tableExist) {
    return ResponseMessages.TB_EXIST(`${tableName} 表不存在`);
  }

  try {
    const db = await useDatabase(dbName);

    return new Promise<any>((resolve, reject) => {
      const store = db.transaction([tableName], 'readwrite').objectStore(tableName);
      const index = store.index(indexName);

      const deletePromises = indexValues.map(value => {
        return new Promise<any>((resolve, reject) => {
          const request = index.openCursor(IDBKeyRange.only(value));
          request.onsuccess = (event: any) => {
            const cursor = event.target.result;
            if (cursor) {
              const deleteRequest = cursor.delete();
              deleteRequest.onsuccess = () => {
                cursor.continue();
                resolve(true);
              };
              deleteRequest.onerror = (event: any) =>
                reject({
                  code: 400,
                  message: event.target.error
                });
            } else {
              resolve(true);
            }
          };
          request.onerror = (event: any) =>
            reject({
              code: 400,
              message: event.target.error
            });
        });
      });

      Promise.all(deletePromises)
        .then(() =>
          resolve(
            ResponseMessages.TB_DELETE_MANY_BY_INDEXS_SUCCESS(
              `${indexValues.length} 条数据删除成功`
            )
          )
        )
        .catch(error => reject(ResponseMessages.TB_DELETE_MANY_BY_INDEXS_ERROR(error)));
    });
  } catch (error) {
    return ResponseMessages.BASIC_ERROR(error);
  }
}

export default deleteManyByIndex
