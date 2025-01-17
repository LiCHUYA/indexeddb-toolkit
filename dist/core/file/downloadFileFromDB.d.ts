interface DownloadOptions {
    type?: 'raw' | 'handled';
    fileName?: string;
}
/**
 * 下载单个文件
 * @description 从数据库获取并下载文件，支持原始文件和处理后的文件
 */
declare function downloadFileFromDB(dbName: string, tableName: string, fileId: number, options?: DownloadOptions): Promise<any>;
export default downloadFileFromDB;
