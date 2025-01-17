/**
 * 更新指定主键的数据
 * @param dbName 数据库名称
 * @param tbName 表名称
 * @param id 主键值
 * @param data 更新的数据
 * @returns Promise对象，包含更新结果
 */
declare function updateDataByPrimaryKey<T extends {
    [key: string]: any;
}>(dbName: string, tbName: string, id: number, data: Partial<T>): Promise<any>;
export default updateDataByPrimaryKey;
