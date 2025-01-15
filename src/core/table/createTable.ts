import ResponseMessages from '../../constant'
import { useDatabase } from '../index'
import { TableOptions } from './types'
// import { createObjectStore, createIndexes } from '../../helper'
import { closeCurrentConnection, closeAllConnections } from '../../helper/index'

/**
 * 创建表
 * @param {string} dbName - 数据库名称
 * @param {string} tableName - 表名称
 * @param {TableOptions} options - 表配置选项
 * @returns {Promise<any>} 创建结果
 */
async function createTable(
  dbName: string,
  tableName: string,
  options: TableOptions = {}
): Promise<any> {
  if (!dbName) return ResponseMessages.DBNAME_IS_NULL()
  if (!tableName) return ResponseMessages.TBNAME_IS_NULL()

  const { keyPath = 'id', autoIncrement = true, indexs = [] } = options
  const currentVersion = parseInt(localStorage.getItem('dbVersion') || '1', 10)
  const newVersion = currentVersion + 1

  try {
    // 先尝试关闭所有可能的连接
    await closeAllConnections()
    
    return new Promise((resolve, reject) => {
      let retryCount = 0
      const maxRetries = 3
      const retryDelay = 1000 // 1秒

      async function handleDatabaseBlocked() {
        console.warn('Database blocked, attempting to resolve...')
        
        try {
          // 强制关闭所有数据库连接
          await closeAllConnections()
          
          if (retryCount < maxRetries) {
            retryCount++
            console.log(`Retrying (${retryCount}/${maxRetries}) in ${retryDelay}ms...`)
            setTimeout(() => openDatabase({ resolve, reject }), retryDelay)
          } else {
            reject(ResponseMessages.OPEN_TB_ERROR(
              new Error('Database blocked after maximum retries') as any
            ))
          }
        } catch (error) {
          console.error('Error handling blocked database:', error)
          reject(ResponseMessages.OPEN_TB_ERROR(error))
        }
      }

      function handleUpgradeNeeded(event: IDBVersionChangeEvent) {
        try {
          const db = (event.target as IDBOpenDBRequest).result
          
          if (db.objectStoreNames.contains(tableName)) {
            return resolve(ResponseMessages.TB_EXIST({ 
              info: `${tableName} 表已存在` 
            }))
          }

          const store = createObjectStore(db, tableName, { keyPath, autoIncrement })
          createIndexes(store, indexs, keyPath)

          store.transaction.oncomplete = () => {
            localStorage.setItem('dbVersion', newVersion.toString())
            db.close() // 确保关闭连接
            resolve(ResponseMessages.TB_CREATE_SUCCESS())
          }

          store.transaction.onerror = (error) => {
            db.close()
            reject(ResponseMessages.TB_CREATE_ERROR(error))
          }
        } catch (error) {
          reject(ResponseMessages.BASIC_ERROR(error))
        }
      }

      async function openDatabase(conn: { resolve: Function, reject: Function }) {
        try {
          const request = indexedDB.open(dbName, newVersion)
          
          request.onblocked = handleDatabaseBlocked
          request.onupgradeneeded = handleUpgradeNeeded
          
          request.onsuccess = (event) => {
            const db = (event.target as IDBOpenDBRequest).result
            db.close() // 操作完成后立即关闭
            conn.resolve(ResponseMessages.TB_CREATE_SUCCESS())
          }

          request.onerror = async (event) => {
            const error = (event.target as IDBOpenDBRequest).error
            if (error?.name === 'VersionError' && retryCount < maxRetries) {
              retryCount++
              await closeAllConnections()
              setTimeout(() => openDatabase(conn), retryDelay)
            } else {
              conn.reject(ResponseMessages.OPEN_TB_ERROR(error as any))
            }
          }
        } catch (error) {
          conn.reject(ResponseMessages.BASIC_ERROR(error))
        }
      }

      // 开始创建表
      openDatabase({ resolve, reject })
    })

  } catch (error) {
    console.error('创建表失败:', error)
    return ResponseMessages.TB_CREATE_ERROR(error)
  }
}

export default createTable
