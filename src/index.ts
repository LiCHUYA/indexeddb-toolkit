/**
 * @fileoverview 主入口文件
 */

export {
  useDatabase,
  getTableNames,
  deleteDatabase,
  deleteAllDatabases,
  deleteAllTables,
  deleteTable,
  createTable,
  insertOne,
  insertMany,
  findDBData,
  updateDataByPrimaryKey,
  updateDataByIndex,
  findByKey,
  findByIndex,
  deleteOneByPk,
  deleteOneByIndex,
  deleteManyByPK,
  deleteManyByIndex,
  saveFilesToDB,
  getFileFromDB,
  revokeFileUrl,
  createQuery,
  Query,
  QueryBuilder,
  QueryMapper,
  createTransfer,
  DataTransfer
} from './core'

// 默认导出
export { default } from './core'

// 重新导出所有类型
export type {
  QueryConfig,
  WhereConfig,
  OrderConfig,
  ProgressInfo,
  QueryOptions,
  WhereCondition
} from './core/query/types'

export type {
  ExportOptions,
  ImportOptions,
  TransferResult
} from './core/transfer/types'
