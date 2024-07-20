"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("../../constant");
var index_1 = require("../../helper/index");
var helper_1 = require("../../helper");
/**
 * 创建表
 * @param {string} dbName - 数据库名称。
 * @param {string} tableName - 表名称。
 * @param {any[]} [indexs=['default']] - 索引数组，用于查询时。
 * @returns {Promise<any>} Promise对象，包含创建结果的状态和状态码。
 * @throws {Error} 如果表创建失败，则抛出错误。
 * @description
 * 当不熟悉indexs这个参数的时候,可以理解为每一张表的字段名,我们直接传递['字段1']
 * @example
 * createTable('test','abc',['message','age']).then()
 * 以上代码就是代表在test数据库下创建abc表,表的索引是message和age。
 */
function createTable(dbName_1, tableName_1) {
    return __awaiter(this, arguments, void 0, function (dbName, tableName, indexs) {
        var tableExist, message, currentVersion, newVersion_1, error_1;
        if (indexs === void 0) { indexs = ['default']; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // 检查数据库名称是否为空
                    if (!dbName) {
                        return [2 /*return*/, constant_1.default.DBNAME_IS_NULL()];
                    }
                    // 检查表名称是否为空
                    if (!tableName) {
                        return [2 /*return*/, constant_1.default.TBNAME_IS_NULL()];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, helper_1.isTableExist)(dbName, tableName)];
                case 2:
                    tableExist = _a.sent();
                    console.log(tableExist);
                    if (tableExist) {
                        message = "".concat(tableName, " \u8868\u5DF2\u5B58\u5728");
                        console.log(constant_1.default.TB_EXIST({ info: message }));
                        return [2 /*return*/, constant_1.default.TB_EXIST({ info: message })];
                    }
                    return [4 /*yield*/, (0, index_1.getIndexedDBVersion)(dbName)];
                case 3:
                    currentVersion = _a.sent();
                    newVersion_1 = Number(currentVersion) + 1;
                    localStorage.setItem('dbVersion', newVersion_1.toString());
                    // 返回 Promise 对象，处理表创建
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var request = window.indexedDB.open(dbName, newVersion_1);
                            request.onerror = function (event) {
                                reject(constant_1.default.OPEN_TB_ERROR(event.target.error));
                            };
                            request.onupgradeneeded = function (event) {
                                try {
                                    var db = event.target.result;
                                    var store_1 = db.createObjectStore(tableName, { keyPath: 'id' });
                                    if (indexs && indexs.length) {
                                        indexs.forEach(function (index) {
                                            store_1.createIndex(index, index, { unique: false });
                                        });
                                    }
                                    store_1.transaction.oncomplete = function () {
                                        console.log(constant_1.default.TB_CREATE_SUCCESS());
                                        resolve(constant_1.default.TB_CREATE_SUCCESS());
                                    };
                                }
                                catch (error) {
                                    reject(constant_1.default.BASIC_ERROR(error));
                                }
                            };
                            request.onsuccess = function () {
                                // --newVersion;
                                resolve(constant_1.default.TB_CREATE_SUCCESS());
                            };
                        })];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, constant_1.default.BASIC_ERROR(error_1.message)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.default = createTable;
//# sourceMappingURL=createTable.js.map