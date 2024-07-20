/**
 * 根据主键数组批量删除数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param keys 主键值数组
 * @returns Promise对象，包含删除结果的状态和消息
 */
declare function deleteManyByPK(dbName: string, tableName: string, keys: any[]): Promise<any>;
export default deleteManyByPK;
