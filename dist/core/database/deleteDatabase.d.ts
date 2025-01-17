/**
 * 删除指定数据库
 * @param dbName 数据库名称
 * @returns Promise对象，包含删除结果的状态和消息
 */
declare function deleteDatabase(dbName: string): Promise<any>;
export default deleteDatabase;
