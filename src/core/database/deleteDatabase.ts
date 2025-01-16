import ResponseMessages from '../../constant'

/**
 * 删除指定数据库
 * @param dbName 数据库名称
 * @returns Promise对象，包含删除结果的状态和消息
 */
function deleteDatabase(dbName: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const request = window.indexedDB.deleteDatabase(dbName)

    request.onsuccess = (event: Event) => {
      resolve(ResponseMessages.DEL_DB_SUCCESS(event))
    }

    request.onerror = (event: any) => {
      reject(ResponseMessages.DB_DELETE_ERROR(event.target.error))
    }
  })
}
export default deleteDatabase
