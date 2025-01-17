/**
 * 获取指定数据库的版本号
 * @param databaseName 数据库名称
 * @returns Promise对象，包含数据库的版本号
 */
declare function getIndexedDBVersion(databaseName: string): Promise<number>;
export default getIndexedDBVersion;
