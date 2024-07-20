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
 * 根据索引查询数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param indexName 索引名称
 * @param indexValue 索引值
 * @param isAll 根据索引查询出来的值,查出来全部值还是默认第一条
 * @returns Promise对象，包含查询结果对象
 */
function findByIndex(dbName_1, tableName_1, indexName_1, indexValue_1) {
    return __awaiter(this, arguments, void 0, function (dbName, tableName, indexName, indexValue, isAll) {
        var tableExist, database, currentDb_1, error_1;
        if (isAll === void 0) { isAll = true; }
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
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, helper_1.isTableExist)(dbName, tableName)];
                case 2:
                    tableExist = _a.sent();
                    if (!tableExist) {
                        // console.log(`${tableName} 表不存在`);
                        return [2 /*return*/, constant_1.default.TB_EXIST("".concat(tableName, " \u8868\u4E0D\u5B58\u5728"))];
                    }
                    return [4 /*yield*/, (0, index_1.useDatabase)(dbName)];
                case 3:
                    database = _a.sent();
                    currentDb_1 = database.result.target.result;
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var store = currentDb_1.transaction(tableName, 'readonly').objectStore(tableName);
                            if (!Array.from(store.indexNames).includes(indexName))
                                reject(constant_1.default.TB_INDEX_ERROR());
                            // console.log(!Array.from(store.indexNames).includes(indexName))
                            var index = store.index(indexName);
                            if (isAll) {
                                var request = index.openCursor(IDBKeyRange.only(indexValue));
                                var results_1 = [];
                                request.onsuccess = function (event) {
                                    var cursor = event.target.result;
                                    if (cursor) {
                                        results_1.push(cursor.value);
                                        cursor.continue();
                                    }
                                    else {
                                        resolve(constant_1.default.TB_SELECT_BY_INDEX_SUCCESS(results_1));
                                    }
                                };
                                request.onerror = function (event) {
                                    reject(constant_1.default.TB_SELECT_BY_INDEX_ERROR(event));
                                };
                            }
                            else {
                                var request = index.get(indexValue);
                                request.onsuccess = function (event) {
                                    console.log(event);
                                    var result = event.target.result;
                                    resolve(constant_1.default.TB_SELECT_BY_INDEX_SUCCESS(result));
                                };
                                request.onerror = function (event) {
                                    reject(constant_1.default.TB_SELECT_BY_INDEX_ERROR(event));
                                };
                            }
                        })];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, constant_1.default.BASIC_ERROR(error_1)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.default = findByIndex;
//# sourceMappingURL=findByIndex.js.map