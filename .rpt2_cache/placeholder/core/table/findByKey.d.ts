/**
 * 根据主键查询数据或查询所有数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param key 主键值
 * @param isAll 是否查询所有数据，默认为 true
 * @returns Promise对象，包含查询结果对象
 */
declare function findByKey(dbName: string, tableName: string, key: any, isAll?: boolean): Promise<any>;
export default findByKey;
