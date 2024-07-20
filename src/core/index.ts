import useDatabase from './useDatabase'
import getTableNames from './database/getTableNames'
import deleteDatabase from './database/deleteDatabase'
import deleteAllDatabases from './database/deleteAllDatabases'

import createTable from './table/createTable'
import insertOne from './table/insertOne'
import insertMany from './table/insertMany'
import findDBData from './findDBData'
import updateDataByPrimaryKey from './table/updateDataByPrimaryKey'
import findByKey from './table/findByKey'
import findByIndex from './table/findByIndex'
import deleteOneByPk from './table/deleteOneByPk'
import deleteOneByIndex from './table/deleteOneByIndex'
import deleteAllTables from './database/deleteAllTables'
import deleteTable from './database/deleteTable'
import deleteManyByKeys from './table/deleteManyByKeys'
import deleteManyByIndex from './table/deleteManyByIndex'

export {
  // 使用数据库
  useDatabase,
  // 获取指定数据库中的表数量
  getTableNames,
  // 删除指定数据库
  deleteDatabase,
  deleteAllDatabases,
  // 创建表
  createTable,
  insertOne,
  insertMany,
  findDBData,
  updateDataByPrimaryKey,
  findByKey,
  findByIndex,
  deleteOneByPk,
  deleteOneByIndex,
  deleteAllTables,
  deleteTable,
  deleteManyByKeys,
  deleteManyByIndex
}
