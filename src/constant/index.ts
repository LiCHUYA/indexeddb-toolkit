import returnFormater from '../helper/formatReturn'
// import { IReturn } from '../types'

const ResponseMessages = {
  // 成功
  OPEN_DB_SUCCESS: (data: {}) => returnFormater(200, `数据库打开成功`, data),
  GET_TABLES_SUCCESS: (data = []) => returnFormater(200, '获取指定数据库中的表数量成功', data),
  GET_ALL_DBS_SUCCESS: (res: any) => returnFormater(200, '获取所有数据库成功', res),
  DEL_DB_SUCCESS: (info: any) => returnFormater(200, '删除数据库成功', info),
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

  TB_INSERT_MANY_SUCCESS: (info: any) => returnFormater(200, '数据批量插入成功', info),
  TB_SELECT_SUCCESS: (data?: any) => returnFormater(200, '数据查询成功', data),
  TB_DELETE_SUCCESS: (info: any) => returnFormater(200, '表删除成功', info),
  TB_DELETE_ERROR: (info: any) => returnFormater(408, '表删除失败', info),
  TB_DELETE_ALL_SUCCESS: () => returnFormater(200, '所有表删除成功'),
  TB_DELETE_ALL_ERROR: (info: any) => returnFormater(409, '所有表删除失败', info),
  // 错误相关
  DBNAME_IS_NULL: () => returnFormater(401, '数据库名称不能为空'),
  TBNAME_IS_NULL: () => returnFormater(402, '表名不能为空'),
  OPEN_DB_ERROR: (error: Response) => returnFormater(403, '数据库打开失败', error),
  OPEN_TB_ERROR: (error: Response) => returnFormater(405, '表打开失败', error),
  DB_NOTFOUND: () => returnFormater(406, '数据库不存在'),
  DB_DELETE_ERROR: (error: Response) => returnFormater(407, '数据库删除失败', error),
  TB_EXIST: (tableName: string) => returnFormater(406, `表 ${tableName} 已存在`, { tableName }),
  JSON_IMPORT_SUCCESS: (data: any) => returnFormater(200, '数据导入成功', data),
  JSON_IMPORT_ERROR: (error: any) => returnFormater(412, '数据导入失败', error),
  TB_CREATE_ERROR: (error: any) => returnFormater(407, '表创建失败', {
    error: error instanceof Error ? error.message : String(error)
  }),

  TB_NOTFOUND: (message?: string) => returnFormater(411, message || '表不存在'),
  
  TB_INSERT_ERROR: (error: any) => returnFormater(412, '数据插入失败', {
    error: error instanceof Error ? error.message : String(error)
  }),
  JSON_EXPORT_SUCCESS: (data: any) => returnFormater(200, '数据导出成功', data),
  JSON_EXPORT_ERROR: (error: any) => returnFormater(412, '数据导出失败', error),
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
  
  TB_DELETE_MANY_BY_INDEXS_SUCCESS: (info: any) => returnFormater(200, '批量删除索引数据成功', info),
  TB_DELETE_MANY_BY_INDEXS_ERROR: (error: any) => returnFormater(417, '批量删除索引数据失败', error),
  
  TB_SELECT_INDEX_NAME_IS_NULL: () => returnFormater(418, '索引名称不能为空'),
  TB_SELECT_INDEX_VALUE_IS_NULL: () => returnFormater(419, '索引值不能为空'),
  TB_DELETE_BY_INDEX_SUCCESS: (info: any) => returnFormater(200, '通过索引删除数据成功', info),
  TB_DELETE_BY_INDEX_ERROR: (error: any) => returnFormater(420, '通过索引删除数据失败', error),
  TB_DELETE_BY_PK_SUCCESS: (info: any) => returnFormater(200, '通过主键删除数据成功', info),
  TB_DELETE_BY_PK_ERROR: (error: any) => returnFormater(421, '通过主键删除数据失败', error),
  TB_INDEX_ERROR: () => returnFormater(422, '索引不存在'),
  TB_SELECT_BY_INDEX_SUCCESS: (data: any) => returnFormater(200, '通过索引查询数据成功', data),
  TB_SELECT_BY_INDEX_ERROR: (error: any) => returnFormater(423, '通过索引查询数据失败', error),
  TB_DELETE_RECORDS_BY_KEYS_SUCCESS: (info: any) => returnFormater(200, '批量删除记录成功', info),
  TB_DELETE_RECORDS_BY_KEYS_ERROR: (error: any) => returnFormater(424, '批量删除记录失败', error),

  // 添加数据迁移相关的消息
  TB_MIGRATE_SUCCESS: (data: any) => ({
    code: 200,
    message: '数据迁移成功',
    result: data
  }),

  TB_MIGRATE_ERROR: (error: any) => ({
    code: 430,
    message: '数据迁移失败',
    result: error
  }),

  // 添加文件存储相关的消息
  FILE_SAVE_SUCCESS: (data: any) => ({
    code: 200, 
    message: '文件保存成功',
    result: data
  }),

  FILE_SAVE_ERROR: (error: any) => ({
    code: 436,
    message: '文件保存失败',
    result: error
  }),

  FILE_GET_SUCCESS: (data: any) => ({
    code: 200,
    message: '获取文件成功', 
    result: data
  }),

  FILE_GET_ERROR: (error: any) => ({
    code: 437,
    message: '获取文件失败',
    result: error
  }),

  FILE_DELETE_SUCCESS: (data: any) => ({
    code: 200,
    message: '删除文件成功',
    result: data
  }),

  FILE_DELETE_ERROR: (error: any) => ({
    code: 438,
    message: '删除文件失败', 
    result: error
  }),

  FILE_IS_NULL: () => ({
    success: false,
    code: 40001,
    message: 'File is required'
  }),

  TB_SELECT_BY_KEY_SUCCESS: (data: any) => returnFormater(200, '通过主键查询数据成功', data),
  TB_SELECT_BY_KEY_ERROR: (error: any) => returnFormater(425, '通过主键查询数据失败', error),

  TB_DATA_UPDATE_BY_INDEX_SUCCESS: (data: any) => returnFormater(200, '通过索引更新数据成功', data),
  TB_DATA_UPDATE_BY_INDEX_ERROR: (error: any) => returnFormater(426, '通过索引更新数据失败', error),

  TB_DATA_UPDATE_BY_PRIMARY_KEY_SUCCESS: (data: any) => returnFormater(200, '通过主键更新数据成功', data),
  TB_DATA_UPDATE_BY_PRIMARY_KEY_ERROR: (error: any) => returnFormater(427, '通过主键更新数据失败', error)
};

export default ResponseMessages;
