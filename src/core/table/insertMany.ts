import ResponseMessages from "../../constant";
import {isTableExist} from "../../helper";
import {useDatabase} from "../index";

async function insertMany(dbName: any, tableName: string, data: any) {
  if (!dbName) {
    return ResponseMessages.DBNAME_IS_NULL()
  }

  const tableExist = await isTableExist(dbName, tableName);
  if (!tableExist) {
    return ResponseMessages.TB_EXIST(`${tableName} 表不存在`)
  }
  if (!Array.isArray(data)) {
    return ResponseMessages.INSERT_DATA_ERROR(data)
  }
  const currentDb: any = await useDatabase(dbName);

  return new Promise(async (resolve, reject) => {
    try {
      const writeTransaction = currentDb.result.target.result.transaction([tableName], "readwrite");
      const writeStore = writeTransaction.objectStore(tableName);

      for (const item of data) {
        const request = writeStore.put({
          id: item.id,
          timeStamp: Date.now(),
          ...item,
        });

        request.onsuccess = (event: any) => {
          resolve(ResponseMessages.TB_INSERT_MANY_SUCCESS(event));
        };

        request.onerror = (event: any) => {
          reject(ResponseMessages.TB_INSERT_ERROR(event));
        };
      }
    } catch (error) {
      reject(ResponseMessages.BASIC_ERROR(error));
    }
  });
}

export default insertMany
