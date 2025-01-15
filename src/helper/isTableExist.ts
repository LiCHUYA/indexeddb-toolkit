import { useDatabase } from '../core'

/**
 * 判断表是否存在
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @returns 表是否存在的布尔值
 */
async function isTableExist(dbName: string, tableName: string): Promise<boolean> {
  try {
    const db = await useDatabase(dbName);
    return db.objectStoreNames.contains(tableName);
  } catch (error) {
    return false;
  }
}

export default isTableExist
