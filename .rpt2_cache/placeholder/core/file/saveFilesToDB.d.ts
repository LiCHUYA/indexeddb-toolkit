interface SaveFileOptions {
    generateThumbnail?: boolean;
    thumbnailSize?: number;
    generateUrl?: boolean;
}
/**
 * 保存文件到数据库
 * @description 自动检查并创建数据库表，然后保存文件。支持图片缩略图、文件压缩等处理。
 */
declare function saveFilesToDB(dbName: string, tableName: string, file: File, options?: SaveFileOptions): Promise<any>;
export default saveFilesToDB;
