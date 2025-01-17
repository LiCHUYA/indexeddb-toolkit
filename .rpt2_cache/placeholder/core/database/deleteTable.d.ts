/**
 * 删除指定表
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @returns Promise对象，包含删除结果的状态和消息
 */
declare function deleteTable(dbName: string, tableName: string): Promise<any>;
export default deleteTable;
