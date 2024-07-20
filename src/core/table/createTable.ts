import ResponseMessages from '../../constant'
import useDatabase from '../useDatabase'
import { closeCurrentConnection, getIndexedDBVersion } from '../../helper/index'
import { isTableExist } from '../../helper'

/**
 * 创建表
 * @param {string} dbName - 数据库名称。
 * @param {string} tableName - 表名称。
 * @param {any[]} [indexs=['default']] - 索引数组，用于查询时。
 * @returns {Promise<any>} Promise对象，包含创建结果的状态和状态码。
 * @throws {Error} 如果表创建失败，则抛出错误。
 * @description
 * 当不熟悉indexs这个参数的时候,可以理解为每一张表的字段名,我们直接传递['字段1']
 * @example
 * createTable('test','abc',['message','age']).then()
 * 以上代码就是代表在test数据库下创建abc表,表的索引是message和age。
 */
async function createTable(
  dbName: string,
  tableName: string,
  indexs: any[] = ['default']
): Promise<any> {
  // 检查数据库名称是否为空
  if (!dbName) {
    return ResponseMessages.DBNAME_IS_NULL()
  }

  // 检查表名称是否为空
  if (!tableName) {
    return ResponseMessages.TBNAME_IS_NULL()
  }

  try {
    // 判断表是否存在
    const tableExist = await isTableExist(dbName, tableName)
    console.log(tableExist)
    if (tableExist) {
      const message = `${tableName} 表已存在`
      console.log(ResponseMessages.TB_EXIST({ info: message }))
      return ResponseMessages.TB_EXIST({ info: message })
    }

    // 关闭之前的连接
    // await closeCurrentConnection(dbName);

    // 获取新的数据库版本号
    const currentVersion = await getIndexedDBVersion(dbName)
    const newVersion = Number(currentVersion) + 1
    localStorage.setItem('dbVersion', newVersion.toString())

    // 返回 Promise 对象，处理表创建
    return new Promise<any>((resolve, reject) => {
      const request = window.indexedDB.open(dbName, newVersion)

      request.onerror = (event: any) => {
        reject(ResponseMessages.OPEN_TB_ERROR(event.target.error))
      }

      request.onupgradeneeded = (event: any) => {
        try {
          const db = event.target.result
          const store = db.createObjectStore(tableName, { keyPath: 'id' })

          if (indexs && indexs.length) {
            indexs.forEach((index: string) => {
              store.createIndex(index, index, { unique: false })
            })
          }

          store.transaction.oncomplete = () => {
            console.log(ResponseMessages.TB_CREATE_SUCCESS())
            resolve(ResponseMessages.TB_CREATE_SUCCESS())
          }
        } catch (error) {
          reject(ResponseMessages.BASIC_ERROR(error))
        }
      }

      request.onsuccess = () => {
        // --newVersion;
        resolve(ResponseMessages.TB_CREATE_SUCCESS())
      }
    })
  } catch (error) {
    return ResponseMessages.BASIC_ERROR(error.message)
  }
}

export default createTable
