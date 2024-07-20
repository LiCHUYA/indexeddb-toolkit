// 查询表的数据
import ResponseMessages from "../constant";
import {useDatabase} from "./index";

async function findDBData(dbName: string, tableName?: string): Promise<any> {
  if (!dbName) {
    return ResponseMessages.DBNAME_IS_NULL()
  }
  const database: any = await useDatabase(dbName);
  let currentDb = database.result.target.result
  const result: any[] = [];

  if (tableName) {
    if (!currentDb?.objectStoreNames.contains(tableName)) {
      return ResponseMessages.TB_SELECT_ERROR(`${tableName}不存在`)// 只传数据库名称，重新查询所有表的数据
    }

    const store = currentDb
      ?.transaction([tableName], "readonly")
      ?.objectStore(tableName);

    if (!store) {
      console.log(`${dbName} 数据库未打开`);
      await useDatabase(dbName);
      return findDBData(dbName); // 只传数据库名称，重新查询所有表的数据
    }

    const request = store.getAll();
    const data = await new Promise<any>((resolve, reject) => {
      request.onsuccess = (event: any) => {
        const result = event.target.result;
        resolve(ResponseMessages.TB_SELECT_SUCCESS(result));
      };

      request.onerror = (event: any) => {
        reject(ResponseMessages.TB_SELECT_ERROR(event.target.error));
      };
    });

    result.push({
      tableName: tableName,
      version: this.currentDb?.version || "",
      children: data,
    });
  } else {
    const database: any = await useDatabase(dbName);
    let currentDb = database.result.target.result
    const objectStoreNames = Array.from(
      currentDb?.objectStoreNames ?? []
    );

    if (objectStoreNames.length === 0) {
      return [];
    }

    for (const storeName of objectStoreNames) {
      await useDatabase(dbName);

      if (!currentDb?.objectStoreNames.contains(storeName)) {
        console.log(`${storeName} 表不存在`);
        continue; // 继续下一次循环
      }

      const store = currentDb
        ?.transaction([storeName], "readonly")
        ?.objectStore(storeName);

      if (!store) {
        throw new Error(`${storeName} 数据查询失败`);
      }

      const request = store.getAll();
      const data = await new Promise((resolve, reject) => {
        request.onsuccess = (event: any) => {
          const result = event.target.result;
          resolve(ResponseMessages.TB_SELECT_SUCCESS(result));
        };
        request.onerror = (event: any) => {
          reject(ResponseMessages.TB_SELECT_ERROR(event.target.error));
        };
      });

      result.push({
        tableName: storeName || "",
        version: currentDb?.version || "",
        children: data,
      });
    }
  }

  return result;
}

export default findDBData
