/**
 * 释放文件URL，避免内存泄漏
 * @param url 文件URL
 */
declare function revokeFileUrl(url: string): void;
export default revokeFileUrl;
