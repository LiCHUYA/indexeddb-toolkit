/**
 * 查询指定数据库中的数据，如果提供了表名，则查询该表的数据；如果未提供表名，则查询所有表的数据。
 * @async
 * @function
 * @param {string} dbName - 数据库名称。
 * @param {string} [tableName] - 可选，表名。如果提供了表名，则查询该表的数据；如果未提供表名，则查询所有表的数据。
 * @returns {Promise<any>} 返回一个包含查询结果的Promise对象。如果查询成功，返回包含查询结果的数组；如果查询失败，返回错误信息。
 * @throws {Error} 如果表数据查询失败，则抛出错误。
 */
declare function findDBData(dbName: string, tableName?: string): Promise<any>;
export default findDBData;
