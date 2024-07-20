"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var formatReturn_1 = require("../helper/formatReturn");
var ResponseMessages = {
    // 成功
    OPEN_DB_SUCCESS: function (data) { return (0, formatReturn_1.default)(200, "\u6570\u636E\u5E93\u6253\u5F00\u6210\u529F", data); },
    GET_TABLES_SUCCESS: function (data) {
        if (data === void 0) { data = []; }
        return (0, formatReturn_1.default)(200, '获取指定数据库中的表数量成功', data);
    },
    GET_ALL_DBS_SUCCESS: function (res) { return (0, formatReturn_1.default)(200, '获取所有数据库成功', res); },
    DEL_DB_SUCCESS: function (info) { return (0, formatReturn_1.default)(200, '删除数据库成功', info); },
    DEL_ALL_DB_SUCCESS: function () { return (0, formatReturn_1.default)(200, '删除所有数据库成功'); },
    TB_CREATE_SUCCESS: function () { return (0, formatReturn_1.default)(200, '表创建成功'); },
    TB_INSERT_SUCCESS: function (event) { return (0, formatReturn_1.default)(200, '数据插入成功', event); },
    TB_INSERT_MANY_SUCCESS: function (info) { return (0, formatReturn_1.default)(200, '数据批量插入成功', info); },
    TB_SELECT_SUCCESS: function (data) { return (0, formatReturn_1.default)(200, '数据查询成功', data); },
    TB_DATA_UPDATE_BY_PK_SUCCESS: function (data) { return (0, formatReturn_1.default)(200, '通过主键更新数据成功', data); },
    TB_SELECT_BY_KEY_SUCCESS: function (data) { return (0, formatReturn_1.default)(200, '通过主键查询成功', data); },
    TB_SELECT_BY_INDEX_SUCCESS: function (data) { return (0, formatReturn_1.default)(200, '通过索引查询成功', data); },
    TB_DELETE_BY_PK_SUCCESS: function (data) { return (0, formatReturn_1.default)(200, '通过主键删除成功'); },
    TB_DELETE_BY_INDEX_SUCCESS: function (data) { return (0, formatReturn_1.default)(200, '通过索引删除成功'); },
    TB_DATA_UPDATE_BY_INDEX_SUCCESS: function (data) {
        return (0, formatReturn_1.default)(200, '通过索引更新数据成功', data);
    },
    TB_DELETE_SUCCESS: function (info) { return (0, formatReturn_1.default)(200, '表删除成功', info); },
    TB_DELETE_RECORDS_BY_KEYS_SUCCESS: function (info) {
        return (0, formatReturn_1.default)(200, '通过主键批量删除表数据删除成功', info);
    },
    TB_DELETE_MANY_BY_INDEXS_SUCCESS: function (info) {
        return (0, formatReturn_1.default)(200, '通过索引批量删除表数据删除成功', info);
    },
    // 失败
    BASIC_ERROR: function (error) { return (0, formatReturn_1.default)(400, 'error', error); },
    DBNAME_IS_NULL: function () { return (0, formatReturn_1.default)(401, "\u6570\u636E\u5E93\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"); },
    TBNAME_IS_NULL: function () { return (0, formatReturn_1.default)(402, '表名不能为空'); },
    OPEN_DB_ERROR: function (error) { return (0, formatReturn_1.default)(403, "\u6570\u636E\u5E93\u6253\u5F00\u5931\u8D25", error); },
    OPEN_TB_ERROR: function (error) { return (0, formatReturn_1.default)(405, '表打开失败', error); },
    TB_EXIST: function (info) { return (0, formatReturn_1.default)(406, '该表已存在', info); },
    TB_CREATE_ERROR: function (error) { return (0, formatReturn_1.default)(407, '表创建失败', error); },
    DEL_DB_ERROR: function (error) { return (0, formatReturn_1.default)(408, '删除数据库失败', error); },
    DEL_ALL_DB_ERROR: function (error) { return (0, formatReturn_1.default)(409, '删除所有数据库失败', error); },
    DB_NOTFOUNT: function () { return (0, formatReturn_1.default)(410, '找不到数据库'); },
    TB_NOTFOUND: function (info) { return (0, formatReturn_1.default)(411, '找不到表', info); },
    TB_INSERT_ERROR: function (error) { return (0, formatReturn_1.default)(412, '数据插入失败', error); },
    TB_INSERT_MANY_ERROR: function (error) { return (0, formatReturn_1.default)(413, '数据批量插入失败', error); },
    INSERT_DATA_ERROR: function (data) { return (0, formatReturn_1.default)(414, '数据格式不正确', data); },
    TB_SELECT_ERROR: function (error) { return (0, formatReturn_1.default)(415, '数据查询失败', error); },
    PRIMARY_KEY_IS_NULL: function () { return (0, formatReturn_1.default)(416, '主键不能为空'); },
    TB_DATA_UPDATE_BY_PK_ERROR: function (data) { return (0, formatReturn_1.default)(417, '通过主键更新数据失败', data); },
    DATA_ERROR: function (error) { return (0, formatReturn_1.default)(418, 'error', error); },
    TB_SELECT_BY_KEY_ERROR: function (data) { return (0, formatReturn_1.default)(419, '通过主键查询失败', data); },
    TB_SELECT_INDEX_NAME_IS_NULL: function () { return (0, formatReturn_1.default)(420, '索引名称不能为空'); },
    TB_SELECT_INDEX_VALUE_IS_NULL: function () { return (0, formatReturn_1.default)(421, '索引值不能为空'); },
    TB_INDEX_ERROR: function () { return (0, formatReturn_1.default)(422, '未查询到索引名称'); },
    TB_SELECT_BY_INDEX_ERROR: function (data) { return (0, formatReturn_1.default)(423, '通过索引查询失败', data); },
    TB_DELETE_BY_PK_ERROR: function (error) { return (0, formatReturn_1.default)(424, '通过主键删除失败', error); },
    TB_DELETE_BY_INDEX_ERROR: function (data) { return (0, formatReturn_1.default)(425, '通过索引删除失败'); },
    TB_DATA_UPDATE_BY_INDEX_ERROR: function (data) { return (0, formatReturn_1.default)(426, '通过索引更新数据失败', data); },
    TB_DELETE_ERROR: function (data) { return (0, formatReturn_1.default)(427, '表删除失败', data); },
    TB_DELETE_RECORDS_BY_KEYS_ERROR: function (info) {
        return (0, formatReturn_1.default)(428, '通过主键批量删除表数据删除失败', info);
    },
    TB_DELETE_MANY_BY_INDEXS_ERROR: function (info) {
        return (0, formatReturn_1.default)(429, '通过索引批量删除表数据删除失败', info);
    }
};
exports.default = ResponseMessages;
//# sourceMappingURL=index.js.map