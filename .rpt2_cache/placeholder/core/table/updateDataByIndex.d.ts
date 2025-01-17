/**
 * 根据索引更新数据
 * @param dbName 数据库名称
 * @param tbName 表名称
 * @param indexName 索引名称
 * @param indexValue 索引值
 * @param data 更新的数据
 * @returns Promise对象，包含更新结果
 */
declare function updateDataByIndex<T extends {
    [key: string]: any;
}>(dbName: string, tbName: string, indexName: string, indexValue: any, data: Partial<T>): Promise<any>;
export default updateDataByIndex;
