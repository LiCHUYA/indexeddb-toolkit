/**
 * 生成文件短标识
 */
export declare function generateFileShortId(): string;
/**
 * 创建文件下载令牌
 */
export declare function createFileDownloadToken(file: File, customName?: string): Promise<string>;
