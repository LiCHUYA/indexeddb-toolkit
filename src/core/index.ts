import useDatabase from "./useDatabase";
import getTableNames from "./database/getTableNames";
import deleteDatabase from './database/deleteDatabase'
import deleteAllDatabases from "./database/deleteAllDatabases";


import createTable from "./table/createTable";


export {
  // 使用数据库
  useDatabase,
  // 获取指定数据库中的表数量
  getTableNames,
  // 删除指定数据库
  deleteDatabase,
  deleteAllDatabases,
  // 创建表
  createTable
}
