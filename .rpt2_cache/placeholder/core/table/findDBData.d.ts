interface TableData {
    tableName: string;
    version: string | number;
    children: any;
}
/**
 * 查询指定数据库中的数据，如果提供了表名，则查询该表的数据；如果未提供表名，则查询所有表的数据。
 * @async
 * @param {string} dbName - 数据库名称
 * @param {string} [tableName] - 可选，表名。如果提供了表名，则查询该表的数据；如果未提供表名，则查询所有表的数据
 * @returns {Promise<TableData[] | IReturn>} 返回包含查询结果的Promise对象
 */
declare function findDBData(dbName: string, tableName?: string): Promise<TableData[] | any>;
export default findDBData;
