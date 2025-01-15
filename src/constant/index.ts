import returnFormater from '../helper/formatReturn'
import { IReturn } from '../types'

const ResponseMessages = {
  // 成功
  OPEN_DB_SUCCESS: (data: {}) => returnFormater(200, `数据库打开成功`, data),
  GET_TABLES_SUCCESS: (data = []) => returnFormater(200, '获取指定数据库中的表数量成功', data),
  GET_ALL_DBS_SUCCESS: res => returnFormater(200, '获取所有数据库成功', res),
  DEL_DB_SUCCESS: info => returnFormater(200, '删除数据库成功', info),
  DEL_ALL_DB_SUCCESS: () => returnFormater(200, '删除所有数据库成功'),
  TB_CREATE_SUCCESS: () => returnFormater(200, '表创建成功'),
  TB_INSERT_SUCCESS: event => returnFormater(200, '数据插入成功', event),
  TB_INSERT_MANY_SUCCESS: info => returnFormater(200, '数据批量插入成功', info),
  TB_SELECT_SUCCESS: (data?: any) => returnFormater(200, '数据查询成功', data),
  TB_DATA_UPDATE_BY_PK_SUCCESS: (data?: any) => returnFormater(200, '通过主键更新数据成功', data),
  TB_SELECT_BY_KEY_SUCCESS: (data: any) => returnFormater(200, '通过主键查询成功', data),
  TB_SELECT_BY_INDEX_SUCCESS: (data: any) => returnFormater(200, '通过索引查询成功', data),
  TB_DELETE_BY_PK_SUCCESS: (data: any) => returnFormater(200, '通过主键删除成功'),
  TB_DELETE_BY_INDEX_SUCCESS: (data: any) => returnFormater(200, '通过索引删除成功'),
  TB_DATA_UPDATE_BY_INDEX_SUCCESS: (data?: any) =>
    returnFormater(200, '通过索引更新数据成功', data),
  TB_DELETE_SUCCESS: info => returnFormater(200, '表删除成功', info),
  TB_DELETE_RECORDS_BY_KEYS_SUCCESS: info =>
    returnFormater(200, '通过主键批量删除表数据删除成功', info),
  TB_DELETE_MANY_BY_INDEXS_SUCCESS: info =>
    returnFormater(200, '通过索引批量删除表数据删除成功', info),
  EXPORT_SUCCESS: (data: any) => returnFormater(200, '导出数据成功', data),
  IMPORT_SUCCESS: (data: any) => returnFormater(200, '导入数据成功', data),
  FILE_SAVE_SUCCESS: (data: any) => ({
    code: 200,
    message: '文件保存成功',
    data
  }),
  FILE_GET_SUCCESS: (data: any) => ({
    code: 200,
    message: '文件获取成功',
    data
  }),
  FILE_DELETE_SUCCESS: (data: any) => returnFormater(200, '文件删除成功', data),
  FILE_UPDATE_SUCCESS: (data: any) => returnFormater(200, '文件更新成功', data),
  // 失败
  BASIC_ERROR: (error: any) => ({
    code: 500,
    message: '操作失败',
    error: error instanceof Error ? error.message : error
  }),
  DBNAME_IS_NULL: () => returnFormater(401, `数据库名称不能为空`),
  TBNAME_IS_NULL: () => returnFormater(402, '表名不能为空'),
  OPEN_DB_ERROR: (error: Response) => returnFormater(403, `数据库打开失败`, error),
  OPEN_TB_ERROR: (error: Response) => returnFormater(405, '表打开失败', error),
  TB_EXIST: info => returnFormater(406, '该表已存在', info),
  TB_CREATE_ERROR: (error: Response) => returnFormater(407, '表创建失败', error),
  DEL_DB_ERROR: (error: Response) => returnFormater(408, '删除数据库失败', error),
  DEL_ALL_DB_ERROR: (error: Response) => returnFormater(409, '删除所有数据库失败', error),
  DB_NOTFOUNT: () => returnFormater(410, '找不到数据库'),
  TB_NOTFOUND: (info?: any) => returnFormater(411, '找不到表', info),
  TB_INSERT_ERROR: (error: Response) => returnFormater(412, '数据插入失败', error),
  TB_INSERT_MANY_ERROR: (error: Response) => returnFormater(413, '数据批量插入失败', error),
  INSERT_DATA_ERROR: (data: Array<any>) => returnFormater(414, '数据格式不正确', data),
  TB_SELECT_ERROR: (error: any) => returnFormater(415, '数据查询失败', error),
  PRIMARY_KEY_IS_NULL: () => returnFormater(416, '主键不能为空'),
  TB_DATA_UPDATE_BY_PK_ERROR: (data?: any) => returnFormater(417, '通过主键更新数据失败', data),
  DATA_ERROR: (message: string) => ({
    code: 404,
    message,
  }),
  TB_SELECT_BY_KEY_ERROR: (data: any) => returnFormater(419, '通过主键查询失败', data),
  TB_SELECT_INDEX_NAME_IS_NULL: () => returnFormater(420, '索引名称不能为空'),
  TB_SELECT_INDEX_VALUE_IS_NULL: () => returnFormater(421, '索引值不能为空'),
  TB_INDEX_ERROR: () => returnFormater(422, '未查询到索引名称'),
  TB_SELECT_BY_INDEX_ERROR: (data: any) => returnFormater(423, '通过索引查询失败', data),
  TB_DELETE_BY_PK_ERROR: (error: any) => returnFormater(424, '通过主键删除失败', error),
  TB_DELETE_BY_INDEX_ERROR: (data: any) => returnFormater(425, '通过索引删除失败'),
  TB_DATA_UPDATE_BY_INDEX_ERROR: (data?: any) => returnFormater(426, '通过索引更新数据失败', data),
  TB_DELETE_ERROR: (data?: any) => returnFormater(427, '表删除失败', data),
  TB_DELETE_RECORDS_BY_KEYS_ERROR: info =>
    returnFormater(428, '通过主键批量删除表数据删除失败', info),
  TB_DELETE_MANY_BY_INDEXS_ERROR: info =>
    returnFormater(429, '通过索引批量删除表数据删除失败', info),
  EXPORT_ERROR: (error: any) => returnFormater(430, '导出数据失败', error),
  IMPORT_ERROR: (error: any) => returnFormater(431, '导入数据失败', error),
  FILE_SAVE_ERROR: (error: any) => ({
    code: 500,
    message: '文件保存失败',
    error: error instanceof Error ? error.message : error
  }),
  FILE_GET_ERROR: (error: any) => ({
    code: 500,
    message: '文件获取失败',
    error: error instanceof Error ? error.message : error
  }),
  FILE_DELETE_ERROR: (error: any) => returnFormater(434, '文件删除失败', error),
  FILE_UPDATE_ERROR: (error: any) => returnFormater(435, '文件更新失败', error),
  FILE_FORMAT_ERROR: (error: any) => returnFormater(436, '文件格式错误', error),
  FILE_SIZE_ERROR: (error: any) => returnFormater(437, '文件大小超出限制', error),
  FILE_TYPE_ERROR: (error: any) => returnFormater(438, '文件类型不支持', error),
  FILE_DOWNLOAD_SUCCESS: (message: string) => ({
    code: 200,
    message,
  }),
  FILE_DOWNLOAD_ERROR: (error: any) => ({
    code: 500,
    message: '文件下载失败',
    error: error instanceof Error ? error.message : error
  }),
  // 添加数据迁移相关的消息
  MIGRATION_SUCCESS: (message = '数据迁移成功', data?: any): IReturn => ({
    code: 200,
    message,
    result: data
  }),
  MIGRATION_ERROR: (message = '数据迁移失败', data?: any): IReturn => ({
    code: 500,
    message,
    result: data
  }),
  // 通用操作消息
  OPERATION_SUCCESS: (message = '操作成功', data?: any): IReturn => ({
    code: 200,
    message,
    result: data
  }),
  OPERATION_ERROR: (message = '操作失败', data?: any): IReturn => ({
    code: 500,
    message,
    result: data
  })
}

export default ResponseMessages
