import ResponseMessages from "../../constant";
import {isTableExist} from "../../helper";
import {useDatabase} from "../index";
import {ExportConverter} from "typedoc/dist/lib/converter/nodes";

/**
 * 根据主键查询数据或查询所有数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param key 主键值
 * @param isAll 是否查询所有数据，默认为 true
 * @returns Promise对象，包含查询结果对象
 */
async function findByKey(dbName: string, tableName: string, key: any, isAll: boolean = true): Promise<any> {
  if (!dbName) {
    return ResponseMessages.DBNAME_IS_NULL();
  }
  if (!tableName) {
    return ResponseMessages.TBNAME_IS_NULL();
  }
  if (!key && !isAll) {
    return ResponseMessages.PRIMARY_KEY_IS_NULL();
  }
  try {
    const tableExist = await isTableExist(dbName, tableName);
    if (!tableExist) {
      return ResponseMessages.TB_NOTFOUND(`${tableName} 表不存在`);
    }
    const database: any = await useDatabase(dbName);
    let currentDb = database.result.target.result;

    return new Promise<any>((resolve, reject) => {
      const store = currentDb
        .transaction(tableName, "readonly")
        .objectStore(tableName);

      if (isAll) {
        const request = store.getAll();
        request.onsuccess = (event: any) => {
          const result = event.target.result;
          resolve(ResponseMessages.TB_SELECT_BY_KEY_SUCCESS(result));
        };
        request.onerror = (event: any) => {
          reject(ResponseMessages.TB_SELECT_BY_KEY_ERROR(event));
        };
      } else {
        const request = store.get(key);
        request.onsuccess = (event: any) => {
          const result = event.target.result;
          resolve(ResponseMessages.TB_SELECT_BY_KEY_SUCCESS(result));
        };
        request.onerror = (event: any) => {
          reject(ResponseMessages.TB_SELECT_BY_KEY_ERROR(event));
        };
      }
    });
  } catch (error) {
    return ResponseMessages.BASIC_ERROR(error);
  }
}

export default findByKey
