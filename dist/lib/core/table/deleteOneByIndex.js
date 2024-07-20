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
 * 根据索引删除单条数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param indexName 索引名称
 * @param indexValue 索引值
 * @returns Promise对象，包含删除结果的状态和消息
 */
function deleteOneByIndex(dbName, tableName, indexName, indexValue) {
    return __awaiter(this, void 0, void 0, function () {
        var tableExist, database, currentDb_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!dbName) {
                        return [2 /*return*/, constant_1.default.DBNAME_IS_NULL()];
                    }
                    if (!tableName) {
                        return [2 /*return*/, constant_1.default.TBNAME_IS_NULL()];
                    }
                    if (!indexName) {
                        return [2 /*return*/, constant_1.default.TB_SELECT_INDEX_NAME_IS_NULL()];
                    }
                    if (!indexValue) {
                        return [2 /*return*/, constant_1.default.TB_SELECT_INDEX_VALUE_IS_NULL()];
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
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var transaction = currentDb_1.transaction([tableName], 'readwrite');
                            var store = transaction.objectStore(tableName);
                            var index = store.index(indexName);
                            var request = index.openCursor(IDBKeyRange.only(indexValue));
                            request.onsuccess = function (event) {
                                var cursor = event.target.result;
                                if (cursor) {
                                    var deleteRequest = cursor.delete();
                                    deleteRequest.onsuccess = function () {
                                        resolve(constant_1.default.TB_DELETE_BY_INDEX_SUCCESS({ id: cursor.primaryKey }));
                                    };
                                    deleteRequest.onerror = function (event) {
                                        reject(constant_1.default.TB_DELETE_BY_INDEX_ERROR(event));
                                    };
                                }
                                else {
                                    resolve(constant_1.default.TB_DELETE_BY_INDEX_SUCCESS(null)); // No record found
                                }
                            };
                            request.onerror = function (event) {
                                reject(constant_1.default.TB_DELETE_BY_INDEX_ERROR(event));
                            };
                        })];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, constant_1.default.BASIC_ERROR(error_1)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.default = deleteOneByIndex;
//# sourceMappingURL=deleteOneByIndex.js.map