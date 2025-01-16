/**
 * @fileoverview 主入口文件
 */

// 导出核心功能
export {
  useDatabase,
  deleteTable,
  deleteDatabase,
  deleteAllDatabases,
  closeAllConnections
} from './core'

// 导出表操作相关
export {
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
  deleteManyByIndex
} from './core/'

// 导出文件存储相关
export {
  saveFilesToDB,
  getFileFromDB,
  revokeFileUrl
} from './core/table/fileStorage'

// 导出查询相关
export {
  createQuery,
  Query,
  QueryBuilder,
  QueryMapper
} from './core/query'

// 导出数据传输相关
export {
  createTransfer,
  DataTransfer
} from './core/transfer'

// 导出类型定义
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

// 默认导出所有功能
export default {
  useDatabase,
  deleteTable,
  deleteDatabase,
  deleteAllDatabases,
  closeAllConnections,
  // ... 其他导出的功能
}
