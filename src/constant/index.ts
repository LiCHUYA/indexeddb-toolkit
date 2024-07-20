import returnFormater from '../helper/formatReturn'

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
  // 失败
  BASIC_ERROR: (error: Response) => returnFormater(400, 'error', error),
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
  DATA_ERROR: (error: any) => returnFormater(418, 'error', error),
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
    returnFormater(429, '通过索引批量删除表数据删除失败', info)
}

export default ResponseMessages
