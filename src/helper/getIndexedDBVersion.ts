import ResponseMessages from '../constant'

/**
 * 获取指定数据库的版本号
 * @param databaseName 数据库名称
 * @returns Promise对象，包含数据库的版本号
 */
function getIndexedDBVersion(databaseName: string): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    if (!databaseName) {
      return ResponseMessages.DBNAME_IS_NULL()
    }
    const request = window.indexedDB.open(databaseName)
    request.onsuccess = function(event: any) {
      const db: any = event.target.result
      const version = db.version
      db.close()
      resolve(version)
    }
    request.onerror = function(event: any) {
      reject(ResponseMessages.BASIC_ERROR(event.target.error))
    }
  })
}

export default getIndexedDBVersion

