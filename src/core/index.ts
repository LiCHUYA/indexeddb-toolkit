/**
 * @fileoverview 核心功能模块的统一导出
 */

import useDatabase from './useDatabase'
import * as databaseOperations from './database'
import * as tableOperations from './table'
import * as queryOperations from './query'
import * as transferOperations from './transfer'
import {
  saveFilesToDB,
  getFileFromDB,
  revokeFileUrl,
  downloadFileFromDB,
  getFileByShortId,
  generateFileShortId,
  createFileDownloadToken,
  getAllFiles,
  downloadAllFiles
} from './table/fileStorage'

// 导入数据迁移相关
import { migrateData } from './migration'
import type { 
  MigrationOptions, 
  MigrationProgress,
  MigrationResult 
} from './migration/types'

// 从query模块重新导出类型
export type {
  QueryConfig,
  WhereConfig,
  OrderConfig,
  ProgressInfo,
  QueryOptions,
  WhereCondition
} from './query'

// 从transfer模块重新导出类型
export type {
  ExportOptions,
  ImportOptions,
  TransferResult
} from './transfer'

// 导出数据库连接
export { useDatabase }

// 导出数据库操作
export const {
  getTableNames,
  deleteDatabase,
  deleteAllDatabases,
  deleteAllTables,
  deleteTable
} = databaseOperations

// 导出表操作
export const {
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
  downloadFileFromDB,
  getAllFiles,
  downloadAllFiles,
  getFileByShortId,
  generateFileShortId,
  createFileDownloadToken
} = tableOperations

// 导出查询操作
export const {
  createQuery,
  Query,
  QueryBuilder,
  QueryMapper
} = queryOperations

// 导出数据传输操作
export const {
  createTransfer,
  DataTransfer
} = transferOperations

// 导出类型
export type {
  FileDBRecord,
  GetFileOptions,
  DownloadFileOptions
} from './table/fileStorage'

// 导出数据迁移相关
export {
  migrateData
}

export type {
  MigrationOptions,
  MigrationProgress,
  MigrationResult
}

// 默认导出
export default {
  useDatabase,
  ...databaseOperations,
  ...tableOperations,
  ...queryOperations,
  ...transferOperations,
  migrateData
}
