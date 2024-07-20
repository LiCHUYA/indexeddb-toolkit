/**
 * 根据索引批量删除数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param indexName 索引名称
 * @param indexValues 索引值数组
 * @returns Promise对象，包含删除结果的状态和消息
 */
declare function deleteManyByIndex(dbName: string, tableName: string, indexName: string, indexValues: any[]): Promise<any>;
export default deleteManyByIndex;
