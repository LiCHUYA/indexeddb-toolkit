/**
 * 关闭当前数据库连接
 * @param {string} dbName 数据库名称
 * @returns {Promise<void>}
 */
declare function closeCurrentConnection(dbName: string): Promise<void>;
export default closeCurrentConnection;
