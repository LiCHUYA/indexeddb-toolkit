/**
 * @fileoverview 核心功能模块的统一导出
 */

import useDatabase from './useDatabase'
import deleteTable from './database/deleteTable'
import deleteDatabase from './database/deleteDatabase'
import deleteAllDatabases from './database/deleteAllDatabases'
import closeAllConnections from './database/closeAllConnections'

export {
  useDatabase,
  deleteTable,
  deleteDatabase,
  deleteAllDatabases,
  closeAllConnections
}

export * from './table'
