import ResponseMessages from "../../constant";

/**
 * 删除指定表
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @returns Promise对象，包含删除结果的状态和消息
 */
function deleteTable(dbName: string, tableName: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const request = window.indexedDB.open(dbName);

    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const version = db.version + 1;

      db.close();

      const deleteRequest = window.indexedDB.open(dbName, version);

      deleteRequest.onupgradeneeded = (event: any) => {
        const upgradeDb = event.target.result;
        if (upgradeDb.objectStoreNames.contains(tableName)) {
          upgradeDb.deleteObjectStore(tableName);
        }
      };

      deleteRequest.onsuccess = (event: any) => {
        event.target.result.close();
        resolve(ResponseMessages.TB_DELETE_SUCCESS(`${tableName} 表删除成功`))
      };

      deleteRequest.onerror = (event: any) => {
        reject(ResponseMessages.TB_DELETE_ERROR(event));
      };
    };

    request.onerror = (error: any) => {
      reject(ResponseMessages.BASIC_ERROR(error));
    };
  });
}

export default deleteTable
