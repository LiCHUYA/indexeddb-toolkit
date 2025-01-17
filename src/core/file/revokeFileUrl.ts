/**
 * 释放文件URL，避免内存泄漏
 * @param url 文件URL
 */
function revokeFileUrl(url: string): void {
  if (url.startsWith('blob:') || url.startsWith('data:')) {
    URL.revokeObjectURL(url)
  }
}

export default revokeFileUrl 