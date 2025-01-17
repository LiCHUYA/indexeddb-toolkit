import ResponseMessages from '../../constant'
import { useDatabase } from '../index'
import { logger } from '../../utils/logger'
import { isTableExist, closeAllConnections } from '../../helper'

/**
 * 索引类型枚举
 */
export enum IndexType {
  UNIQUE = 'unique',      // 唯一索引
  MULTI_ENTRY = 'multi',  // 多值索引
  NORMAL = 'normal'       // 普通索引
}

/**
 * 索引配置接口
 */
interface IndexConfig {
  name: string           // 索引字段名
  type: IndexType        // 索引类型
}

/**
 * 表配置选项
 */
interface TableOptions {
  primaryKey?: string                // 主键字段，默认 'id'
  autoIncrement?: boolean            // 是否自增，默认 true
  version?: number                   // 数据库版本号
  indexes?: Array<string | IndexConfig>  // 支持字符串数组或配置数组
  timeout?: number     // 超时时间,默认3000ms
  force?: boolean      // 是否强制创建,默认true
}

/**
 * 创建数据库表
 * @description 
 * 创建一个新的 IndexedDB 对象仓库并配置索引。
 * 支持唯一索引和多值索引。
 * 
 * @example
 * ```typescript
 * // 创建用户表 - 简单方式
 * await createTable('myDB', 'users', {
 *   primaryKey: 'userId',
 *   indexes: ['email', 'name', 'tags'] // 默认为普通索引
 * })
 * 
 * // 创建用户表 - 高级配置
 * await createTable('myDB', 'users', {
 *   primaryKey: 'userId',
 *   indexes: [
 *     'name',                          // 普通索引
 *     { 
 *       name: 'email',
 *       type: IndexType.UNIQUE         // 唯一索引
 *     },
 *     {
 *       name: 'tags',
 *       type: IndexType.MULTI_ENTRY    // 多值索引，用于数组字段
 *     }
 *   ]
 * })
 * ```
 */
async function createTable(
  dbName: string,
  tableName: string,
  options: TableOptions = {}
): Promise<any> {
  try {
    const {
      primaryKey = 'id',
      autoIncrement = true,
      indexes = [],
      timeout = 3000,
      force = true
    } = options

    // 参数验证
    if (!dbName) return ResponseMessages.DBNAME_IS_NULL()
    if (!tableName) return ResponseMessages.TBNAME_IS_NULL()

    // 检查表是否存在
    const exists = await isTableExist(dbName, tableName)
    if (exists) return ResponseMessages.TB_EXIST(tableName)

    // 获取数据库连接
    const db = await useDatabase(dbName)
    const newVersion = db.version + 1
    db.close()

    return new Promise((resolve, reject) => {
      const openRequest = window.indexedDB.open(dbName, newVersion)
      let timeoutId: any

      // 设置超时处理
      if (timeout > 0) {
        timeoutId = setTimeout(async () => {
          if (force) {
            try {
              await closeAllConnections()
              const retryRequest = window.indexedDB.open(dbName, newVersion)
              setupHandlers(retryRequest)
            } catch (err) {
              reject(ResponseMessages.TB_CREATE_ERROR(err))
            }
          } else {
            reject(ResponseMessages.TB_CREATE_ERROR('创建表超时'))
          }
        }, timeout)
      }

      const setupHandlers = (request: IDBOpenDBRequest) => {
        request.onblocked = () => {
          logger.warn('数据库升级被阻塞 - 等待其他连接关闭')
          // 阻塞时不立即失败,等待超时或强制处理
        }

        request.onupgradeneeded = (event: any) => {
          clearTimeout(timeoutId)
          const database = event.target.result
          try {
            const store = database.createObjectStore(tableName, {
              keyPath: primaryKey,
              autoIncrement
            })

            indexes.forEach(index => {
              const indexConfig: IDBIndexParameters = {}

              if (typeof index === 'string') {
                store.createIndex(index, index, indexConfig)
                logger.debug(`创建普通索引: ${index}`)
              } else {
                switch (index.type) {
                  case IndexType.UNIQUE:
                    indexConfig.unique = true
                    break
                  case IndexType.MULTI_ENTRY:
                    indexConfig.multiEntry = true
                    break
                  case IndexType.NORMAL:
                    break
                }

                store.createIndex(index.name, index.name, indexConfig)
                logger.debug(`创建${index.type}索引: ${index.name}`)
              }
            })

            logger.debug(`表 ${tableName} 创建成功，共创建 ${indexes.length} 个索引`)
          } catch (error) {
            logger.error(`创建表 ${tableName} 失败:`, error)
            reject(ResponseMessages.TB_CREATE_ERROR(error))
          }
        }

        request.onsuccess = (event: any) => {
          clearTimeout(timeoutId)
          const database = event.target.result
          database.close()
          resolve(ResponseMessages.TB_CREATE_SUCCESS())
        }

        request.onerror = (event: any) => {
          clearTimeout(timeoutId)
          logger.error('创建表失败:', event.target.error)
          reject(ResponseMessages.TB_CREATE_ERROR(event.target.error))
        }
      }

      setupHandlers(openRequest)
    })

  } catch (error) {
    logger.error('创建表失败:', error)
    return ResponseMessages.TB_CREATE_ERROR(error)
  }
}

export default createTable
