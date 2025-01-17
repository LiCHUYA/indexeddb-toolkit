/**
 * 使用指定的数据库
 *
 * @param {string} dbName - 数据库名称
 * @param {number} [version] - 可选的版本号
 * @returns {Promise<IDBDatabase>} Promise对象，返回数据库实例
 * @throws {Error} 当数据库操作失败时抛出错误
 */
declare function useDatabase(dbName: string, version?: number): Promise<IDBDatabase>;
export default useDatabase;
