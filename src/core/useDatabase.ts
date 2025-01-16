import ResponseMessages from '../constant/index'
import { getIndexedDBVersion } from '../helper/index'
import { logger } from '../utils/logger'

interface DatabaseResponse {
  type: 'success' | 'error'
  data: IDBDatabase
  message: string
}

/**
 * 使用指定的数据库
 *
 * @param {string} dbName - 数据库名称
 * @param {number} [version] - 可选的版本号
 * @returns {Promise<IDBDatabase>} Promise对象，返回数据库实例
 * @throws {Error} 当数据库操作失败时抛出错误
 */
function useDatabase(dbName: string, version?: number): Promise<IDBDatabase> {
  if (!dbName) {
    throw new Error(ResponseMessages.DBNAME_IS_NULL().message)
  }

  return new Promise((resolve, reject) => {
    const handleSuccess = (event: IDBVersionChangeEvent | Event) => {
      const target = event.target as IDBOpenDBRequest
      resolve(target.result)
    }

    const handleVersionError = async (dbName: string, error: any) => {
      try {
        // 获取已存在的数据库连接
        const existingDB = (error.target as any)?.result
        if (existingDB) {
          const currentVersion = existingDB.version
          existingDB.close()
          
          // 使用更高的版本号重新打开数据库
          const newVersion = version || (currentVersion + 1)
          logger.debug(`Upgrading database ${dbName} from version ${currentVersion} to ${newVersion}`)
          
          const newRequest = window.indexedDB.open(dbName, newVersion)
          newRequest.onsuccess = handleSuccess
          newRequest.onerror = (event: Event) => {
            const target = event.target as IDBOpenDBRequest
            reject(target.error)
          }
          newRequest.onupgradeneeded = (event) => {
            logger.debug(`Database ${dbName} upgrade needed to version ${newVersion}`)
            handleSuccess(event)
          }
          return
        }

        // 如果没有现有连接，获取新版本并递增
        const currentVersion = await getIndexedDBVersion(dbName)
        const newVersion = version || (currentVersion + 1)
        logger.debug(`Opening database ${dbName} with new version ${newVersion}`)
        
        const newRequest = window.indexedDB.open(dbName, newVersion)
        newRequest.onsuccess = handleSuccess
        newRequest.onerror = (event: Event) => {
          const target = event.target as IDBOpenDBRequest
          reject(target.error)
        }
        newRequest.onupgradeneeded = (event) => {
          logger.debug(`Database ${dbName} upgrade needed to version ${newVersion}`)
          handleSuccess(event)
        }
      } catch (error) {
        logger.error(`Error handling version change for database ${dbName}:`, error)
        reject(error)
      }
    }

    // 首次尝试打开数据库
    const initialRequest = window.indexedDB.open(dbName, version)

    initialRequest.onsuccess = handleSuccess

    initialRequest.onerror = (event: Event) => {
      const target = event.target as IDBOpenDBRequest
      const error = target.error

      if (error?.name === 'VersionError') {
        handleVersionError(dbName, error)
      } else {
        logger.error(`Error opening database ${dbName}:`, error)
        reject(error)
      }
    }

    initialRequest.onupgradeneeded = (event) => {
      logger.debug(`Database ${dbName} upgrade needed to version ${version}`)
      handleSuccess(event)
    }
  })
}

export default useDatabase