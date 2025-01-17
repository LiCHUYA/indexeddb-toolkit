interface GetFileOptions {
    generateUrl?: boolean;
}
/**
 * 从数据库获取文件
 * @description 根据ID获取文件信息，支持URL生成
 */
declare function getFileFromDB(dbName: string, tableName: string, fileId: number, options?: GetFileOptions): Promise<any>;
export default getFileFromDB;
