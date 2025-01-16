import returnFormater from '../helper/formatReturn'
import { IReturn } from '../types'

const ResponseMessages = {
  // 成功
  OPEN_DB_SUCCESS: (data: {}) => returnFormater(200, `数据库打开成功`, data),
  GET_TABLES_SUCCESS: (data = []) => returnFormater(200, '获取指定数据库中的表数量成功', data),
  GET_ALL_DBS_SUCCESS: res => returnFormater(200, '获取所有数据库成功', res),
  DEL_DB_SUCCESS: info => returnFormater(200, '删除数据库成功', info),
  DEL_ALL_DB_SUCCESS: () => returnFormater(200, '删除所有数据库成功'),
  
  // 表操作相关
  TB_CREATE_SUCCESS: (data?: any) => returnFormater(200, '表创建成功', {
    ...data,
    timestamp: Date.now()
  }),

  TB_INSERT_SUCCESS: (data: any) => returnFormater(200, '数据插入成功', {
    insertedId: data.target?.result,
    timestamp: Date.now()
  }),

  TB_INSERT_MANY_SUCCESS: info => returnFormater(200, '数据批量插入成功', info),
  TB_SELECT_SUCCESS: (data?: any) => returnFormater(200, '数据查询成功', data),
  
  // 错误相关
  DBNAME_IS_NULL: () => returnFormater(401, '数据库名称不能为空'),
  TBNAME_IS_NULL: () => returnFormater(402, '表名不能为空'),
  OPEN_DB_ERROR: (error: Response) => returnFormater(403, '数据库打开失败', error),
  OPEN_TB_ERROR: (error: Response) => returnFormater(405, '表打开失败', error),
  
  TB_EXIST: (tableName: string) => returnFormater(406, `表 ${tableName} 已存在`, { tableName }),
  
  TB_CREATE_ERROR: (error: any) => returnFormater(407, '表创建失败', {
    error: error instanceof Error ? error.message : String(error)
  }),

  TB_NOTFOUND: () => returnFormater(411, '表不存在'),
  
  TB_INSERT_ERROR: (error: any) => returnFormater(412, '数据插入失败', {
    error: error instanceof Error ? error.message : String(error)
  }),

  // ... 其他消息保持 returnFormater 格式
  TB_INSERT_MANY_ERROR: (error: Response) => returnFormater(413, '数据批量插入失败', error),
  INSERT_DATA_ERROR: (data: Array<any>) => returnFormater(414, '数据格式不正确', data),
  TB_SELECT_ERROR: (error: any) => returnFormater(415, '数据查询失败', error),
  PRIMARY_KEY_IS_NULL: () => returnFormater(416, '主键不能为空'),
  
  // 基础错误
  BASIC_ERROR: (error: any) => returnFormater(500, '操作失败', {
    error: error instanceof Error ? error.message : error
  }),

  // 其他所有消息都使用 returnFormater
  DATA_ERROR: (message: string) => returnFormater(404, message),
  
  // ... 其他消息都类似修改
};

export default ResponseMessages;
