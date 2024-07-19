import ResponseMessages from "../../constant";
import deleteDatabase from '../database/deleteDatabase'

/**
 * 删除所有数据库
 * @returns {Promise<{status: number, message: string}>} Promise对象，包含删除结果的状态和消息
 */
async function deleteAllDatabases(): Promise<any> {
  try {
    const allDatabasesResponse = await getAllDB();
    if (allDatabasesResponse.result.length > 0) {
      const deletePromises = allDatabasesResponse.result.map((db: any) =>
        deleteDatabase(db.name)
      );
      await Promise.all(deletePromises);

      return ResponseMessages.DEL_ALL_DB_SUCCESS();
    } else {
      return ResponseMessages.DB_NOTFOUNT();
    }
  } catch (error) {
    return ResponseMessages.BASIC_ERROR(error);
  }
}

/**
 * 获取所有数据库实例
 * @returns {Promise<{status: number, message: string, data: any[]}>} Promise对象，包含所有数据库实例的数组
 */
async function getAllDB(): Promise<any> {
  try {
    const res = await indexedDB.databases();
    if (Array.isArray(res)) {
      return ResponseMessages.GET_ALL_DBS_SUCCESS(res);
    } else {
      return ResponseMessages.DB_NOTFOUNT();
    }
  } catch (error) {
    return ResponseMessages.BASIC_ERROR(error);
  }
}

export default deleteAllDatabases
