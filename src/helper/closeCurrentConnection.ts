import { useDatabase } from '../core'

/**
 * 关闭当前数据库连接
 */
async function closeCurrentConnection(dbName: string) {
  const database: any = await useDatabase(dbName)
  console.log(database)
  database.result.close()
}

export default closeCurrentConnection
