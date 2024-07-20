/**
 * 创建表
 * @param {string} dbName - 数据库名称。
 * @param {string} tableName - 表名称。
 * @param {any[]} [indexs=['default']] - 索引数组，用于查询时。
 * @returns {Promise<any>} Promise对象，包含创建结果的状态和状态码。
 * @throws {Error} 如果表创建失败，则抛出错误。
 * @description
 * 当不熟悉indexs这个参数的时候,可以理解为每一张表的字段名,我们直接传递['字段1']
 * @example
 * createTable('test','abc',['message','age']).then()
 * 以上代码就是代表在test数据库下创建abc表,表的索引是message和age。
 */
declare function createTable(dbName: string, tableName: string, indexs?: any[]): Promise<any>;
export default createTable;
