/**
 * 判断表是否存在
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @returns 表是否存在的布尔值
 */
declare function isTableExist(dbName: string, tableName: string): Promise<boolean>;
export default isTableExist;
