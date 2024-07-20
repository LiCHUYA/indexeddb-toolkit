import ResponseMessages from "../constant";

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

export default getAllDB

