/**
 * 根据索引删除单条数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param indexName 索引名称
 * @param indexValue 索引值
 * @returns Promise对象，包含删除结果的状态和消息
 */
declare function deleteOneByIndex(dbName: string, tableName: string, indexName: string, indexValue: any): Promise<any>;
export default deleteOneByIndex;
