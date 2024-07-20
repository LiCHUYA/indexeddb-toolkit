import ResponseMessages from "../../constant";
import {isTableExist} from "../../helper";
import {useDatabase} from "../index";

// 插入一条数据到指定表
async function insertOne<T>(dbName: string, tableName: string, data: T) {
  // 检查数据库名称是否为空
  if (!dbName) {
    return ResponseMessages.DBNAME_IS_NULL();
  }

  // 检查表是否存在
  const tableExist = await isTableExist(dbName, tableName);
  if (!tableExist) {
    return ResponseMessages.TB_NOTFOUND();
  }

  // 使用指定的数据库
  const currentDb: any = await useDatabase(dbName);
  console.log(currentDb)

  // 返回一个新的Promise
  return new Promise<any>((resolve, reject) => {
    // 开启一个读写事务
    const transaction = currentDb.result.target.result.transaction([tableName], "readwrite");
    const store = transaction.objectStore(tableName);

    // 添加数据，自动生成id
    const request = store.add({id: Date.now(), ...data});

    // 成功时的处理
    request.onsuccess = (event: any) => {
      resolve(ResponseMessages.TB_INSERT_SUCCESS(event))
    };

    // 失败时的处理
    request.onerror = (event: any) => {
      reject(ResponseMessages.TB_INSERT_ERROR(event))
    };
  });
}

export default insertOne
