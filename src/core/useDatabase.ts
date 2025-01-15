import ResponseMessages from '../constant/index'
import { getIndexedDBVersion } from '../helper/index'

interface DatabaseResponse {
  type: 'success' | 'error';
  data: IDBDatabase;
  message: string;
}

/**
 * 使用指定的数据库
 *
 * @param {string} dbName - 数据库名称
 * @returns {Promise<IDBDatabase>} Promise对象，返回数据库实例
 * @throws {Error} 当数据库操作失败时抛出错误
 */
function useDatabase(dbName: string): Promise<IDBDatabase> {
  if (!dbName) {
    throw new Error(ResponseMessages.DBNAME_IS_NULL().message);
  }

  return new Promise((resolve, reject) => {
    const handleSuccess = (event: IDBVersionChangeEvent | Event) => {
      const target = event.target as IDBOpenDBRequest;
      resolve(target.result);
    };

    const handleVersionError = async (dbName: string, error: Error) => {
      try {
        // 获取已存在的数据库连接
        const existingDB = (error.target as IDBOpenDBRequest)?.result;
        if (existingDB) {
          // 如果有现有连接，直接使用它
          resolve(existingDB);
          return;
        }

        // 只有在确实需要时才获取新版本
        const version = await getIndexedDBVersion(dbName);
        const newRequest = window.indexedDB.open(dbName, version);
        newRequest.onsuccess = handleSuccess;
        newRequest.onerror = (event: Event) => {
          const target = event.target as IDBOpenDBRequest;
          reject(target.error);
        };
      } catch (error) {
        reject(error);
      }
    };

    const request = window.indexedDB.open(dbName);

    request.onsuccess = handleSuccess;

    request.onerror = (event: Event) => {
      const target = event.target as IDBOpenDBRequest;
      const error = target.error;
      
      if (error?.name === 'VersionError') {
        handleVersionError(dbName, error);
      } else {
        reject(error);
      }
    };

    request.onupgradeneeded = handleSuccess;
  });
}

export default useDatabase