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
var helper_1 = require("../../helper");
var index_1 = require("../index");
/**
 * 根据索引批量删除数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param indexName 索引名称
 * @param indexValues 索引值数组
 * @returns Promise对象，包含删除结果的状态和消息
 */
function deleteManyByIndex(dbName, tableName, indexName, indexValues) {
    return __awaiter(this, void 0, void 0, function () {
        var tableExist, database, currentDb_1, error_1;
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
                    return [4 /*yield*/, (0, helper_1.isTableExist)(dbName, tableName)];
                case 1:
                    tableExist = _a.sent();
                    if (!tableExist) {
                        return [2 /*return*/, constant_1.default.TB_EXIST("".concat(tableName, " \u8868\u4E0D\u5B58\u5728"))];
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, (0, index_1.useDatabase)(dbName)];
                case 3:
                    database = _a.sent();
                    currentDb_1 = database.result.target.result;
                    // 返回一个新的Promise对象
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var store = currentDb_1.transaction([tableName], 'readwrite').objectStore(tableName);
                            var index = store.index(indexName);
                            // 遍历索引值数组，生成删除请求
                            var deletePromises = indexValues.map(function (value) {
                                return new Promise(function (resolve, reject) {
                                    var request = index.openCursor(IDBKeyRange.only(value));
                                    request.onsuccess = function (event) {
                                        var cursor = event.target.result;
                                        if (cursor) {
                                            // 删除当前游标指向的数据
                                            var deleteRequest = cursor.delete();
                                            deleteRequest.onsuccess = function () {
                                                cursor.continue();
                                                resolve(true); // 删除成功，传递 true
                                            };
                                            deleteRequest.onerror = function (event) {
                                                return reject({
                                                    code: 400,
                                                    message: event.target.error
                                                });
                                            };
                                        }
                                        else {
                                            resolve(true); // 没有更多数据删除时也传递 true
                                        }
                                    };
                                    request.onerror = function (event) {
                                        return reject({
                                            code: 400,
                                            message: event.target.error
                                        });
                                    };
                                });
                            });
                            // 等待所有删除请求完成
                            Promise.all(deletePromises)
                                .then(function () {
                                return resolve(constant_1.default.TB_DELETE_MANY_BY_INDEXS_SUCCESS("".concat(indexValues.length, " \u6761\u6570\u636E\u5220\u9664\u6210\u529F")));
                            })
                                .catch(function (error) { return reject(constant_1.default.TB_DELETE_MANY_BY_INDEXS_ERROR(error)); });
                        })];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, constant_1.default.BASIC_ERROR(error_1)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.default = deleteManyByIndex;
//# sourceMappingURL=deleteManyByIndex.js.map