import {useDatabase} from "../index";

/**
 * 删除所有表
 * @param dbName 数据库名称
 * @returns Promise对象，包含删除结果的状态和消息
 */
async function deleteAllTables(dbName: string): Promise<any> {
  const database: any = await useDatabase(dbName);
  let currentDb = database.result.target.result
  const objectStoreNames = Array.from(currentDb?.objectStoreNames ?? []);

  const deletePromises = objectStoreNames.map((tableName: any) =>
    this.deleteTable(dbName, tableName)
  );

  return Promise.all(deletePromises);
}

export default deleteAllTables
