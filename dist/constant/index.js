"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var formatReturn_1 = tslib_1.__importDefault(require("../helper/formatReturn"));
// import { IReturn } from '../types'
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
    // 表操作相关
    TB_CREATE_SUCCESS: function (data) { return (0, formatReturn_1.default)(200, '表创建成功', tslib_1.__assign(tslib_1.__assign({}, data), { timestamp: Date.now() })); },
    TB_INSERT_SUCCESS: function (data) {
        var _a;
        return (0, formatReturn_1.default)(200, '数据插入成功', {
            insertedId: (_a = data.target) === null || _a === void 0 ? void 0 : _a.result,
            timestamp: Date.now()
        });
    },
    TB_INSERT_MANY_SUCCESS: function (info) { return (0, formatReturn_1.default)(200, '数据批量插入成功', info); },
    TB_SELECT_SUCCESS: function (data) { return (0, formatReturn_1.default)(200, '数据查询成功', data); },
    TB_DELETE_SUCCESS: function (info) { return (0, formatReturn_1.default)(200, '表删除成功', info); },
    TB_DELETE_ERROR: function (info) { return (0, formatReturn_1.default)(408, '表删除失败', info); },
    TB_DELETE_ALL_SUCCESS: function () { return (0, formatReturn_1.default)(200, '所有表删除成功'); },
    TB_DELETE_ALL_ERROR: function (info) { return (0, formatReturn_1.default)(409, '所有表删除失败', info); },
    // 错误相关
    DBNAME_IS_NULL: function () { return (0, formatReturn_1.default)(401, '数据库名称不能为空'); },
    TBNAME_IS_NULL: function () { return (0, formatReturn_1.default)(402, '表名不能为空'); },
    OPEN_DB_ERROR: function (error) { return (0, formatReturn_1.default)(403, '数据库打开失败', error); },
    OPEN_TB_ERROR: function (error) { return (0, formatReturn_1.default)(405, '表打开失败', error); },
    DB_NOTFOUND: function () { return (0, formatReturn_1.default)(406, '数据库不存在'); },
    DB_DELETE_ERROR: function (error) { return (0, formatReturn_1.default)(407, '数据库删除失败', error); },
    TB_EXIST: function (tableName) { return (0, formatReturn_1.default)(406, "\u8868 ".concat(tableName, " \u5DF2\u5B58\u5728"), { tableName: tableName }); },
    JSON_IMPORT_SUCCESS: function (data) { return (0, formatReturn_1.default)(200, '数据导入成功', data); },
    JSON_IMPORT_ERROR: function (error) { return (0, formatReturn_1.default)(412, '数据导入失败', error); },
    TB_CREATE_ERROR: function (error) { return (0, formatReturn_1.default)(407, '表创建失败', {
        error: error instanceof Error ? error.message : String(error)
    }); },
    TB_NOTFOUND: function (message) { return (0, formatReturn_1.default)(411, message || '表不存在'); },
    TB_INSERT_ERROR: function (error) { return (0, formatReturn_1.default)(412, '数据插入失败', {
        error: error instanceof Error ? error.message : String(error)
    }); },
    JSON_EXPORT_SUCCESS: function (data) { return (0, formatReturn_1.default)(200, '数据导出成功', data); },
    JSON_EXPORT_ERROR: function (error) { return (0, formatReturn_1.default)(412, '数据导出失败', error); },
    // ... 其他消息保持 returnFormater 格式
    TB_INSERT_MANY_ERROR: function (error) { return (0, formatReturn_1.default)(413, '数据批量插入失败', error); },
    INSERT_DATA_ERROR: function (data) { return (0, formatReturn_1.default)(414, '数据格式不正确', data); },
    TB_SELECT_ERROR: function (error) { return (0, formatReturn_1.default)(415, '数据查询失败', error); },
    PRIMARY_KEY_IS_NULL: function () { return (0, formatReturn_1.default)(416, '主键不能为空'); },
    // 基础错误
    BASIC_ERROR: function (error) { return (0, formatReturn_1.default)(500, '操作失败', {
        error: error instanceof Error ? error.message : error
    }); },
    // 其他所有消息都使用 returnFormater
    DATA_ERROR: function (message) { return (0, formatReturn_1.default)(404, message); },
    TB_DELETE_MANY_BY_INDEXS_SUCCESS: function (info) { return (0, formatReturn_1.default)(200, '批量删除索引数据成功', info); },
    TB_DELETE_MANY_BY_INDEXS_ERROR: function (error) { return (0, formatReturn_1.default)(417, '批量删除索引数据失败', error); },
    TB_SELECT_INDEX_NAME_IS_NULL: function () { return (0, formatReturn_1.default)(418, '索引名称不能为空'); },
    TB_SELECT_INDEX_VALUE_IS_NULL: function () { return (0, formatReturn_1.default)(419, '索引值不能为空'); },
    TB_DELETE_BY_INDEX_SUCCESS: function (info) { return (0, formatReturn_1.default)(200, '通过索引删除数据成功', info); },
    TB_DELETE_BY_INDEX_ERROR: function (error) { return (0, formatReturn_1.default)(420, '通过索引删除数据失败', error); },
    TB_DELETE_BY_PK_SUCCESS: function (info) { return (0, formatReturn_1.default)(200, '通过主键删除数据成功', info); },
    TB_DELETE_BY_PK_ERROR: function (error) { return (0, formatReturn_1.default)(421, '通过主键删除数据失败', error); },
    TB_INDEX_ERROR: function () { return (0, formatReturn_1.default)(422, '索引不存在'); },
    TB_SELECT_BY_INDEX_SUCCESS: function (data) { return (0, formatReturn_1.default)(200, '通过索引查询数据成功', data); },
    TB_SELECT_BY_INDEX_ERROR: function (error) { return (0, formatReturn_1.default)(423, '通过索引查询数据失败', error); },
    TB_DELETE_RECORDS_BY_KEYS_SUCCESS: function (info) { return (0, formatReturn_1.default)(200, '批量删除记录成功', info); },
    TB_DELETE_RECORDS_BY_KEYS_ERROR: function (error) { return (0, formatReturn_1.default)(424, '批量删除记录失败', error); },
    // 添加数据迁移相关的消息
    TB_MIGRATE_SUCCESS: function (data) { return ({
        code: 200,
        message: '数据迁移成功',
        result: data
    }); },
    TB_MIGRATE_ERROR: function (error) { return ({
        code: 430,
        message: '数据迁移失败',
        result: error
    }); },
    // 添加文件存储相关的消息
    FILE_SAVE_SUCCESS: function (data) { return ({
        code: 200,
        message: '文件保存成功',
        result: data
    }); },
    FILE_SAVE_ERROR: function (error) { return ({
        code: 436,
        message: '文件保存失败',
        result: error
    }); },
    FILE_GET_SUCCESS: function (data) { return ({
        code: 200,
        message: '获取文件成功',
        result: data
    }); },
    FILE_GET_ERROR: function (error) { return ({
        code: 437,
        message: '获取文件失败',
        result: error
    }); },
    FILE_DELETE_SUCCESS: function (data) { return ({
        code: 200,
        message: '删除文件成功',
        result: data
    }); },
    FILE_DELETE_ERROR: function (error) { return ({
        code: 438,
        message: '删除文件失败',
        result: error
    }); },
    FILE_IS_NULL: function () { return ({
        success: false,
        code: 40001,
        message: 'File is required'
    }); },
    TB_SELECT_BY_KEY_SUCCESS: function (data) { return (0, formatReturn_1.default)(200, '通过主键查询数据成功', data); },
    TB_SELECT_BY_KEY_ERROR: function (error) { return (0, formatReturn_1.default)(425, '通过主键查询数据失败', error); },
    TB_DATA_UPDATE_BY_INDEX_SUCCESS: function (data) { return (0, formatReturn_1.default)(200, '通过索引更新数据成功', data); },
    TB_DATA_UPDATE_BY_INDEX_ERROR: function (error) { return (0, formatReturn_1.default)(426, '通过索引更新数据失败', error); },
    TB_DATA_UPDATE_BY_PRIMARY_KEY_SUCCESS: function (data) { return (0, formatReturn_1.default)(200, '通过主键更新数据成功', data); },
    TB_DATA_UPDATE_BY_PRIMARY_KEY_ERROR: function (error) { return (0, formatReturn_1.default)(427, '通过主键更新数据失败', error); }
};
exports.default = ResponseMessages;
//# sourceMappingURL=index.js.map