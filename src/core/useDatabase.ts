import ResponseMessages from '../constant/index'

import {getIndexedDBVersion} from '../helper/index'

/**
 * 使用指定的数据库
 * @param dbName 数据库名称
 * @returns Promise对象，包含当前数据库实例
 */
function useDatabase(dbName: string) {
  if (!dbName) {
    return ResponseMessages.DBNAME_IS_NULL()
  }
  const request = window.indexedDB.open(dbName)

  return new Promise((resolve, reject) => {
    request.onsuccess = (event: any) => {
      resolve(ResponseMessages.OPEN_DB_SUCCESS(event))
    }
    request.onerror = async (event: any) => {
      try {
        const message = event.target.error.name
        if (message === 'VersionError') {
          const version = await getIndexedDBVersion(dbName)
          const request = window.indexedDB.open(dbName, version)
          request.onsuccess = (event: any) => {
            resolve(ResponseMessages.OPEN_DB_SUCCESS(event))
          }
        } else {
          resolve(ResponseMessages.OPEN_DB_ERROR(event.target.error))
        }
      } catch (error) {
        reject(ResponseMessages.BASIC_ERROR(event.target.error))
      }
    }

    request.onupgradeneeded = (event: any) => {
      try {
        resolve(ResponseMessages.OPEN_DB_SUCCESS(event))
      } catch (error) {
        reject(ResponseMessages.BASIC_ERROR(event.target.error))
      }
    }
  })
}

export default useDatabase
