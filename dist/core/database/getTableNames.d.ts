/**
 * 获取指定数据库中的表数量
 * @param dbName 数据库名称
 * @returns Promise对象，包含表名称数组
 */
declare function getTableNames(dbName: string): Promise<any>;
export default getTableNames;
