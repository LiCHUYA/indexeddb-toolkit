import ResponseMessages from '../../constant'
import deleteDatabase from '../database/deleteDatabase'
import { getAllDB } from '../../helper/index'

/**
 * 删除所有数据库
 * @returns Promise对象，包含删除结果的状态和消息
 * @example
 * 该方法请慎重使用。
 */
async function deleteAllDatabases(): Promise<any> {
  try {
    const allDatabasesResponse = await getAllDB()
    if (allDatabasesResponse.result.length > 0) {
      const deletePromises = allDatabasesResponse.result.map((db: any) => deleteDatabase(db.name))
      await Promise.all(deletePromises)
      return ResponseMessages.DEL_ALL_DB_SUCCESS()
    } else {
      return ResponseMessages.DB_NOTFOUND()
    }
  } catch (error) {
    return ResponseMessages.BASIC_ERROR(error)
  }
}

export default deleteAllDatabases
