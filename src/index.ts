// 从 core/index.ts 导入所有核心功能
export {
  useDatabase,
  deleteTable,
  deleteDatabase,
  deleteAllDatabases,
  closeAllConnections,
  getTableNames,
  deleteAllTables,
  // 表操作
  createTable,
  insertOne,
  insertMany,
  findDBData,
  findByKey,
  findByIndex,
  deleteOneByPk,
  deleteOneByIndex,
  deleteManyByPK,
  deleteManyByIndex,
  updateDataByPrimaryKey,
  updateDataByIndex
} from './core'

// 从 core/query 导入查询功能
export {  createQuery } from './core/query/createQuery'

// 从 core/file 导入文件操作
export {
  saveFilesToDB,
  getFileFromDB,
  getAllFiles,
  downloadFileFromDB,
  downloadAllFiles,
  revokeFileUrl
} from './core/file'

// 从 core/file/utils 导入文件工具函数
export {
  generateFileShortId,
  createFileDownloadToken
} from './core/file/utils'

// 从 core/migration 导入数据迁移功能
export { default as migrateData } from './core/migration/migrateData'

// 从 core/json 导入 JSON 导入导出功能
export { default as exportToJson } from './core/json/exportToJson'
export { default as importFromJson } from './core/json/importFromJson' 