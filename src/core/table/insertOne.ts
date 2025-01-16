import ResponseMessages from '../../constant'
import { isTableExist } from '../../helper'
import { useDatabase } from '../index'

// 插入一条数据到指定表
async function insertOne<T extends object>(
  dbName: string, 
  tableName: string, 
  data: T
): Promise<any> {
  // 检查数据库名称是否为空
  if (!dbName) {
    return ResponseMessages.DBNAME_IS_NULL()
  }

  // 检查表是否存在
  const tableExist = await isTableExist(dbName, tableName)
  if (!tableExist) {
    return ResponseMessages.TB_NOTFOUND()
  }

  // 使用指定的数据库
  const db = await useDatabase(dbName)

  // 返回一个新的Promise
  return new Promise<any>((resolve, reject) => {
    // 开启一个读写事务
    const transaction = db.transaction([tableName], 'readwrite')
    const store = transaction.objectStore(tableName)

    // 获取主键名
    const keyPath = store.keyPath as string
    
    // 如果数据中没有主键，且是自增主键，则不添加id
    // 如果数据中没有主键，且不是自增主键，则添加id
    let finalData: T
    if (!(keyPath in data)) {
      if (!store.autoIncrement) {
        finalData = { 
          [keyPath]: Date.now(),
          ...data 
        } as T
      } else {
        finalData = data
      }
    } else {
      finalData = data
    }

    // 添加数据
    const request = store.add(finalData)

    // 成功时的处理
    request.onsuccess = (event: any) => {
      resolve(ResponseMessages.TB_INSERT_SUCCESS(event))
    }

    // 失败时的处理
    request.onerror = (event: any) => {
      reject(ResponseMessages.TB_INSERT_ERROR(event))
    }
  })
}

export default insertOne
