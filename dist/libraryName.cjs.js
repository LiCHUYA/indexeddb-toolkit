'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
}

function returnFormatter(code, message, result) {
    if (result === void 0) { result = {}; }
    return { code: code, message: message, result: result };
}
// import { ConsoleType } from '../constant/code';
//
// // interface IntFormatter {
// //   type: number;
// //   code: number;
// //   message: string;
// //   result: any;
// // }
//
// function returnFormatter(
//   code: number,
//   message: string,
//   result: any = {},
//   type: string = 'Log'
// ) {
//   if (ConsoleType[type] && typeof console[ConsoleType[type]] === 'function') {
//     console[ConsoleType[type]]({ code, message, result });
//     return { code, message, result }
//   } else {
//     console.log({ code, message, result });
//   }
// }
//
// export default returnFormatter;

var ResponseMessages = {
    // 成功
    OPEN_DB_SUCCESS: function (data) { return returnFormatter(200, "\u6570\u636E\u5E93\u6253\u5F00\u6210\u529F", data); },
    GET_TABLES_SUCCESS: function (data) {
        if (data === void 0) { data = []; }
        return returnFormatter(200, '获取指定数据库中的表数量成功', data);
    },
    GET_ALL_DBS_SUCCESS: function (res) { return returnFormatter(200, '获取所有数据库成功', res); },
    DEL_DB_SUCCESS: function (info) { return returnFormatter(200, '删除数据库成功', info); },
    DEL_ALL_DB_SUCCESS: function () { return returnFormatter(200, '删除所有数据库成功'); },
    TB_CREATE_SUCCESS: function () { return returnFormatter(200, '表创建成功'); },
    TB_INSERT_SUCCESS: function (event) { return returnFormatter(200, '数据插入成功', event); },
    TB_INSERT_MANY_SUCCESS: function (info) { return returnFormatter(200, '数据批量插入成功', info); },
    TB_SELECT_SUCCESS: function (data) { return returnFormatter(200, '数据查询成功', data); },
    TB_DATA_UPDATE_BY_PK_SUCCESS: function (data) { return returnFormatter(200, '通过主键更新数据成功', data); },
    TB_SELECT_BY_KEY_SUCCESS: function (data) { return returnFormatter(200, '通过主键查询成功', data); },
    TB_SELECT_BY_INDEX_SUCCESS: function (data) { return returnFormatter(200, '通过索引查询成功', data); },
    TB_DELETE_BY_PK_SUCCESS: function (data) { return returnFormatter(200, '通过主键删除成功'); },
    TB_DELETE_BY_INDEX_SUCCESS: function (data) { return returnFormatter(200, '通过索引删除成功'); },
    TB_DATA_UPDATE_BY_INDEX_SUCCESS: function (data) {
        return returnFormatter(200, '通过索引更新数据成功', data);
    },
    TB_DELETE_SUCCESS: function (info) { return returnFormatter(200, '表删除成功', info); },
    TB_DELETE_RECORDS_BY_KEYS_SUCCESS: function (info) {
        return returnFormatter(200, '通过主键批量删除表数据删除成功', info);
    },
    TB_DELETE_MANY_BY_INDEXS_SUCCESS: function (info) {
        return returnFormatter(200, '通过索引批量删除表数据删除成功', info);
    },
    // 失败
    BASIC_ERROR: function (error) { return returnFormatter(400, 'error', error); },
    DBNAME_IS_NULL: function () { return returnFormatter(401, "\u6570\u636E\u5E93\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"); },
    TBNAME_IS_NULL: function () { return returnFormatter(402, '表名不能为空'); },
    OPEN_DB_ERROR: function (error) { return returnFormatter(403, "\u6570\u636E\u5E93\u6253\u5F00\u5931\u8D25", error); },
    OPEN_TB_ERROR: function (error) { return returnFormatter(405, '表打开失败', error); },
    TB_EXIST: function (info) { return returnFormatter(406, '该表已存在', info); },
    TB_CREATE_ERROR: function (error) { return returnFormatter(407, '表创建失败', error); },
    DEL_DB_ERROR: function (error) { return returnFormatter(408, '删除数据库失败', error); },
    DEL_ALL_DB_ERROR: function (error) { return returnFormatter(409, '删除所有数据库失败', error); },
    DB_NOTFOUNT: function () { return returnFormatter(410, '找不到数据库'); },
    TB_NOTFOUND: function (info) { return returnFormatter(411, '找不到表', info); },
    TB_INSERT_ERROR: function (error) { return returnFormatter(412, '数据插入失败', error); },
    TB_INSERT_MANY_ERROR: function (error) { return returnFormatter(413, '数据批量插入失败', error); },
    INSERT_DATA_ERROR: function (data) { return returnFormatter(414, '数据格式不正确', data); },
    TB_SELECT_ERROR: function (error) { return returnFormatter(415, '数据查询失败', error); },
    PRIMARY_KEY_IS_NULL: function () { return returnFormatter(416, '主键不能为空'); },
    TB_DATA_UPDATE_BY_PK_ERROR: function (data) { return returnFormatter(417, '通过主键更新数据失败', data); },
    DATA_ERROR: function (error) { return returnFormatter(418, 'error', error); },
    TB_SELECT_BY_KEY_ERROR: function (data) { return returnFormatter(419, '通过主键查询失败', data); },
    TB_SELECT_INDEX_NAME_IS_NULL: function () { return returnFormatter(420, '索引名称不能为空'); },
    TB_SELECT_INDEX_VALUE_IS_NULL: function () { return returnFormatter(421, '索引值不能为空'); },
    TB_INDEX_ERROR: function () { return returnFormatter(422, '未查询到索引名称'); },
    TB_SELECT_BY_INDEX_ERROR: function (data) { return returnFormatter(423, '通过索引查询失败', data); },
    TB_DELETE_BY_PK_ERROR: function (error) { return returnFormatter(424, '通过主键删除失败', error); },
    TB_DELETE_BY_INDEX_ERROR: function (data) { return returnFormatter(425, '通过索引删除失败'); },
    TB_DATA_UPDATE_BY_INDEX_ERROR: function (data) { return returnFormatter(426, '通过索引更新数据失败', data); },
    TB_DELETE_ERROR: function (data) { return returnFormatter(427, '表删除失败', data); },
    TB_DELETE_RECORDS_BY_KEYS_ERROR: function (info) {
        return returnFormatter(428, '通过主键批量删除表数据删除失败', info);
    },
    TB_DELETE_MANY_BY_INDEXS_ERROR: function (info) {
        return returnFormatter(429, '通过索引批量删除表数据删除失败', info);
    }
};

/**
 * 获取指定数据库的版本号
 * @param databaseName 数据库名称
 * @returns Promise对象，包含数据库的版本号
 */
function getIndexedDBVersion(databaseName) {
    return new Promise(function (resolve, reject) {
        if (!databaseName) {
            return ResponseMessages.DBNAME_IS_NULL();
        }
        var request = window.indexedDB.open(databaseName);
        request.onsuccess = function (event) {
            var db = event.target.result;
            var version = db.version;
            db.close();
            resolve(version);
        };
        request.onerror = function (event) {
            reject(ResponseMessages.BASIC_ERROR(event.target.error));
        };
    });
}

/**
 * 获取所有数据库实例
 * @returns {Promise<{status: number, message: string, data: any[]}>} Promise对象，包含所有数据库实例的数组
 */
function getAllDB() {
    return __awaiter(this, void 0, void 0, function () {
        var res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, indexedDB.databases()];
                case 1:
                    res = _a.sent();
                    if (Array.isArray(res)) {
                        return [2 /*return*/, ResponseMessages.GET_ALL_DBS_SUCCESS(res)];
                    }
                    else {
                        return [2 /*return*/, ResponseMessages.DB_NOTFOUNT()];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, ResponseMessages.BASIC_ERROR(error_1)];
                case 3: return [2 /*return*/];
            }
        });
    });
}

/**
 * 判断表是否存在
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @returns 表是否存在的布尔值
 */
function isTableExist(dbName, tableName) {
    return __awaiter(this, void 0, void 0, function () {
        var database, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, useDatabase(dbName)
                        // console.log(database)
                    ];
                case 1:
                    database = _a.sent();
                    // console.log(database)
                    return [2 /*return*/, database.result.target.result.objectStoreNames.contains(tableName)];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}

/**
 * 使用指定的数据库
 *
 * @param {string} dbName - 数据库名称
 * @returns {Promise<any>} Promise对象，包含当前数据库实例或错误信息
 *
 * @example
 * useDatabase('myDatabase')
 *   .then(response => {
 *     console.log('Database opened successfully', response);
 *   })
 *   .catch(error => {
 *     console.error('Error opening database', error);
 *   });
 */
function useDatabase(dbName) {
    var _this = this;
    if (!dbName) {
        return ResponseMessages.DBNAME_IS_NULL();
    }
    var request = window.indexedDB.open(dbName);
    return new Promise(function (resolve, reject) {
        request.onsuccess = function (event) {
            resolve(ResponseMessages.OPEN_DB_SUCCESS(event));
        };
        request.onerror = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var message, version, request_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        message = event.target.error.name;
                        if (!(message === 'VersionError')) return [3 /*break*/, 2];
                        return [4 /*yield*/, getIndexedDBVersion(dbName)];
                    case 1:
                        version = _a.sent();
                        request_1 = window.indexedDB.open(dbName, version);
                        request_1.onsuccess = function (event) {
                            resolve(ResponseMessages.OPEN_DB_SUCCESS(event));
                        };
                        return [3 /*break*/, 3];
                    case 2:
                        resolve(ResponseMessages.OPEN_DB_ERROR(event.target.error));
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        reject(ResponseMessages.BASIC_ERROR(event.target.error));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        request.onupgradeneeded = function (event) {
            try {
                resolve(ResponseMessages.OPEN_DB_SUCCESS(event));
            }
            catch (error) {
                reject(ResponseMessages.BASIC_ERROR(event.target.error));
            }
        };
    });
}

/**
 * 获取指定数据库中的表数量
 * @param dbName 数据库名称
 * @returns Promise对象，包含表名称数组
 */
function getTableNames(dbName) {
    return __awaiter(this, void 0, void 0, function () {
        var database, objectStoreNames, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // 检查数据库名称是否为空
                    if (!dbName) {
                        return [2 /*return*/, ResponseMessages.DBNAME_IS_NULL()];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, useDatabase(dbName)
                        // 将对象存储名称列表转换为数组
                    ];
                case 2:
                    database = _a.sent();
                    objectStoreNames = Array.from(database.result.objectStoreNames);
                    // 根据对象存储名称列表的长度返回相应的消息
                    if (objectStoreNames.length === 0) {
                        return [2 /*return*/, ResponseMessages.GET_TABLES_SUCCESS()];
                    }
                    else {
                        return [2 /*return*/, ResponseMessages.GET_TABLES_SUCCESS(objectStoreNames)];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    // 处理潜在的错误（例如，数据库连接问题）
                    return [2 /*return*/, ResponseMessages.BASIC_ERROR(error_1.message)];
                case 4: return [2 /*return*/];
            }
        });
    });
}

/**
 * 删除指定数据库
 * @param dbName 数据库名称
 * @returns Promise对象，包含删除结果的状态和消息
 */
function deleteDatabase(dbName) {
    return new Promise(function (resolve, reject) {
        var request = window.indexedDB.deleteDatabase(dbName);
        request.onsuccess = function (event) {
            resolve(ResponseMessages.DEL_DB_SUCCESS(event));
        };
        request.onerror = function (event) {
            reject(ResponseMessages.DEL_DB_ERROR(event.target.error));
        };
    });
}

/**
 * 删除所有数据库
 * @returns Promise对象，包含删除结果的状态和消息
 * @example
 * 该方法请慎重使用。
 */
function deleteAllDatabases() {
    return __awaiter(this, void 0, void 0, function () {
        var allDatabasesResponse, deletePromises, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, getAllDB()];
                case 1:
                    allDatabasesResponse = _a.sent();
                    if (!(allDatabasesResponse.result.length > 0)) return [3 /*break*/, 3];
                    deletePromises = allDatabasesResponse.result.map(function (db) { return deleteDatabase(db.name); });
                    return [4 /*yield*/, Promise.all(deletePromises)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, ResponseMessages.DEL_ALL_DB_SUCCESS()];
                case 3: return [2 /*return*/, ResponseMessages.DB_NOTFOUNT()];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    return [2 /*return*/, ResponseMessages.BASIC_ERROR(error_1)];
                case 6: return [2 /*return*/];
            }
        });
    });
}

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
                        return [2 /*return*/, ResponseMessages.DBNAME_IS_NULL()];
                    }
                    // 检查表名称是否为空
                    if (!tableName) {
                        return [2 /*return*/, ResponseMessages.TBNAME_IS_NULL()];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, isTableExist(dbName, tableName)];
                case 2:
                    tableExist = _a.sent();
                    console.log(tableExist);
                    if (tableExist) {
                        message = "".concat(tableName, " \u8868\u5DF2\u5B58\u5728");
                        console.log(ResponseMessages.TB_EXIST({ info: message }));
                        return [2 /*return*/, ResponseMessages.TB_EXIST({ info: message })];
                    }
                    return [4 /*yield*/, getIndexedDBVersion(dbName)];
                case 3:
                    currentVersion = _a.sent();
                    newVersion_1 = Number(currentVersion) + 1;
                    localStorage.setItem('dbVersion', newVersion_1.toString());
                    // 返回 Promise 对象，处理表创建
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var request = window.indexedDB.open(dbName, newVersion_1);
                            request.onerror = function (event) {
                                reject(ResponseMessages.OPEN_TB_ERROR(event.target.error));
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
                                        console.log(ResponseMessages.TB_CREATE_SUCCESS());
                                        resolve(ResponseMessages.TB_CREATE_SUCCESS());
                                    };
                                }
                                catch (error) {
                                    reject(ResponseMessages.BASIC_ERROR(error));
                                }
                            };
                            request.onsuccess = function () {
                                // --newVersion;
                                resolve(ResponseMessages.TB_CREATE_SUCCESS());
                            };
                        })];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, ResponseMessages.BASIC_ERROR(error_1.message)];
                case 5: return [2 /*return*/];
            }
        });
    });
}

// 插入一条数据到指定表
function insertOne$$1(dbName, tableName, data) {
    return __awaiter(this, void 0, void 0, function () {
        var tableExist, currentDb;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // 检查数据库名称是否为空
                    if (!dbName) {
                        return [2 /*return*/, ResponseMessages.DBNAME_IS_NULL()];
                    }
                    return [4 /*yield*/, isTableExist(dbName, tableName)];
                case 1:
                    tableExist = _a.sent();
                    if (!tableExist) {
                        return [2 /*return*/, ResponseMessages.TB_NOTFOUND()];
                    }
                    return [4 /*yield*/, useDatabase(dbName)];
                case 2:
                    currentDb = _a.sent();
                    console.log(currentDb);
                    // 返回一个新的Promise
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            // 开启一个读写事务
                            var transaction = currentDb.result.target.result.transaction([tableName], 'readwrite');
                            var store = transaction.objectStore(tableName);
                            // 添加数据，自动生成id
                            var request = store.add(__assign({ id: Date.now() }, data));
                            // 成功时的处理
                            request.onsuccess = function (event) {
                                resolve(ResponseMessages.TB_INSERT_SUCCESS(event));
                            };
                            // 失败时的处理
                            request.onerror = function (event) {
                                reject(ResponseMessages.TB_INSERT_ERROR(event));
                            };
                        })];
            }
        });
    });
}

function insertMany$$1(dbName, tableName, data) {
    return __awaiter(this, void 0, void 0, function () {
        var tableExist, currentDb;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!dbName) {
                        return [2 /*return*/, ResponseMessages.DBNAME_IS_NULL()];
                    }
                    return [4 /*yield*/, isTableExist(dbName, tableName)];
                case 1:
                    tableExist = _a.sent();
                    if (!tableExist) {
                        return [2 /*return*/, ResponseMessages.TB_EXIST("".concat(tableName, " \u8868\u4E0D\u5B58\u5728"))];
                    }
                    if (!Array.isArray(data)) {
                        return [2 /*return*/, ResponseMessages.INSERT_DATA_ERROR(data)];
                    }
                    return [4 /*yield*/, useDatabase(dbName)];
                case 2:
                    currentDb = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var writeTransaction, writeStore, _i, data_1, item, request;
                            return __generator(this, function (_a) {
                                try {
                                    writeTransaction = currentDb.result.target.result.transaction([tableName], 'readwrite');
                                    writeStore = writeTransaction.objectStore(tableName);
                                    for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                                        item = data_1[_i];
                                        request = writeStore.put(__assign({ id: item.id, timeStamp: Date.now() }, item));
                                        request.onsuccess = function (event) {
                                            resolve(ResponseMessages.TB_INSERT_MANY_SUCCESS(event));
                                        };
                                        request.onerror = function (event) {
                                            reject(ResponseMessages.TB_INSERT_ERROR(event));
                                        };
                                    }
                                }
                                catch (error) {
                                    reject(ResponseMessages.BASIC_ERROR(error));
                                }
                                return [2 /*return*/];
                            });
                        }); })];
            }
        });
    });
}

/**
 * 查询指定数据库中的数据，如果提供了表名，则查询该表的数据；如果未提供表名，则查询所有表的数据。
 * @async
 * @function
 * @param {string} dbName - 数据库名称。
 * @param {string} [tableName] - 可选，表名。如果提供了表名，则查询该表的数据；如果未提供表名，则查询所有表的数据。
 * @returns {Promise<any>} 返回一个包含查询结果的Promise对象。如果查询成功，返回包含查询结果的数组；如果查询失败，返回错误信息。
 * @throws {Error} 如果表数据查询失败，则抛出错误。
 */
function findDBData$$1(dbName, tableName) {
    return __awaiter(this, void 0, void 0, function () {
        var database, currentDb, result, store, request_1, data, database_1, currentDb_1, objectStoreNames, _loop_1, _i, objectStoreNames_1, storeName;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!dbName) {
                        return [2 /*return*/, ResponseMessages.DBNAME_IS_NULL()];
                    }
                    return [4 /*yield*/, useDatabase(dbName)];
                case 1:
                    database = _e.sent();
                    currentDb = database.result.target.result;
                    result = [];
                    if (!tableName) return [3 /*break*/, 5];
                    if (!(currentDb === null || currentDb === void 0 ? void 0 : currentDb.objectStoreNames.contains(tableName))) {
                        return [2 /*return*/, ResponseMessages.TB_SELECT_ERROR("".concat(tableName, "\u4E0D\u5B58\u5728"))]; // 只传数据库名称，重新查询所有表的数据
                    }
                    store = (_a = currentDb === null || currentDb === void 0 ? void 0 : currentDb.transaction([tableName], 'readonly')) === null || _a === void 0 ? void 0 : _a.objectStore(tableName);
                    if (!!store) return [3 /*break*/, 3];
                    console.log("".concat(dbName, " \u6570\u636E\u5E93\u672A\u6253\u5F00"));
                    return [4 /*yield*/, useDatabase(dbName)];
                case 2:
                    _e.sent();
                    return [2 /*return*/, findDBData$$1(dbName)]; // 只传数据库名称，重新查询所有表的数据
                case 3:
                    request_1 = store.getAll();
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            request_1.onsuccess = function (event) {
                                var result = event.target.result;
                                resolve(ResponseMessages.TB_SELECT_SUCCESS(result));
                            };
                            request_1.onerror = function (event) {
                                reject(ResponseMessages.TB_SELECT_ERROR(event.target.error));
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
                case 5: return [4 /*yield*/, useDatabase(dbName)];
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
                                case 0: return [4 /*yield*/, useDatabase(dbName)];
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
                                                resolve(ResponseMessages.TB_SELECT_SUCCESS(result));
                                            };
                                            request.onerror = function (event) {
                                                reject(ResponseMessages.TB_SELECT_ERROR(event.target.error));
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

function updateDataByPrimaryKey$$1(dbName, tbName, id, data) {
    return __awaiter(this, void 0, void 0, function () {
        var tableExist, database, currentDb;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!dbName) {
                        return [2 /*return*/, ResponseMessages.DBNAME_IS_NULL()];
                    }
                    if (!id) {
                        return [2 /*return*/, ResponseMessages.PRIMARY_KEY_IS_NULL()];
                    }
                    return [4 /*yield*/, isTableExist(dbName, tbName)];
                case 1:
                    tableExist = _a.sent();
                    if (!tableExist) {
                        // console.log(`${tbName} 表不存在`);
                        return [2 /*return*/, ResponseMessages.TB_NOTFOUND("".concat(tbName, " \u8868\u4E0D\u5B58\u5728"))];
                    }
                    return [4 /*yield*/, useDatabase(dbName)];
                case 2:
                    database = _a.sent();
                    currentDb = database.result.target.result;
                    return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var store_1, request;
                            return __generator(this, function (_a) {
                                try {
                                    store_1 = currentDb.transaction([tbName], 'readwrite').objectStore(tbName);
                                    request = store_1.get(id);
                                    request.onsuccess = function (event) {
                                        var item = event.target.result;
                                        if (item) {
                                            var updatedItem = __assign(__assign({}, item), data);
                                            var updateRequest = store_1.put(updatedItem);
                                            updateRequest.onsuccess = function (event) {
                                                resolve(ResponseMessages.TB_DATA_UPDATE_BY_PK_SUCCESS(event));
                                            };
                                            updateRequest.onerror = function (event) {
                                                reject(ResponseMessages.TB_DATA_UPDATE_BY_PK_ERROR(event));
                                            };
                                        }
                                        else {
                                            reject(ResponseMessages.DATA_ERROR('找不到数据'));
                                        }
                                    };
                                    request.onerror = function (event) {
                                        reject(ResponseMessages.TB_DATA_UPDATE_BY_PK_ERROR(event));
                                    };
                                }
                                catch (error) {
                                    reject(ResponseMessages.BASIC_ERROR(error));
                                }
                                return [2 /*return*/];
                            });
                        }); })];
            }
        });
    });
}

// import {ExportConverter} from "typedoc/dist/lib/converter/nodes";
/**
 * 根据主键查询数据或查询所有数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param key 主键值
 * @param isAll 是否查询所有数据，默认为 true
 * @returns Promise对象，包含查询结果对象
 */
function findByKey$$1(dbName_1, tableName_1, key_1) {
    return __awaiter(this, arguments, void 0, function (dbName, tableName, key, isAll) {
        var tableExist, database, currentDb_1, error_1;
        if (isAll === void 0) { isAll = true; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!dbName) {
                        return [2 /*return*/, ResponseMessages.DBNAME_IS_NULL()];
                    }
                    if (!tableName) {
                        return [2 /*return*/, ResponseMessages.TBNAME_IS_NULL()];
                    }
                    if (!key && !isAll) {
                        return [2 /*return*/, ResponseMessages.PRIMARY_KEY_IS_NULL()];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, isTableExist(dbName, tableName)];
                case 2:
                    tableExist = _a.sent();
                    if (!tableExist) {
                        return [2 /*return*/, ResponseMessages.TB_NOTFOUND("".concat(tableName, " \u8868\u4E0D\u5B58\u5728"))];
                    }
                    return [4 /*yield*/, useDatabase(dbName)];
                case 3:
                    database = _a.sent();
                    currentDb_1 = database.result.target.result;
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var store = currentDb_1.transaction(tableName, 'readonly').objectStore(tableName);
                            if (isAll) {
                                var request = store.getAll();
                                request.onsuccess = function (event) {
                                    var result = event.target.result;
                                    resolve(ResponseMessages.TB_SELECT_BY_KEY_SUCCESS(result));
                                };
                                request.onerror = function (event) {
                                    reject(ResponseMessages.TB_SELECT_BY_KEY_ERROR(event));
                                };
                            }
                            else {
                                var request = store.get(key);
                                request.onsuccess = function (event) {
                                    var result = event.target.result;
                                    resolve(ResponseMessages.TB_SELECT_BY_KEY_SUCCESS(result));
                                };
                                request.onerror = function (event) {
                                    reject(ResponseMessages.TB_SELECT_BY_KEY_ERROR(event));
                                };
                            }
                        })];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, ResponseMessages.BASIC_ERROR(error_1)];
                case 5: return [2 /*return*/];
            }
        });
    });
}

/**
 * 根据索引查询数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param indexName 索引名称
 * @param indexValue 索引值
 * @param isAll 根据索引查询出来的值,查出来全部值还是默认第一条
 * @returns Promise对象，包含查询结果对象
 */
function findByIndex$$1(dbName_1, tableName_1, indexName_1, indexValue_1) {
    return __awaiter(this, arguments, void 0, function (dbName, tableName, indexName, indexValue, isAll) {
        var tableExist, database, currentDb_1, error_1;
        if (isAll === void 0) { isAll = true; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!dbName) {
                        return [2 /*return*/, ResponseMessages.DBNAME_IS_NULL()];
                    }
                    if (!tableName) {
                        return [2 /*return*/, ResponseMessages.TBNAME_IS_NULL()];
                    }
                    if (!indexName) {
                        return [2 /*return*/, ResponseMessages.TB_SELECT_INDEX_NAME_IS_NULL()];
                    }
                    if (!indexValue) {
                        return [2 /*return*/, ResponseMessages.TB_SELECT_INDEX_VALUE_IS_NULL()];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, isTableExist(dbName, tableName)];
                case 2:
                    tableExist = _a.sent();
                    if (!tableExist) {
                        // console.log(`${tableName} 表不存在`);
                        return [2 /*return*/, ResponseMessages.TB_EXIST("".concat(tableName, " \u8868\u4E0D\u5B58\u5728"))];
                    }
                    return [4 /*yield*/, useDatabase(dbName)];
                case 3:
                    database = _a.sent();
                    currentDb_1 = database.result.target.result;
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var store = currentDb_1.transaction(tableName, 'readonly').objectStore(tableName);
                            if (!Array.from(store.indexNames).includes(indexName))
                                reject(ResponseMessages.TB_INDEX_ERROR());
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
                                        resolve(ResponseMessages.TB_SELECT_BY_INDEX_SUCCESS(results_1));
                                    }
                                };
                                request.onerror = function (event) {
                                    reject(ResponseMessages.TB_SELECT_BY_INDEX_ERROR(event));
                                };
                            }
                            else {
                                var request = index.get(indexValue);
                                request.onsuccess = function (event) {
                                    console.log(event);
                                    var result = event.target.result;
                                    resolve(ResponseMessages.TB_SELECT_BY_INDEX_SUCCESS(result));
                                };
                                request.onerror = function (event) {
                                    reject(ResponseMessages.TB_SELECT_BY_INDEX_ERROR(event));
                                };
                            }
                        })];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, ResponseMessages.BASIC_ERROR(error_1)];
                case 5: return [2 /*return*/];
            }
        });
    });
}

/**
 * 根据主键删除单条数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param id 主键值
 * @returns Promise对象，包含删除结果的状态和消息
 */
function deleteOneByPk$$1(dbName, tableName, id) {
    return __awaiter(this, void 0, void 0, function () {
        var tableExist, database, currentDb;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!dbName) {
                        return [2 /*return*/, ResponseMessages.DBNAME_IS_NULL()];
                    }
                    if (!tableName) {
                        return [2 /*return*/, ResponseMessages.TBNAME_IS_NULL()];
                    }
                    return [4 /*yield*/, isTableExist(dbName, tableName)];
                case 1:
                    tableExist = _a.sent();
                    if (!tableExist) {
                        // console.log(`${tableName} 表不存在`);
                        return [2 /*return*/, ResponseMessages.TB_EXIST("".concat(tableName, " \u8868\u4E0D\u5B58\u5728"))];
                    }
                    return [4 /*yield*/, useDatabase(dbName)];
                case 2:
                    database = _a.sent();
                    currentDb = database.result.target.result;
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var store = currentDb.transaction([tableName], 'readwrite').objectStore(tableName);
                            var request = store.delete(id);
                            request.onsuccess = function (event) {
                                resolve(ResponseMessages.TB_DELETE_BY_PK_SUCCESS(event));
                            };
                            request.onerror = function (event) {
                                reject(ResponseMessages.TB_DELETE_BY_PK_ERROR(event));
                            };
                        })];
            }
        });
    });
}

/**
 * 根据索引删除单条数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param indexName 索引名称
 * @param indexValue 索引值
 * @returns Promise对象，包含删除结果的状态和消息
 */
function deleteOneByIndex$$1(dbName, tableName, indexName, indexValue) {
    return __awaiter(this, void 0, void 0, function () {
        var tableExist, database, currentDb_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!dbName) {
                        return [2 /*return*/, ResponseMessages.DBNAME_IS_NULL()];
                    }
                    if (!tableName) {
                        return [2 /*return*/, ResponseMessages.TBNAME_IS_NULL()];
                    }
                    if (!indexName) {
                        return [2 /*return*/, ResponseMessages.TB_SELECT_INDEX_NAME_IS_NULL()];
                    }
                    if (!indexValue) {
                        return [2 /*return*/, ResponseMessages.TB_SELECT_INDEX_VALUE_IS_NULL()];
                    }
                    return [4 /*yield*/, isTableExist(dbName, tableName)];
                case 1:
                    tableExist = _a.sent();
                    if (!tableExist) {
                        return [2 /*return*/, ResponseMessages.TB_EXIST("".concat(tableName, " \u8868\u4E0D\u5B58\u5728"))];
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, useDatabase(dbName)];
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
                                        resolve(ResponseMessages.TB_DELETE_BY_INDEX_SUCCESS({ id: cursor.primaryKey }));
                                    };
                                    deleteRequest.onerror = function (event) {
                                        reject(ResponseMessages.TB_DELETE_BY_INDEX_ERROR(event));
                                    };
                                }
                                else {
                                    resolve(ResponseMessages.TB_DELETE_BY_INDEX_SUCCESS(null)); // No record found
                                }
                            };
                            request.onerror = function (event) {
                                reject(ResponseMessages.TB_DELETE_BY_INDEX_ERROR(event));
                            };
                        })];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, ResponseMessages.BASIC_ERROR(error_1)];
                case 5: return [2 /*return*/];
            }
        });
    });
}

/**
 * 删除所有表
 * @param dbName 数据库名称
 * @returns Promise对象，包含删除结果的状态和消息
 */
function deleteAllTables$$1(dbName) {
    return __awaiter(this, void 0, void 0, function () {
        var database, currentDb, objectStoreNames, deletePromises;
        var _this = this;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, useDatabase(dbName)];
                case 1:
                    database = _b.sent();
                    currentDb = database.result.target.result;
                    objectStoreNames = Array.from((_a = currentDb === null || currentDb === void 0 ? void 0 : currentDb.objectStoreNames) !== null && _a !== void 0 ? _a : []);
                    deletePromises = objectStoreNames.map(function (tableName) {
                        return _this.deleteTable(dbName, tableName);
                    });
                    return [2 /*return*/, Promise.all(deletePromises)];
            }
        });
    });
}

/**
 * 删除指定表
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @returns Promise对象，包含删除结果的状态和消息
 */
function deleteTable(dbName, tableName) {
    return new Promise(function (resolve, reject) {
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function (event) {
            var db = event.target.result;
            var version = db.version + 1;
            db.close();
            var deleteRequest = window.indexedDB.open(dbName, version);
            deleteRequest.onupgradeneeded = function (event) {
                var upgradeDb = event.target.result;
                if (upgradeDb.objectStoreNames.contains(tableName)) {
                    upgradeDb.deleteObjectStore(tableName);
                }
            };
            deleteRequest.onsuccess = function (event) {
                event.target.result.close();
                resolve(ResponseMessages.TB_DELETE_SUCCESS("".concat(tableName, " \u8868\u5220\u9664\u6210\u529F")));
            };
            deleteRequest.onerror = function (event) {
                reject(ResponseMessages.TB_DELETE_ERROR(event));
            };
        };
        request.onerror = function (error) {
            reject(ResponseMessages.BASIC_ERROR(error));
        };
    });
}

/**
 * 根据主键数组批量删除数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param keys 主键值数组
 * @returns Promise对象，包含删除结果的状态和消息
 */
function deleteManyByPK$$1(dbName, tableName, keys) {
    return __awaiter(this, void 0, void 0, function () {
        var tableExist, database, currentDb_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!dbName) {
                        return [2 /*return*/, ResponseMessages.DBNAME_IS_NULL()];
                    }
                    if (!tableName) {
                        return [2 /*return*/, ResponseMessages.TBNAME_IS_NULL()];
                    }
                    if (!keys || keys.length === 0) {
                        return [2 /*return*/, ResponseMessages.PRIMARY_KEY_IS_NULL()];
                    }
                    return [4 /*yield*/, isTableExist(dbName, tableName)];
                case 1:
                    tableExist = _a.sent();
                    if (!tableExist) {
                        return [2 /*return*/, ResponseMessages.TB_NOTFOUND("".concat(tableName, " \u8868\u4E0D\u5B58\u5728"))];
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, useDatabase(dbName)];
                case 3:
                    database = _a.sent();
                    currentDb_1 = database.result.target.result;
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var store = currentDb_1.transaction([tableName], 'readwrite').objectStore(tableName);
                            var deletePromises = keys.map(function (key) {
                                return new Promise(function (resolve, reject) {
                                    var request = store.delete(key);
                                    request.onsuccess = function () { return resolve(); };
                                    request.onerror = function (event) {
                                        return reject(ResponseMessages.TB_DELETE_RECORDS_BY_KEYS_ERROR(event.target.error));
                                    };
                                });
                            });
                            Promise.all(deletePromises)
                                .then(function () {
                                return resolve(ResponseMessages.TB_DELETE_RECORDS_BY_KEYS_SUCCESS("".concat(keys.length, " \u6761\u6570\u636E\u5220\u9664\u6210\u529F")));
                            })
                                .catch(function (error) { return reject(ResponseMessages.TB_DELETE_RECORDS_BY_KEYS_ERROR(error)); });
                        })];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, ResponseMessages.BASIC_ERROR(error_1)];
                case 5: return [2 /*return*/];
            }
        });
    });
}

/**
 * 根据索引批量删除数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param indexName 索引名称
 * @param indexValues 索引值数组
 * @returns Promise对象，包含删除结果的状态和消息
 */
function deleteManyByIndex$$1(dbName, tableName, indexName, indexValues) {
    return __awaiter(this, void 0, void 0, function () {
        var tableExist, database, currentDb_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // 检查数据库名称是否为空
                    if (!dbName) {
                        return [2 /*return*/, ResponseMessages.DBNAME_IS_NULL()];
                    }
                    // 检查表名称是否为空
                    if (!tableName) {
                        return [2 /*return*/, ResponseMessages.TBNAME_IS_NULL()];
                    }
                    return [4 /*yield*/, isTableExist(dbName, tableName)];
                case 1:
                    tableExist = _a.sent();
                    if (!tableExist) {
                        return [2 /*return*/, ResponseMessages.TB_EXIST("".concat(tableName, " \u8868\u4E0D\u5B58\u5728"))];
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, useDatabase(dbName)];
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
                                return resolve(ResponseMessages.TB_DELETE_MANY_BY_INDEXS_SUCCESS("".concat(indexValues.length, " \u6761\u6570\u636E\u5220\u9664\u6210\u529F")));
                            })
                                .catch(function (error) { return reject(ResponseMessages.TB_DELETE_MANY_BY_INDEXS_ERROR(error)); });
                        })];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, ResponseMessages.BASIC_ERROR(error_1)];
                case 5: return [2 /*return*/];
            }
        });
    });
}



var indexeddbToolkit = /*#__PURE__*/Object.freeze({
    useDatabase: useDatabase,
    getTableNames: getTableNames,
    deleteDatabase: deleteDatabase,
    deleteAllDatabases: deleteAllDatabases,
    createTable: createTable,
    insertOne: insertOne$$1,
    insertMany: insertMany$$1,
    findDBData: findDBData$$1,
    updateDataByPrimaryKey: updateDataByPrimaryKey$$1,
    findByKey: findByKey$$1,
    findByIndex: findByIndex$$1,
    deleteOneByPk: deleteOneByPk$$1,
    deleteOneByIndex: deleteOneByIndex$$1,
    deleteAllTables: deleteAllTables$$1,
    deleteTable: deleteTable,
    deleteManyByPK: deleteManyByPK$$1,
    deleteManyByIndex: deleteManyByIndex$$1
});

exports.default = indexeddbToolkit;
exports.useDatabase = useDatabase;
exports.getTableNames = getTableNames;
exports.deleteDatabase = deleteDatabase;
exports.deleteAllDatabases = deleteAllDatabases;
exports.createTable = createTable;
exports.insertOne = insertOne$$1;
exports.insertMany = insertMany$$1;
exports.findDBData = findDBData$$1;
exports.updateDataByPrimaryKey = updateDataByPrimaryKey$$1;
exports.findByKey = findByKey$$1;
exports.findByIndex = findByIndex$$1;
exports.deleteOneByPk = deleteOneByPk$$1;
exports.deleteOneByIndex = deleteOneByIndex$$1;
exports.deleteAllTables = deleteAllTables$$1;
exports.deleteTable = deleteTable;
exports.deleteManyByPK = deleteManyByPK$$1;
exports.deleteManyByIndex = deleteManyByIndex$$1;
