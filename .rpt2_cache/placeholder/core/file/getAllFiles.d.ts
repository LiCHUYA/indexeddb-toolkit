interface GetAllFilesOptions {
    generateUrl?: boolean;
    page?: number;
    pageSize?: number;
}
/**
 * 获取所有文件
 * @description 支持分页和URL生成
 */
declare function getAllFiles(dbName: string, tableName: string, options?: GetAllFilesOptions): Promise<any>;
export default getAllFiles;
