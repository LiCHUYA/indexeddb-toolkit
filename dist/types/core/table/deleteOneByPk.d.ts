/**
 * 根据主键删除单条数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param id 主键值
 * @returns Promise对象，包含删除结果的状态和消息
 */
declare function deleteOneByPk(dbName: string, tableName: string, id: number): Promise<any>;
export default deleteOneByPk;
