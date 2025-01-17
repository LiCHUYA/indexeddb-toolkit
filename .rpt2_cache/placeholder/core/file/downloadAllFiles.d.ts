interface DownloadAllOptions {
    type?: 'raw' | 'handled';
    zipName?: string;
}
/**
 * 批量下载文件
 * @description 支持打包下载多个文件，可选择原始文件或处理后的文件
 */
declare function downloadAllFiles(dbName: string, tableName: string, options?: DownloadAllOptions): Promise<any>;
export default downloadAllFiles;
