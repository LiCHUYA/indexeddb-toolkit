/**
 * 关闭当前数据库连接
 */
declare function closeCurrentConnection(dbName: string): Promise<void>;
export default closeCurrentConnection;
