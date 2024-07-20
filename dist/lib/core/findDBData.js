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
// 查询表的数据
var constant_1 = require("../constant");
var index_1 = require("./index");
/**
 * 查询指定数据库中的数据，如果提供了表名，则查询该表的数据；如果未提供表名，则查询所有表的数据。
 * @async
 * @function
 * @param {string} dbName - 数据库名称。
 * @param {string} [tableName] - 可选，表名。如果提供了表名，则查询该表的数据；如果未提供表名，则查询所有表的数据。
 * @returns {Promise<any>} 返回一个包含查询结果的Promise对象。如果查询成功，返回包含查询结果的数组；如果查询失败，返回错误信息。
 * @throws {Error} 如果表数据查询失败，则抛出错误。
 */
function findDBData(dbName, tableName) {
    return __awaiter(this, void 0, void 0, function () {
        var database, currentDb, result, store, request_1, data, database_1, currentDb_1, objectStoreNames, _loop_1, _i, objectStoreNames_1, storeName;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!dbName) {
                        return [2 /*return*/, constant_1.default.DBNAME_IS_NULL()];
                    }
                    return [4 /*yield*/, (0, index_1.useDatabase)(dbName)];
                case 1:
                    database = _e.sent();
                    currentDb = database.result.target.result;
                    result = [];
                    if (!tableName) return [3 /*break*/, 5];
                    if (!(currentDb === null || currentDb === void 0 ? void 0 : currentDb.objectStoreNames.contains(tableName))) {
                        return [2 /*return*/, constant_1.default.TB_SELECT_ERROR("".concat(tableName, "\u4E0D\u5B58\u5728"))]; // 只传数据库名称，重新查询所有表的数据
                    }
                    store = (_a = currentDb === null || currentDb === void 0 ? void 0 : currentDb.transaction([tableName], 'readonly')) === null || _a === void 0 ? void 0 : _a.objectStore(tableName);
                    if (!!store) return [3 /*break*/, 3];
                    console.log("".concat(dbName, " \u6570\u636E\u5E93\u672A\u6253\u5F00"));
                    return [4 /*yield*/, (0, index_1.useDatabase)(dbName)];
                case 2:
                    _e.sent();
                    return [2 /*return*/, findDBData(dbName)]; // 只传数据库名称，重新查询所有表的数据
                case 3:
                    request_1 = store.getAll();
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            request_1.onsuccess = function (event) {
                                var result = event.target.result;
                                resolve(constant_1.default.TB_SELECT_SUCCESS(result));
                            };
                            request_1.onerror = function (event) {
                                reject(constant_1.default.TB_SELECT_ERROR(event.target.error));
                            };
                        })];
                case 4:
                    data = _e.sent();
                    result.push({
                        tableName: tableName,
                        version: ((_b = this.currentDb) === null || _b === void 0 ? void 0 : _b.version) || '',
                        children: data
                    });
                    return [3 /*break*/, 10];
                case 5: return [4 /*yield*/, (0, index_1.useDatabase)(dbName)];
                case 6:
                    database_1 = _e.sent();
                    currentDb_1 = database_1.result.target.result;
                    objectStoreNames = Array.from((_c = currentDb_1 === null || currentDb_1 === void 0 ? void 0 : currentDb_1.objectStoreNames) !== null && _c !== void 0 ? _c : []);
                    if (objectStoreNames.length === 0) {
                        return [2 /*return*/, []];
                    }
                    _loop_1 = function (storeName) {
                        var store, request, data;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0: return [4 /*yield*/, (0, index_1.useDatabase)(dbName)];
                                case 1:
                                    _f.sent();
                                    if (!(currentDb_1 === null || currentDb_1 === void 0 ? void 0 : currentDb_1.objectStoreNames.contains(storeName))) {
                                        console.log("".concat(storeName, " \u8868\u4E0D\u5B58\u5728"));
                                        return [2 /*return*/, "continue"];
                                    }
                                    store = (_d = currentDb_1 === null || currentDb_1 === void 0 ? void 0 : currentDb_1.transaction([storeName], 'readonly')) === null || _d === void 0 ? void 0 : _d.objectStore(storeName);
                                    if (!store) {
                                        throw new Error("".concat(storeName, " \u6570\u636E\u67E5\u8BE2\u5931\u8D25"));
                                    }
                                    request = store.getAll();
                                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                                            request.onsuccess = function (event) {
                                                var result = event.target.result;
                                                resolve(constant_1.default.TB_SELECT_SUCCESS(result));
                                            };
                                            request.onerror = function (event) {
                                                reject(constant_1.default.TB_SELECT_ERROR(event.target.error));
                                            };
                                        })];
                                case 2:
                                    data = _f.sent();
                                    result.push({
                                        tableName: storeName || '',
                                        version: (currentDb_1 === null || currentDb_1 === void 0 ? void 0 : currentDb_1.version) || '',
                                        children: data
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, objectStoreNames_1 = objectStoreNames;
                    _e.label = 7;
                case 7:
                    if (!(_i < objectStoreNames_1.length)) return [3 /*break*/, 10];
                    storeName = objectStoreNames_1[_i];
                    return [5 /*yield**/, _loop_1(storeName)];
                case 8:
                    _e.sent();
                    _e.label = 9;
                case 9:
                    _i++;
                    return [3 /*break*/, 7];
                case 10: return [2 /*return*/, result];
            }
        });
    });
}
exports.default = findDBData;
//# sourceMappingURL=findDBData.js.map