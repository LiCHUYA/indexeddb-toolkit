/**
 * 根据索引查询数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param indexName 索引名称
 * @param indexValue 索引值
 * @param isAll 根据索引查询出来的值,查出来全部值还是默认第一条
 * @returns Promise对象，包含查询结果对象
 */
declare function findByIndex(dbName: string, tableName: string, indexName: string, indexValue: any, isAll?: boolean): Promise<any>;
export default findByIndex;
