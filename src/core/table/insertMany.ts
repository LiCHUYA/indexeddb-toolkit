import { useDatabase } from '../index'
import ResponseMessages from '../../constant'
// import { any } from './types'

/**
 * 批量插入数据
 * @param dbName 数据库名称
 * @param tableName 表名
 * @param data 要插入的数据数组
 * @param options 插入选项
 * @returns Promise<any>
 */
export async function insertMany(
  dbName: string,
  tableName: string,
  data: any[],
  options: {
    skipDuplicates?: boolean;  // 是否跳过重复键
    updateDuplicates?: boolean;  // 是否更新重复键
  } = {}
): Promise<any> {
  const result: any = {
    success: true,
    inserted: 0,
    failed: 0,
    errors: []
  }

  try {
    const db = await useDatabase(dbName)
    const transaction = db.transaction([tableName], 'readwrite')
    const store = transaction.objectStore(tableName)

    // 使用Promise.all处理所有插入操作
    await Promise.all(data.map(async (item) => {
      try {
        // 获取主键名
        const keyPath = store.keyPath as string;

        // 如果数据中没有主键，且是自增主键，则不添加id
        // 如果数据中没有主键，且不是自增主键，则添加id
        let finalData: any;
        if (!(keyPath in item)) {
          if (!store.autoIncrement) {
            finalData = { 
              [keyPath]: Date.now(),
              ...item 
            };
          } else {
            finalData = item;
          }
        } else {
          finalData = item;
        }

        if (options.updateDuplicates) {
          // 如果选择更新重复项，使用put
          await new Promise((resolve, reject) => {
            const request = store.put(finalData)
            request.onsuccess = () => resolve(undefined)
            request.onerror = () => reject(request.error)
          })
        } else {
          // 否则使用add，可能会抛出重复键错误
          await new Promise((resolve, reject) => {
            const request = store.add(finalData)
            request.onsuccess = () => resolve(undefined)
            request.onerror = (event) => {
              const error = request.error
              if (error?.name === 'ConstraintError' && options.skipDuplicates) {
                // 如果是重复键错误且设置了跳过重复，则忽略错误
                resolve(undefined)
              } else {
                reject(error)
              }
            }
          })
        }
        result.inserted++
      } catch (error) {
        result.failed++
        result.errors.push({
          item,
          error: error instanceof Error ? error.message : String(error)
        })
        if (!options.skipDuplicates && !options.updateDuplicates) {
          throw error // 如果没有设置跳过或更新重复项，则抛出错误
        }
      }
    }))

    return ResponseMessages.TB_INSERT_SUCCESS(result)
  } catch (error) {
    result.success = false
    return ResponseMessages.TB_INSERT_ERROR(error)
  }
}

export default insertMany
