import ResponseMessages from "../../constant";
import {isTableExist} from "../../helper";
import {useDatabase} from "../index";

/**
 * 根据索引批量删除数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param indexName 索引名称
 * @param indexValues 索引值数组
 * @returns Promise对象，包含删除结果的状态和消息
 */
async function deleteManyByIndex(dbName: string, tableName: string, indexName: string, indexValues: any[]): Promise<any> {
  // 检查数据库名称是否为空
  if (!dbName) {
    return ResponseMessages.DBNAME_IS_NULL();
  }

  // 检查表名称是否为空
  if (!tableName) {
    return ResponseMessages.TBNAME_IS_NULL();
  }

  // 检查表是否存在
  const tableExist = await isTableExist(dbName, tableName);
  if (!tableExist) {
    return ResponseMessages.TB_EXIST(`${tableName} 表不存在`);
  }

  try {
    // 获取数据库实例
    const database: any = await useDatabase(dbName);
    const currentDb = database.result.target.result;

    // 返回一个新的Promise对象
    return new Promise<any>((resolve, reject) => {
      const store = currentDb.transaction([tableName], "readwrite").objectStore(tableName);
      const index = store.index(indexName);

      // 遍历索引值数组，生成删除请求
      const deletePromises = indexValues.map((value) => {
        return new Promise<any>((resolve, reject) => {
          const request = index.openCursor(IDBKeyRange.only(value));
          request.onsuccess = (event: any) => {
            const cursor = event.target.result;
            if (cursor) {
              // 删除当前游标指向的数据
              const deleteRequest = cursor.delete();
              deleteRequest.onsuccess = () => {
                cursor.continue();
                resolve(true);  // 删除成功，传递 true
              };
              deleteRequest.onerror = (event: any) => reject({
                code: 400,
                message: event.target.error
              });
            } else {
              resolve(true);  // 没有更多数据删除时也传递 true
            }
          };
          request.onerror = (event: any) => reject({
            code: 400,
            message: event.target.error
          });
        });
      });

      // 等待所有删除请求完成
      Promise.all(deletePromises)
        .then(() => resolve(ResponseMessages.TB_DELETE_MANY_BY_INDEXS_SUCCESS(`${indexValues.length} 条数据删除成功`)))
        .catch((error) => reject(ResponseMessages.TB_DELETE_MANY_BY_INDEXS_ERROR(error)));
    });
  } catch (error) {
    return ResponseMessages.BASIC_ERROR(error);
  }
}

export default deleteManyByIndex
