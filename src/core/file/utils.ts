/**
 * 生成文件短标识
 */
export function generateFileShortId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `${timestamp}-${random}`
}

/**
 * 创建文件下载令牌
 */
export async function createFileDownloadToken(
  file: File,
  customName?: string
): Promise<string> {
  const fileData = await file.arrayBuffer()
  const hash = await crypto.subtle.digest('SHA-256', fileData)
  const hashArray = Array.from(new Uint8Array(hash))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  
  return `${hashHex}_${customName || file.name}`
} 