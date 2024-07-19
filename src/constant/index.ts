import returnFormater from '../helper/formatReturn'

const ResponseMessages = {
  // 成功
  OPEN_DB_SUCCESS: (data:{}) => returnFormater(200, `数据库打开成功`,data),
  GET_TABLES_SUCCESS:(data=[])=>returnFormater(200, '获取指定数据库中的表数量成功',data),
  TB_CREATE_SUCCESS:()=>returnFormater(200,'表创建成功'),
  // 失败
  BASIC_ERROR: (error: Response) => returnFormater(400, 'error', error),
  DBNAME_IS_NULL: () => returnFormater(401, `数据库名称不能为空`),
  TBNAME_IS_NULL: () =>returnFormater(402,'表名不能为空'),
  OPEN_DB_ERROR: (error: Response) => returnFormater(403, `数据库打开失败`, error),
  OPEN_TB_ERROR: (error: Response) => returnFormater(405, '表打开失败', error),
  TB_EXIST:(info)=>returnFormater(406,'该表已存在',info),
  TB_CREATE_ERROR:(error)=>returnFormater(407,'表创建失败',error)
}

export default ResponseMessages
