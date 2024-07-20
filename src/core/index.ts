import useDatabase from "./useDatabase";
import getTableNames from "./database/getTableNames";
import deleteDatabase from './database/deleteDatabase'
import deleteAllDatabases from "./database/deleteAllDatabases";


import createTable from "./table/createTable";
import insertOne from "./table/insertOne";
import insertMany from "./table/insertMany";
import findTableData from "./table/findTableData";
import updateDataByPrimaryKey from "./table/updateDataByPrimaryKey";
import findByKey from "./table/findByKey";
import findByIndex from "./table/findByIndex";
import deleteOneByPk from "./table/deleteOneByPk";
import deleteOneByIndex from './table/deleteOneByIndex'

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
  findTableData,
  updateDataByPrimaryKey,
  findByKey,
  findByIndex,
  deleteOneByPk,
  deleteOneByIndex
}
