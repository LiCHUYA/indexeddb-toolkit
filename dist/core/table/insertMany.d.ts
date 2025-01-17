/**
 * 批量插入数据
 * @param dbName 数据库名称
 * @param tableName 表名
 * @param data 要插入的数据数组
 * @param options 插入选项
 * @returns Promise<any>
 */
export declare function insertMany(dbName: string, tableName: string, data: any[], options?: {
    skipDuplicates?: boolean;
    updateDuplicates?: boolean;
}): Promise<any>;
export default insertMany;
