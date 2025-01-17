import ResponseMessages from '../../constant'
import useDatabase from '../useDatabase'

/**
 * 获取指定数据库中的表数量
 * @param dbName 数据库名称
 * @returns Promise对象，包含表名称数组
 */
async function getTableNames(dbName: string): Promise<any> {
  // 检查数据库名称是否为空
  if (!dbName) {
    return ResponseMessages.DBNAME_IS_NULL();
  }

  try {
    // 获取数据库对象
    const db = await useDatabase(dbName);
    // 将对象存储名称列表转换为数组
    const objectStoreNames = Array.from(db.objectStoreNames);

    // 根据对象存储名称列表的长度返回相应的消息
    if (objectStoreNames.length === 0) {
      return ResponseMessages.GET_TABLES_SUCCESS();
    } else {
      return ResponseMessages.GET_TABLES_SUCCESS(objectStoreNames as any);
    }
  } catch (error) {
    return ResponseMessages.BASIC_ERROR(error);
  }
}

export default getTableNames
