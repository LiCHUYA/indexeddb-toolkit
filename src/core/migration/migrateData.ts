import ResponseMessages from '../../constant'
import { useDatabase, createTable, getTableNames } from '../index'
import { logger } from '../../utils/logger'
import { findDBData } from '../index'

interface MigrationOptions {
  overwrite?: boolean
  transform?: (data: any) => any
  onProgress?: (progress: MigrationProgress) => void
}

interface MigrationProgress {
  phase: 'reading' | 'writing'
  current: number
  total: number
  percentage: number
  message: string
}

async function migrateData(
  fromDB: string,
  toDB: string,
  options: MigrationOptions = {}
): Promise<any> {
  try {
    // 1. 获取源数据库的所有数据
    const sourceData = await findDBData(fromDB)
    console.log('源数据:', sourceData)

    if (!sourceData || !Array.isArray(sourceData)) {
      return ResponseMessages.TB_MIGRATE_ERROR('源数据库为空')
    }

    // 2. 获取所有表名和版本信息
    const tables = sourceData.map(table => ({
      name: table.tableName,
      version: table.version || 1
    }))

    if (!tables.length) {
      return ResponseMessages.TB_MIGRATE_ERROR('源数据库没有表')
    }

    // 3. 获取目标数据库的已有表
    const existingTablesResult = await getTableNames(toDB)
    const existingTables = existingTablesResult?.result || []

    // 4. 只为不存在的表创建表结构
    const tablesToCreate = tables.filter(table => !existingTables.includes(table.name))
    if (tablesToCreate.length > 0) {
      logger.debug(`需要创建 ${tablesToCreate.length} 个表`)
      for (const table of tablesToCreate) {
        await createTable(toDB, table.name, { version: table.version })
        logger.debug(`表 ${table.name} 创建成功`)
      }
    }

    // 5. 获取数据库连接
    const targetDB = await useDatabase(toDB)

    // 6. 遍历每个表进行数据迁移
    let totalRecords = 0
    for (const table of sourceData) {
      try {
        const tableName = table.tableName

        // 读取阶段
        if (options.onProgress) {
          options.onProgress({
            phase: 'reading',
            current: sourceData.indexOf(table),
            total: sourceData.length,
            percentage: Math.round((sourceData.indexOf(table) / sourceData.length) * 100),
            message: `正在读取表 ${tableName} 的数据`
          })
        }

        let tableData = table.children?.result || []
        if (!Array.isArray(tableData)) {
          logger.warn(`表 ${tableName} 的数据不是数组，跳过`)
          continue
        }

        // 数据转换
        if (options.transform) {
          tableData = options.transform(tableData)
        }

        // 写入阶段
        if (options.onProgress) {
          options.onProgress({
            phase: 'writing',
            current: sourceData.indexOf(table),
            total: sourceData.length,
            percentage: Math.round((sourceData.indexOf(table) / sourceData.length) * 100),
            message: `正在写入表 ${tableName} 的数据`
          })
        }

        const transaction = targetDB.transaction(tableName, 'readwrite')
        const store = transaction.objectStore(tableName)

        // 如果需要覆盖，先清空目标表
        if (options.overwrite) {
          await new Promise((resolve, reject) => {
            const request = store.clear()
            request.onsuccess = () => resolve(undefined)
            request.onerror = () => reject(request.error)
          })
        }

        // 批量写入数据
        await Promise.all(tableData.map((item: any) => {
          return new Promise((resolve, reject) => {
            const request = store.add(item)
            request.onsuccess = () => resolve(undefined)
            request.onerror = () => reject(request.error)
          })
        }))

        totalRecords += tableData.length
        logger.debug(`表 ${tableName} 迁移完成，共迁移 ${tableData.length} 条记录`)

      } catch (error) {
        logger.error(`迁移表 ${table.tableName} 失败:`, error)
        throw error
      }
    }

    // 7. 关闭目标数据库连接
    targetDB.close()

    const result = {
      fromDB,
      toDB,
      tables: tables.map(t => t.name),
      totalRecords
    }

    logger.debug('数据迁移成功:', result)
    return ResponseMessages.TB_MIGRATE_SUCCESS(result)

  } catch (error) {
    logger.error('数据迁移失败:', error)
    return ResponseMessages.TB_MIGRATE_ERROR(error)
  }
}

export default migrateData 