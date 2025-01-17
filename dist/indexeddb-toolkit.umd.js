(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jszip'), require('tslib')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jszip', 'tslib'], factory) :
  (factory((global['indexeddb-toolkit'] = {}),global.JSZip,global.tslib));
}(this, (function (exports,JSZip,tslib) { 'use strict';

  JSZip = JSZip && JSZip.hasOwnProperty('default') ? JSZip['default'] : JSZip;

  function returnFormatter(code, message, result) {
      if (result === void 0) { result = {}; }
      return { code: code, message: message, result: result };
  }

  // import { IReturn } from '../types'
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
      // 表操作相关
      TB_CREATE_SUCCESS: function (data) { return returnFormatter(200, '表创建成功', tslib.__assign(tslib.__assign({}, data), { timestamp: Date.now() })); },
      TB_INSERT_SUCCESS: function (data) {
          var _a;
          return returnFormatter(200, '数据插入成功', {
              insertedId: (_a = data.target) === null || _a === void 0 ? void 0 : _a.result,
              timestamp: Date.now()
          });
      },
      TB_INSERT_MANY_SUCCESS: function (info) { return returnFormatter(200, '数据批量插入成功', info); },
      TB_SELECT_SUCCESS: function (data) { return returnFormatter(200, '数据查询成功', data); },
      TB_DELETE_SUCCESS: function (info) { return returnFormatter(200, '表删除成功', info); },
      TB_DELETE_ERROR: function (info) { return returnFormatter(408, '表删除失败', info); },
      TB_DELETE_ALL_SUCCESS: function () { return returnFormatter(200, '所有表删除成功'); },
      TB_DELETE_ALL_ERROR: function (info) { return returnFormatter(409, '所有表删除失败', info); },
      // 错误相关
      DBNAME_IS_NULL: function () { return returnFormatter(401, '数据库名称不能为空'); },
      TBNAME_IS_NULL: function () { return returnFormatter(402, '表名不能为空'); },
      OPEN_DB_ERROR: function (error) { return returnFormatter(403, '数据库打开失败', error); },
      OPEN_TB_ERROR: function (error) { return returnFormatter(405, '表打开失败', error); },
      DB_NOTFOUND: function () { return returnFormatter(406, '数据库不存在'); },
      DB_DELETE_ERROR: function (error) { return returnFormatter(407, '数据库删除失败', error); },
      TB_EXIST: function (tableName) { return returnFormatter(406, "\u8868 ".concat(tableName, " \u5DF2\u5B58\u5728"), { tableName: tableName }); },
      JSON_IMPORT_SUCCESS: function (data) { return returnFormatter(200, '数据导入成功', data); },
      JSON_IMPORT_ERROR: function (error) { return returnFormatter(412, '数据导入失败', error); },
      TB_CREATE_ERROR: function (error) { return returnFormatter(407, '表创建失败', {
          error: error instanceof Error ? error.message : String(error)
      }); },
      TB_NOTFOUND: function (message) { return returnFormatter(411, message || '表不存在'); },
      TB_INSERT_ERROR: function (error) { return returnFormatter(412, '数据插入失败', {
          error: error instanceof Error ? error.message : String(error)
      }); },
      JSON_EXPORT_SUCCESS: function (data) { return returnFormatter(200, '数据导出成功', data); },
      JSON_EXPORT_ERROR: function (error) { return returnFormatter(412, '数据导出失败', error); },
      // ... 其他消息保持 returnFormater 格式
      TB_INSERT_MANY_ERROR: function (error) { return returnFormatter(413, '数据批量插入失败', error); },
      INSERT_DATA_ERROR: function (data) { return returnFormatter(414, '数据格式不正确', data); },
      TB_SELECT_ERROR: function (error) { return returnFormatter(415, '数据查询失败', error); },
      PRIMARY_KEY_IS_NULL: function () { return returnFormatter(416, '主键不能为空'); },
      // 基础错误
      BASIC_ERROR: function (error) { return returnFormatter(500, '操作失败', {
          error: error instanceof Error ? error.message : error
      }); },
      // 其他所有消息都使用 returnFormater
      DATA_ERROR: function (message) { return returnFormatter(404, message); },
      TB_DELETE_MANY_BY_INDEXS_SUCCESS: function (info) { return returnFormatter(200, '批量删除索引数据成功', info); },
      TB_DELETE_MANY_BY_INDEXS_ERROR: function (error) { return returnFormatter(417, '批量删除索引数据失败', error); },
      TB_SELECT_INDEX_NAME_IS_NULL: function () { return returnFormatter(418, '索引名称不能为空'); },
      TB_SELECT_INDEX_VALUE_IS_NULL: function () { return returnFormatter(419, '索引值不能为空'); },
      TB_DELETE_BY_INDEX_SUCCESS: function (info) { return returnFormatter(200, '通过索引删除数据成功', info); },
      TB_DELETE_BY_INDEX_ERROR: function (error) { return returnFormatter(420, '通过索引删除数据失败', error); },
      TB_DELETE_BY_PK_SUCCESS: function (info) { return returnFormatter(200, '通过主键删除数据成功', info); },
      TB_DELETE_BY_PK_ERROR: function (error) { return returnFormatter(421, '通过主键删除数据失败', error); },
      TB_INDEX_ERROR: function () { return returnFormatter(422, '索引不存在'); },
      TB_SELECT_BY_INDEX_SUCCESS: function (data) { return returnFormatter(200, '通过索引查询数据成功', data); },
      TB_SELECT_BY_INDEX_ERROR: function (error) { return returnFormatter(423, '通过索引查询数据失败', error); },
      TB_DELETE_RECORDS_BY_KEYS_SUCCESS: function (info) { return returnFormatter(200, '批量删除记录成功', info); },
      TB_DELETE_RECORDS_BY_KEYS_ERROR: function (error) { return returnFormatter(424, '批量删除记录失败', error); },
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
      TB_SELECT_BY_KEY_SUCCESS: function (data) { return returnFormatter(200, '通过主键查询数据成功', data); },
      TB_SELECT_BY_KEY_ERROR: function (error) { return returnFormatter(425, '通过主键查询数据失败', error); },
      TB_DATA_UPDATE_BY_INDEX_SUCCESS: function (data) { return returnFormatter(200, '通过索引更新数据成功', data); },
      TB_DATA_UPDATE_BY_INDEX_ERROR: function (error) { return returnFormatter(426, '通过索引更新数据失败', error); },
      TB_DATA_UPDATE_BY_PRIMARY_KEY_SUCCESS: function (data) { return returnFormatter(200, '通过主键更新数据成功', data); },
      TB_DATA_UPDATE_BY_PRIMARY_KEY_ERROR: function (error) { return returnFormatter(427, '通过主键更新数据失败', error); }
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
      return tslib.__awaiter(this, void 0, void 0, function () {
          var res, error_1;
          return tslib.__generator(this, function (_a) {
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
                          return [2 /*return*/, ResponseMessages.DB_NOTFOUND()];
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
      return tslib.__awaiter(this, void 0, void 0, function () {
          var db, error_1;
          return tslib.__generator(this, function (_a) {
              switch (_a.label) {
                  case 0:
                      _a.trys.push([0, 2, , 3]);
                      return [4 /*yield*/, useDatabase(dbName)];
                  case 1:
                      db = _a.sent();
                      return [2 /*return*/, db.objectStoreNames.contains(tableName)];
                  case 2:
                      error_1 = _a.sent();
                      return [2 /*return*/, false];
                  case 3: return [2 /*return*/];
              }
          });
      });
  }

  /**
   * 关闭所有数据库连接
   */
  function closeAllConnections() {
      return tslib.__awaiter(this, void 0, void 0, function () {
          var databases, _i, databases_1, db, request, error_1;
          return tslib.__generator(this, function (_a) {
              switch (_a.label) {
                  case 0:
                      _a.trys.push([0, 2, , 3]);
                      return [4 /*yield*/, window.indexedDB.databases()];
                  case 1:
                      databases = _a.sent();
                      // 关闭每个数据库连接
                      for (_i = 0, databases_1 = databases; _i < databases_1.length; _i++) {
                          db = databases_1[_i];
                          if (db.name) {
                              request = window.indexedDB.open(db.name);
                              request.onsuccess = function (event) {
                                  var database = event.target.result;
                                  database.close();
                              };
                          }
                      }
                      return [3 /*break*/, 3];
                  case 2:
                      error_1 = _a.sent();
                      console.error('Error closing database connections:', error_1);
                      return [3 /*break*/, 3];
                  case 3: return [2 /*return*/];
              }
          });
      });
  }

  // 判断是否为生产环境的简单方法
  var isProduction = function () {
      try {
          return window.location.hostname !== 'localhost' &&
              window.location.hostname !== '127.0.0.1';
      }
      catch (_a) {
          return false;
      }
  };
  var logger = {
      debug: function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          if (!isProduction()) {
              console.debug.apply(console, tslib.__spreadArray(['[IndexedDB Toolkit]'], args, false));
          }
      },
      error: function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          if (!isProduction()) {
              console.error.apply(console, tslib.__spreadArray(['[IndexedDB Toolkit]'], args, false));
          }
      },
      warn: function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          if (!isProduction()) {
              console.warn.apply(console, tslib.__spreadArray(['[IndexedDB Toolkit]'], args, false));
          }
      }
  };

  /**
   * 使用指定的数据库
   *
   * @param {string} dbName - 数据库名称
   * @param {number} [version] - 可选的版本号
   * @returns {Promise<IDBDatabase>} Promise对象，返回数据库实例
   * @throws {Error} 当数据库操作失败时抛出错误
   */
  function useDatabase(dbName, version) {
      var _this = this;
      if (!dbName) {
          throw new Error(ResponseMessages.DBNAME_IS_NULL().message);
      }
      return new Promise(function (resolve, reject) {
          var handleSuccess = function (event) {
              var target = event.target;
              resolve(target.result);
          };
          var handleVersionError = function (dbName, error) { return tslib.__awaiter(_this, void 0, void 0, function () {
              var existingDB, currentVersion_1, newVersion_1, newRequest_1, currentVersion, newVersion_2, newRequest, error_1;
              var _a;
              return tslib.__generator(this, function (_b) {
                  switch (_b.label) {
                      case 0:
                          _b.trys.push([0, 2, , 3]);
                          existingDB = (_a = error.target) === null || _a === void 0 ? void 0 : _a.result;
                          if (existingDB) {
                              currentVersion_1 = existingDB.version;
                              existingDB.close();
                              newVersion_1 = version || (currentVersion_1 + 1);
                              logger.debug("Upgrading database ".concat(dbName, " from version ").concat(currentVersion_1, " to ").concat(newVersion_1));
                              newRequest_1 = window.indexedDB.open(dbName, newVersion_1);
                              newRequest_1.onsuccess = handleSuccess;
                              newRequest_1.onerror = function (event) {
                                  var target = event.target;
                                  reject(target.error);
                              };
                              newRequest_1.onupgradeneeded = function (event) {
                                  logger.debug("Database ".concat(dbName, " upgrade needed to version ").concat(newVersion_1));
                                  handleSuccess(event);
                              };
                              return [2 /*return*/];
                          }
                          return [4 /*yield*/, getIndexedDBVersion(dbName)];
                      case 1:
                          currentVersion = _b.sent();
                          newVersion_2 = version || (currentVersion + 1);
                          logger.debug("Opening database ".concat(dbName, " with new version ").concat(newVersion_2));
                          newRequest = window.indexedDB.open(dbName, newVersion_2);
                          newRequest.onsuccess = handleSuccess;
                          newRequest.onerror = function (event) {
                              var target = event.target;
                              reject(target.error);
                          };
                          newRequest.onupgradeneeded = function (event) {
                              logger.debug("Database ".concat(dbName, " upgrade needed to version ").concat(newVersion_2));
                              handleSuccess(event);
                          };
                          return [3 /*break*/, 3];
                      case 2:
                          error_1 = _b.sent();
                          logger.error("Error handling version change for database ".concat(dbName, ":"), error_1);
                          reject(error_1);
                          return [3 /*break*/, 3];
                      case 3: return [2 /*return*/];
                  }
              });
          }); };
          // 首次尝试打开数据库
          var initialRequest = window.indexedDB.open(dbName, version);
          initialRequest.onsuccess = handleSuccess;
          initialRequest.onerror = function (event) {
              var target = event.target;
              var error = target.error;
              if ((error === null || error === void 0 ? void 0 : error.name) === 'VersionError') {
                  handleVersionError(dbName, error);
              }
              else {
                  logger.error("Error opening database ".concat(dbName, ":"), error);
                  reject(error);
              }
          };
          initialRequest.onupgradeneeded = function (event) {
              logger.debug("Database ".concat(dbName, " upgrade needed to version ").concat(version));
              handleSuccess(event);
          };
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
              reject(ResponseMessages.DB_DELETE_ERROR(event.target.error));
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
      return tslib.__awaiter(this, void 0, void 0, function () {
          var allDatabasesResponse, deletePromises, error_1;
          return tslib.__generator(this, function (_a) {
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
                  case 3: return [2 /*return*/, ResponseMessages.DB_NOTFOUND()];
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
   * 关闭所有数据库连接
   */
  function closeAllConnections$1() {
      return tslib.__awaiter(this, void 0, void 0, function () {
          var databases;
          var _a, _b;
          return tslib.__generator(this, function (_c) {
              switch (_c.label) {
                  case 0: return [4 /*yield*/, ((_b = (_a = window.indexedDB).databases) === null || _b === void 0 ? void 0 : _b.call(_a))];
                  case 1:
                      databases = (_c.sent()) || [];
                      // 关闭每个数据库连接
                      databases.forEach(function (db) {
                          if (db.name) {
                              var request = window.indexedDB.open(db.name);
                              request.onsuccess = function (event) {
                                  var db = event.target.result;
                                  db.close();
                              };
                          }
                      });
                      return [2 /*return*/];
              }
          });
      });
  }

  /**
   * 获取指定数据库中的表数量
   * @param dbName 数据库名称
   * @returns Promise对象，包含表名称数组
   */
  function getTableNames(dbName) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          var db, objectStoreNames, error_1;
          return tslib.__generator(this, function (_a) {
              switch (_a.label) {
                  case 0:
                      // 检查数据库名称是否为空
                      if (!dbName) {
                          return [2 /*return*/, ResponseMessages.DBNAME_IS_NULL()];
                      }
                      _a.label = 1;
                  case 1:
                      _a.trys.push([1, 3, , 4]);
                      return [4 /*yield*/, useDatabase(dbName)];
                  case 2:
                      db = _a.sent();
                      objectStoreNames = Array.from(db.objectStoreNames);
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
                      return [2 /*return*/, ResponseMessages.BASIC_ERROR(error_1)];
                  case 4: return [2 /*return*/];
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
      return tslib.__awaiter(this, void 0, void 0, function () {
          var database, currentDb, objectStoreNames, deletePromises;
          var _a;
          return tslib.__generator(this, function (_b) {
              switch (_b.label) {
                  case 0: return [4 /*yield*/, useDatabase(dbName)];
                  case 1:
                      database = _b.sent();
                      currentDb = database.result.target.result;
                      objectStoreNames = Array.from((_a = currentDb === null || currentDb === void 0 ? void 0 : currentDb.objectStoreNames) !== null && _a !== void 0 ? _a : []);
                      deletePromises = objectStoreNames.map(function (tableName) {
                          return deleteTable(dbName, tableName);
                      });
                      return [2 /*return*/, Promise.all(deletePromises)];
              }
          });
      });
  }

  /**
   * 索引类型枚举
   */
  var IndexType;
  (function (IndexType) {
      IndexType["UNIQUE"] = "unique";
      IndexType["MULTI_ENTRY"] = "multi";
      IndexType["NORMAL"] = "normal"; // 普通索引
  })(IndexType || (IndexType = {}));
  /**
   * 创建数据库表
   * @description
   * 创建一个新的 IndexedDB 对象仓库并配置索引。
   * 支持唯一索引和多值索引。
   *
   * @example
   * ```typescript
   * // 创建用户表 - 简单方式
   * await createTable('myDB', 'users', {
   *   primaryKey: 'userId',
   *   indexes: ['email', 'name', 'tags'] // 默认为普通索引
   * })
   *
   * // 创建用户表 - 高级配置
   * await createTable('myDB', 'users', {
   *   primaryKey: 'userId',
   *   indexes: [
   *     'name',                          // 普通索引
   *     {
   *       name: 'email',
   *       type: IndexType.UNIQUE         // 唯一索引
   *     },
   *     {
   *       name: 'tags',
   *       type: IndexType.MULTI_ENTRY    // 多值索引，用于数组字段
   *     }
   *   ]
   * })
   * ```
   */
  function createTable$$1(dbName_1, tableName_1) {
      return tslib.__awaiter(this, arguments, void 0, function (dbName, tableName, options) {
          var _a, primaryKey_1, _b, autoIncrement_1, _c, indexes_1, _d, timeout_1, _e, force_1, exists, db, newVersion_1, error_1;
          var _this = this;
          if (options === void 0) { options = {}; }
          return tslib.__generator(this, function (_f) {
              switch (_f.label) {
                  case 0:
                      _f.trys.push([0, 3, , 4]);
                      _a = options.primaryKey, primaryKey_1 = _a === void 0 ? 'id' : _a, _b = options.autoIncrement, autoIncrement_1 = _b === void 0 ? true : _b, _c = options.indexes, indexes_1 = _c === void 0 ? [] : _c, _d = options.timeout, timeout_1 = _d === void 0 ? 3000 : _d, _e = options.force, force_1 = _e === void 0 ? true : _e;
                      // 参数验证
                      if (!dbName)
                          return [2 /*return*/, ResponseMessages.DBNAME_IS_NULL()];
                      if (!tableName)
                          return [2 /*return*/, ResponseMessages.TBNAME_IS_NULL()
                              // 检查表是否存在
                          ];
                      return [4 /*yield*/, isTableExist(dbName, tableName)];
                  case 1:
                      exists = _f.sent();
                      if (exists)
                          return [2 /*return*/, ResponseMessages.TB_EXIST(tableName)
                              // 获取数据库连接
                          ];
                      return [4 /*yield*/, useDatabase(dbName)];
                  case 2:
                      db = _f.sent();
                      newVersion_1 = db.version + 1;
                      db.close();
                      return [2 /*return*/, new Promise(function (resolve, reject) {
                              var openRequest = window.indexedDB.open(dbName, newVersion_1);
                              var timeoutId;
                              // 设置超时处理
                              if (timeout_1 > 0) {
                                  timeoutId = setTimeout(function () { return tslib.__awaiter(_this, void 0, void 0, function () {
                                      var retryRequest, err_1;
                                      return tslib.__generator(this, function (_a) {
                                          switch (_a.label) {
                                              case 0:
                                                  if (!force_1) return [3 /*break*/, 5];
                                                  _a.label = 1;
                                              case 1:
                                                  _a.trys.push([1, 3, , 4]);
                                                  return [4 /*yield*/, closeAllConnections()];
                                              case 2:
                                                  _a.sent();
                                                  retryRequest = window.indexedDB.open(dbName, newVersion_1);
                                                  setupHandlers(retryRequest);
                                                  return [3 /*break*/, 4];
                                              case 3:
                                                  err_1 = _a.sent();
                                                  reject(ResponseMessages.TB_CREATE_ERROR(err_1));
                                                  return [3 /*break*/, 4];
                                              case 4: return [3 /*break*/, 6];
                                              case 5:
                                                  reject(ResponseMessages.TB_CREATE_ERROR('创建表超时'));
                                                  _a.label = 6;
                                              case 6: return [2 /*return*/];
                                          }
                                      });
                                  }); }, timeout_1);
                              }
                              var setupHandlers = function (request) {
                                  request.onblocked = function () {
                                      logger.warn('数据库升级被阻塞 - 等待其他连接关闭');
                                      // 阻塞时不立即失败,等待超时或强制处理
                                  };
                                  request.onupgradeneeded = function (event) {
                                      clearTimeout(timeoutId);
                                      var database = event.target.result;
                                      try {
                                          var store_1 = database.createObjectStore(tableName, {
                                              keyPath: primaryKey_1,
                                              autoIncrement: autoIncrement_1
                                          });
                                          indexes_1.forEach(function (index) {
                                              var indexConfig = {};
                                              if (typeof index === 'string') {
                                                  store_1.createIndex(index, index, indexConfig);
                                                  logger.debug("\u521B\u5EFA\u666E\u901A\u7D22\u5F15: ".concat(index));
                                              }
                                              else {
                                                  switch (index.type) {
                                                      case IndexType.UNIQUE:
                                                          indexConfig.unique = true;
                                                          break;
                                                      case IndexType.MULTI_ENTRY:
                                                          indexConfig.multiEntry = true;
                                                          break;
                                                      case IndexType.NORMAL:
                                                          break;
                                                  }
                                                  store_1.createIndex(index.name, index.name, indexConfig);
                                                  logger.debug("\u521B\u5EFA".concat(index.type, "\u7D22\u5F15: ").concat(index.name));
                                              }
                                          });
                                          logger.debug("\u8868 ".concat(tableName, " \u521B\u5EFA\u6210\u529F\uFF0C\u5171\u521B\u5EFA ").concat(indexes_1.length, " \u4E2A\u7D22\u5F15"));
                                      }
                                      catch (error) {
                                          logger.error("\u521B\u5EFA\u8868 ".concat(tableName, " \u5931\u8D25:"), error);
                                          reject(ResponseMessages.TB_CREATE_ERROR(error));
                                      }
                                  };
                                  request.onsuccess = function (event) {
                                      clearTimeout(timeoutId);
                                      var database = event.target.result;
                                      database.close();
                                      resolve(ResponseMessages.TB_CREATE_SUCCESS());
                                  };
                                  request.onerror = function (event) {
                                      clearTimeout(timeoutId);
                                      logger.error('创建表失败:', event.target.error);
                                      reject(ResponseMessages.TB_CREATE_ERROR(event.target.error));
                                  };
                              };
                              setupHandlers(openRequest);
                          })];
                  case 3:
                      error_1 = _f.sent();
                      logger.error('创建表失败:', error_1);
                      return [2 /*return*/, ResponseMessages.TB_CREATE_ERROR(error_1)];
                  case 4: return [2 /*return*/];
              }
          });
      });
  }

  // 插入一条数据到指定表
  function insertOne$$1(dbName, tableName, data) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          var tableExist, db;
          return tslib.__generator(this, function (_a) {
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
                      return [4 /*yield*/, useDatabase(dbName)
                          // 返回一个新的Promise
                      ];
                  case 2:
                      db = _a.sent();
                      // 返回一个新的Promise
                      return [2 /*return*/, new Promise(function (resolve, reject) {
                              var _a;
                              // 开启一个读写事务
                              var transaction = db.transaction([tableName], 'readwrite');
                              var store = transaction.objectStore(tableName);
                              // 获取主键名
                              var keyPath = store.keyPath;
                              // 如果数据中没有主键，且是自增主键，则不添加id
                              // 如果数据中没有主键，且不是自增主键，则添加id
                              var finalData;
                              if (!(keyPath in data)) {
                                  if (!store.autoIncrement) {
                                      finalData = tslib.__assign((_a = {}, _a[keyPath] = Date.now(), _a), data);
                                  }
                                  else {
                                      finalData = data;
                                  }
                              }
                              else {
                                  finalData = data;
                              }
                              // 添加数据
                              var request = store.add(finalData);
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

  // import { any } from './types'
  /**
   * 批量插入数据
   * @param dbName 数据库名称
   * @param tableName 表名
   * @param data 要插入的数据数组
   * @param options 插入选项
   * @returns Promise<any>
   */
  function insertMany$$1(dbName_1, tableName_1, data_1) {
      return tslib.__awaiter(this, arguments, void 0, function (dbName, tableName, data, options) {
          var result, db, transaction, store_1, error_1;
          var _this = this;
          if (options === void 0) { options = {}; }
          return tslib.__generator(this, function (_a) {
              switch (_a.label) {
                  case 0:
                      result = {
                          success: true,
                          inserted: 0,
                          failed: 0,
                          errors: []
                      };
                      _a.label = 1;
                  case 1:
                      _a.trys.push([1, 4, , 5]);
                      return [4 /*yield*/, useDatabase(dbName)];
                  case 2:
                      db = _a.sent();
                      transaction = db.transaction([tableName], 'readwrite');
                      store_1 = transaction.objectStore(tableName);
                      // 使用Promise.all处理所有插入操作
                      return [4 /*yield*/, Promise.all(data.map(function (item) { return tslib.__awaiter(_this, void 0, void 0, function () {
                              var keyPath, finalData_1, error_2;
                              var _a;
                              return tslib.__generator(this, function (_b) {
                                  switch (_b.label) {
                                      case 0:
                                          _b.trys.push([0, 5, , 6]);
                                          keyPath = store_1.keyPath;
                                          if (!(keyPath in item)) {
                                              if (!store_1.autoIncrement) {
                                                  finalData_1 = tslib.__assign((_a = {}, _a[keyPath] = Date.now(), _a), item);
                                              }
                                              else {
                                                  finalData_1 = item;
                                              }
                                          }
                                          else {
                                              finalData_1 = item;
                                          }
                                          if (!options.updateDuplicates) return [3 /*break*/, 2];
                                          // 如果选择更新重复项，使用put
                                          return [4 /*yield*/, new Promise(function (resolve, reject) {
                                                  var request = store_1.put(finalData_1);
                                                  request.onsuccess = function () { return resolve(undefined); };
                                                  request.onerror = function () { return reject(request.error); };
                                              })];
                                      case 1:
                                          // 如果选择更新重复项，使用put
                                          _b.sent();
                                          return [3 /*break*/, 4];
                                      case 2: 
                                      // 否则使用add，可能会抛出重复键错误
                                      return [4 /*yield*/, new Promise(function (resolve, reject) {
                                              var request = store_1.add(finalData_1);
                                              request.onsuccess = function () { return resolve(undefined); };
                                              request.onerror = function (event) {
                                                  var error = request.error;
                                                  if ((error === null || error === void 0 ? void 0 : error.name) === 'ConstraintError' && options.skipDuplicates) {
                                                      // 如果是重复键错误且设置了跳过重复，则忽略错误
                                                      resolve(undefined);
                                                  }
                                                  else {
                                                      reject(error);
                                                  }
                                              };
                                          })];
                                      case 3:
                                          // 否则使用add，可能会抛出重复键错误
                                          _b.sent();
                                          _b.label = 4;
                                      case 4:
                                          result.inserted++;
                                          return [3 /*break*/, 6];
                                      case 5:
                                          error_2 = _b.sent();
                                          result.failed++;
                                          result.errors.push({
                                              item: item,
                                              error: error_2 instanceof Error ? error_2.message : String(error_2)
                                          });
                                          if (!options.skipDuplicates && !options.updateDuplicates) {
                                              throw error_2; // 如果没有设置跳过或更新重复项，则抛出错误
                                          }
                                          return [3 /*break*/, 6];
                                      case 6: return [2 /*return*/];
                                  }
                              });
                          }); }))];
                  case 3:
                      // 使用Promise.all处理所有插入操作
                      _a.sent();
                      return [2 /*return*/, ResponseMessages.TB_INSERT_SUCCESS(result)];
                  case 4:
                      error_1 = _a.sent();
                      result.success = false;
                      return [2 /*return*/, ResponseMessages.TB_INSERT_ERROR(error_1)];
                  case 5: return [2 /*return*/];
              }
          });
      });
  }

  /**
   * 查询指定数据库中的数据，如果提供了表名，则查询该表的数据；如果未提供表名，则查询所有表的数据。
   * @async
   * @param {string} dbName - 数据库名称
   * @param {string} [tableName] - 可选，表名。如果提供了表名，则查询该表的数据；如果未提供表名，则查询所有表的数据
   * @returns {Promise<TableData[] | IReturn>} 返回包含查询结果的Promise对象
   */
  function findDBData$$1(dbName, tableName) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          var database_1, result, queryTableData_1, tableExist, tableData, objectStoreNames, tableDataPromises, tableDataResults, error_1;
          var _this = this;
          return tslib.__generator(this, function (_a) {
              switch (_a.label) {
                  case 0:
                      if (!dbName) {
                          return [2 /*return*/, ResponseMessages.DBNAME_IS_NULL()];
                      }
                      _a.label = 1;
                  case 1:
                      _a.trys.push([1, 7, , 8]);
                      return [4 /*yield*/, useDatabase(dbName)];
                  case 2:
                      database_1 = _a.sent();
                      result = [];
                      queryTableData_1 = function (storeName) { return tslib.__awaiter(_this, void 0, void 0, function () {
                          var transaction, store_1, data, error_2;
                          return tslib.__generator(this, function (_a) {
                              switch (_a.label) {
                                  case 0:
                                      _a.trys.push([0, 2, , 3]);
                                      transaction = database_1.transaction([storeName], 'readonly');
                                      store_1 = transaction.objectStore(storeName);
                                      return [4 /*yield*/, new Promise(function (resolve, reject) {
                                              var request = store_1.getAll();
                                              request.onsuccess = function () { return resolve(request.result); };
                                              request.onerror = function (event) { return reject(event); };
                                          })];
                                  case 1:
                                      data = _a.sent();
                                      return [2 /*return*/, {
                                              tableName: storeName,
                                              version: database_1.version || '',
                                              children: ResponseMessages.TB_SELECT_SUCCESS(data)
                                          }];
                                  case 2:
                                      error_2 = _a.sent();
                                      logger.error("\u67E5\u8BE2\u8868 ".concat(storeName, " \u6570\u636E\u5931\u8D25:"), error_2);
                                      return [2 /*return*/, null];
                                  case 3: return [2 /*return*/];
                              }
                          });
                      }); };
                      if (!tableName) return [3 /*break*/, 5];
                      return [4 /*yield*/, isTableExist(dbName, tableName)];
                  case 3:
                      tableExist = _a.sent();
                      if (!tableExist) {
                          return [2 /*return*/, ResponseMessages.TB_NOTFOUND()];
                      }
                      return [4 /*yield*/, queryTableData_1(tableName)];
                  case 4:
                      tableData = _a.sent();
                      if (tableData) {
                          result.push(tableData);
                      }
                      return [2 /*return*/, result];
                  case 5:
                      objectStoreNames = Array.from(database_1.objectStoreNames || []);
                      if (objectStoreNames.length === 0) {
                          return [2 /*return*/, []];
                      }
                      tableDataPromises = objectStoreNames.map(function (storeName) { return tslib.__awaiter(_this, void 0, void 0, function () {
                          return tslib.__generator(this, function (_a) {
                              if (!database_1.objectStoreNames.contains(storeName)) {
                                  logger.warn("\u8868 ".concat(storeName, " \u4E0D\u5B58\u5728"));
                                  return [2 /*return*/, null];
                              }
                              return [2 /*return*/, queryTableData_1(storeName)];
                          });
                      }); });
                      return [4 /*yield*/, Promise.all(tableDataPromises)
                          // 过滤掉查询失败的表数据
                      ];
                  case 6:
                      tableDataResults = _a.sent();
                      // 过滤掉查询失败的表数据
                      result.push.apply(result, tableDataResults.filter(function (data) { return data !== null; }));
                      return [2 /*return*/, result];
                  case 7:
                      error_1 = _a.sent();
                      logger.error('查询数据库数据失败:', error_1);
                      return [2 /*return*/, ResponseMessages.BASIC_ERROR(error_1)];
                  case 8: return [2 /*return*/];
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
      return tslib.__awaiter(this, arguments, void 0, function (dbName, tableName, key, isAll) {
          var tableExist, db_1, error_1;
          if (isAll === void 0) { isAll = true; }
          return tslib.__generator(this, function (_a) {
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
                          return [2 /*return*/, ResponseMessages.TB_NOTFOUND()];
                      }
                      return [4 /*yield*/, useDatabase(dbName)];
                  case 3:
                      db_1 = _a.sent();
                      return [2 /*return*/, new Promise(function (resolve, reject) {
                              var store = db_1.transaction(tableName, 'readonly').objectStore(tableName);
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
      return tslib.__awaiter(this, arguments, void 0, function (dbName, tableName, indexName, indexValue, isAll) {
          var tableExist, db_1, error_1;
          if (isAll === void 0) { isAll = true; }
          return tslib.__generator(this, function (_a) {
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
                          return [2 /*return*/, ResponseMessages.TB_EXIST("".concat(tableName, " \u8868\u4E0D\u5B58\u5728"))];
                      }
                      return [4 /*yield*/, useDatabase(dbName)];
                  case 3:
                      db_1 = _a.sent();
                      return [2 /*return*/, new Promise(function (resolve, reject) {
                              var store = db_1.transaction(tableName, 'readonly').objectStore(tableName);
                              if (!Array.from(store.indexNames).includes(indexName))
                                  reject(ResponseMessages.TB_INDEX_ERROR());
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
      return tslib.__awaiter(this, void 0, void 0, function () {
          var tableExist, db_1, error_1;
          return tslib.__generator(this, function (_a) {
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
                          return [2 /*return*/, ResponseMessages.TB_EXIST("".concat(tableName, " \u8868\u4E0D\u5B58\u5728"))];
                      }
                      _a.label = 2;
                  case 2:
                      _a.trys.push([2, 4, , 5]);
                      return [4 /*yield*/, useDatabase(dbName)];
                  case 3:
                      db_1 = _a.sent();
                      return [2 /*return*/, new Promise(function (resolve, reject) {
                              var store = db_1.transaction([tableName], 'readwrite').objectStore(tableName);
                              var request = store.delete(id);
                              request.onsuccess = function (event) {
                                  resolve(ResponseMessages.TB_DELETE_BY_PK_SUCCESS(event));
                              };
                              request.onerror = function (event) {
                                  reject(ResponseMessages.TB_DELETE_BY_PK_ERROR(event));
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
   * 根据索引删除单条数据
   * @param dbName 数据库名称
   * @param tableName 表名称
   * @param indexName 索引名称
   * @param indexValue 索引值
   * @returns Promise对象，包含删除结果的状态和消息
   */
  function deleteOneByIndex$$1(dbName, tableName, indexName, indexValue) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          var tableExist, db_1, error_1;
          return tslib.__generator(this, function (_a) {
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
                      db_1 = _a.sent();
                      return [2 /*return*/, new Promise(function (resolve, reject) {
                              var transaction = db_1.transaction([tableName], 'readwrite');
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
                                      resolve(ResponseMessages.TB_DELETE_BY_INDEX_SUCCESS(null));
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
   * 根据主键数组批量删除数据
   * @param dbName 数据库名称
   * @param tableName 表名称
   * @param keys 主键值数组
   * @returns Promise对象，包含删除结果的状态和消息
   */
  function deleteManyByPK$$1(dbName, tableName, keys) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          var tableExist, db_1, error_1;
          return tslib.__generator(this, function (_a) {
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
                          return [2 /*return*/, ResponseMessages.TB_NOTFOUND()];
                      }
                      _a.label = 2;
                  case 2:
                      _a.trys.push([2, 4, , 5]);
                      return [4 /*yield*/, useDatabase(dbName)];
                  case 3:
                      db_1 = _a.sent();
                      return [2 /*return*/, new Promise(function (resolve, reject) {
                              var store = db_1.transaction([tableName], 'readwrite').objectStore(tableName);
                              var deletePromises = keys.map(function (key) {
                                  return new Promise(function (resolve, reject) {
                                      var request = store.delete(key);
                                      request.onsuccess = function () { return resolve(); };
                                      request.onerror = function (event) {
                                          return reject(ResponseMessages.TB_DELETE_BY_PK_ERROR(event.target.error));
                                      };
                                  });
                              });
                              Promise.all(deletePromises)
                                  .then(function () {
                                  return resolve(ResponseMessages.TB_DELETE_BY_PK_SUCCESS("".concat(keys.length, " \u6761\u6570\u636E\u5220\u9664\u6210\u529F")));
                              })
                                  .catch(function (error) { return reject(ResponseMessages.TB_DELETE_BY_PK_ERROR(error)); });
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
      return tslib.__awaiter(this, void 0, void 0, function () {
          var tableExist, db_1, error_1;
          return tslib.__generator(this, function (_a) {
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
                          return [2 /*return*/, ResponseMessages.TB_EXIST("".concat(tableName, " \u8868\u4E0D\u5B58\u5728"))];
                      }
                      _a.label = 2;
                  case 2:
                      _a.trys.push([2, 4, , 5]);
                      return [4 /*yield*/, useDatabase(dbName)];
                  case 3:
                      db_1 = _a.sent();
                      return [2 /*return*/, new Promise(function (resolve, reject) {
                              var store = db_1.transaction([tableName], 'readwrite').objectStore(tableName);
                              var index = store.index(indexName);
                              var deletePromises = indexValues.map(function (value) {
                                  return new Promise(function (resolve, reject) {
                                      var request = index.openCursor(IDBKeyRange.only(value));
                                      request.onsuccess = function (event) {
                                          var cursor = event.target.result;
                                          if (cursor) {
                                              var deleteRequest = cursor.delete();
                                              deleteRequest.onsuccess = function () {
                                                  cursor.continue();
                                                  resolve(true);
                                              };
                                              deleteRequest.onerror = function (event) {
                                                  return reject({
                                                      code: 400,
                                                      message: event.target.error
                                                  });
                                              };
                                          }
                                          else {
                                              resolve(true);
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

  /**
   * 更新指定主键的数据
   * @param dbName 数据库名称
   * @param tbName 表名称
   * @param id 主键值
   * @param data 更新的数据
   * @returns Promise对象，包含更新结果
   */
  function updateDataByPrimaryKey$$1(dbName, tbName, id, data) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          var tableExist, db_1, error_1;
          return tslib.__generator(this, function (_a) {
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
                          return [2 /*return*/, ResponseMessages.TB_NOTFOUND("".concat(tbName, " \u8868\u4E0D\u5B58\u5728"))];
                      }
                      _a.label = 2;
                  case 2:
                      _a.trys.push([2, 4, , 5]);
                      return [4 /*yield*/, useDatabase(dbName)];
                  case 3:
                      db_1 = _a.sent();
                      return [2 /*return*/, new Promise(function (resolve, reject) {
                              var store = db_1.transaction([tbName], 'readwrite').objectStore(tbName);
                              var request = store.get(id);
                              request.onsuccess = function (event) {
                                  var target = event.target;
                                  var item = target.result;
                                  if (item) {
                                      var updatedItem = tslib.__assign(tslib.__assign({}, item), data);
                                      var updateRequest = store.put(updatedItem);
                                      updateRequest.onsuccess = function (event) {
                                          resolve(ResponseMessages.TB_DATA_UPDATE_BY_PRIMARY_KEY_SUCCESS(event));
                                      };
                                      updateRequest.onerror = function (event) {
                                          reject(ResponseMessages.TB_DATA_UPDATE_BY_PRIMARY_KEY_ERROR(event));
                                      };
                                  }
                                  else {
                                      reject(ResponseMessages.DATA_ERROR('找不到数据'));
                                  }
                              };
                              request.onerror = function (event) {
                                  reject(ResponseMessages.TB_DATA_UPDATE_BY_PRIMARY_KEY_ERROR(event));
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
   * 根据索引更新数据
   * @param dbName 数据库名称
   * @param tbName 表名称
   * @param indexName 索引名称
   * @param indexValue 索引值
   * @param data 更新的数据
   * @returns Promise对象，包含更新结果
   */
  function updateDataByIndex$$1(dbName, tbName, indexName, indexValue, data) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          var tableExist, db_1, error_1;
          return tslib.__generator(this, function (_a) {
              switch (_a.label) {
                  case 0:
                      if (!dbName) {
                          return [2 /*return*/, ResponseMessages.DBNAME_IS_NULL()];
                      }
                      if (!indexName) {
                          return [2 /*return*/, ResponseMessages.TB_SELECT_INDEX_NAME_IS_NULL()];
                      }
                      if (!indexValue) {
                          return [2 /*return*/, ResponseMessages.TB_SELECT_INDEX_VALUE_IS_NULL()];
                      }
                      return [4 /*yield*/, isTableExist(dbName, tbName)];
                  case 1:
                      tableExist = _a.sent();
                      if (!tableExist) {
                          return [2 /*return*/, ResponseMessages.TB_NOTFOUND()];
                      }
                      _a.label = 2;
                  case 2:
                      _a.trys.push([2, 4, , 5]);
                      return [4 /*yield*/, useDatabase(dbName)];
                  case 3:
                      db_1 = _a.sent();
                      return [2 /*return*/, new Promise(function (resolve, reject) {
                              var store = db_1.transaction([tbName], 'readwrite').objectStore(tbName);
                              var index = store.index(indexName);
                              var request = index.get(indexValue);
                              request.onsuccess = function (event) {
                                  var target = event.target;
                                  var item = target.result;
                                  if (item) {
                                      var updatedItem = tslib.__assign(tslib.__assign({}, item), data);
                                      var updateRequest = store.put(updatedItem);
                                      updateRequest.onsuccess = function (event) {
                                          resolve(ResponseMessages.TB_DATA_UPDATE_BY_INDEX_SUCCESS(event));
                                      };
                                      updateRequest.onerror = function (event) {
                                          reject(ResponseMessages.TB_DATA_UPDATE_BY_INDEX_ERROR(event));
                                      };
                                  }
                                  else {
                                      reject(ResponseMessages.DATA_ERROR('找不到数据'));
                                  }
                              };
                              request.onerror = function (event) {
                                  reject(ResponseMessages.TB_DATA_UPDATE_BY_INDEX_ERROR(event));
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

  var QueryBuilder = /** @class */ (function () {
      function QueryBuilder(dbName, tableName) {
          this.selectedFields = [];
          this.whereConditions = [];
          this.orderByClauses = [];
          this.dbName = dbName;
          this.tableName = tableName;
      }
      // 链式查询方法
      QueryBuilder.prototype.select = function () {
          var fields = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              fields[_i] = arguments[_i];
          }
          this.selectedFields = fields.length ? fields : ['*'];
          return this;
      };
      QueryBuilder.prototype.where = function (field, operator, value) {
          this.whereConditions.push({ field: field, operator: operator, value: value });
          return this;
      };
      QueryBuilder.prototype.orderBy = function (field, direction) {
          if (direction === void 0) { direction = 'asc'; }
          this.orderByClauses.push({ field: field, direction: direction });
          return this;
      };
      QueryBuilder.prototype.limit = function (value) {
          this.limitValue = value;
          return this;
      };
      QueryBuilder.prototype.offset = function (value) {
          this.offsetValue = value;
          return this;
      };
      // 配置查询方法
      QueryBuilder.prototype.setConfig = function (config) {
          if (config.select) {
              this.selectedFields = config.select;
          }
          if (config.where) {
              this.whereConditions = config.where;
          }
          if (config.orderBy) {
              this.orderByClauses = config.orderBy;
          }
          if (config.limit !== undefined) {
              this.limitValue = config.limit;
          }
          if (config.offset !== undefined) {
              this.offsetValue = config.offset;
          }
          return this;
      };
      // 执行查询
      QueryBuilder.prototype.execute = function () {
          return tslib.__awaiter(this, void 0, void 0, function () {
              var db, transaction, store_1, error_1;
              var _this = this;
              return tslib.__generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          _a.trys.push([0, 2, , 3]);
                          return [4 /*yield*/, useDatabase(this.dbName)];
                      case 1:
                          db = _a.sent();
                          transaction = db.transaction([this.tableName], 'readonly');
                          store_1 = transaction.objectStore(this.tableName);
                          return [2 /*return*/, new Promise(function (resolve, reject) {
                                  var request = store_1.getAll();
                                  request.onsuccess = function () {
                                      try {
                                          var results = request.result;
                                          // 应用where条件
                                          if (_this.whereConditions.length) {
                                              results = _this.applyWhereConditions(results);
                                          }
                                          // 应用orderBy
                                          if (_this.orderByClauses.length) {
                                              results = _this.applyOrderBy(results);
                                          }
                                          // 应用select
                                          if (_this.selectedFields.length && !_this.selectedFields.includes('*')) {
                                              results = results.map(function (item) {
                                                  var selected = {};
                                                  _this.selectedFields.forEach(function (field) {
                                                      if (field in item) {
                                                          selected[field] = item[field];
                                                      }
                                                  });
                                                  return selected;
                                              });
                                          }
                                          // 应用分页
                                          if (_this.offsetValue !== undefined) {
                                              results = results.slice(_this.offsetValue);
                                          }
                                          if (_this.limitValue !== undefined) {
                                              results = results.slice(0, _this.limitValue);
                                          }
                                          resolve(ResponseMessages.TB_SELECT_SUCCESS(results));
                                      }
                                      catch (error) {
                                          reject(ResponseMessages.TB_SELECT_ERROR(error));
                                      }
                                  };
                                  request.onerror = function () {
                                      reject(ResponseMessages.TB_SELECT_ERROR(request.error));
                                  };
                              })];
                      case 2:
                          error_1 = _a.sent();
                          logger.error('Query execution failed:', error_1);
                          return [2 /*return*/, ResponseMessages.TB_SELECT_ERROR(error_1)];
                      case 3: return [2 /*return*/];
                  }
              });
          });
      };
      QueryBuilder.prototype.applyWhereConditions = function (results) {
          var _this = this;
          return results.filter(function (item) {
              return _this.whereConditions.every(function (_a) {
                  var field = _a.field, operator = _a.operator, value = _a.value;
                  var itemValue = item[field];
                  switch (operator) {
                      case '=':
                          return itemValue === value;
                      case '!=':
                          return itemValue !== value;
                      case '>':
                          return itemValue > value;
                      case '>=':
                          return itemValue >= value;
                      case '<':
                          return itemValue < value;
                      case '<=':
                          return itemValue <= value;
                      case 'between':
                          return itemValue >= value[0] && itemValue <= value[1];
                      case 'in':
                          return value.includes(itemValue);
                      case 'like':
                          if (typeof itemValue !== 'string')
                              return false;
                          var pattern = value.replace(/%/g, '.*');
                          return new RegExp("^".concat(pattern, "$")).test(itemValue);
                      default:
                          return false;
                  }
              });
          });
      };
      QueryBuilder.prototype.applyOrderBy = function (results) {
          var _this = this;
          return tslib.__spreadArray([], results, true).sort(function (a, b) {
              for (var _i = 0, _a = _this.orderByClauses; _i < _a.length; _i++) {
                  var _b = _a[_i], field = _b.field, direction = _b.direction;
                  if (a[field] < b[field])
                      return direction === 'asc' ? -1 : 1;
                  if (a[field] > b[field])
                      return direction === 'asc' ? 1 : -1;
              }
              return 0;
          });
      };
      return QueryBuilder;
  }());

  /**
   * 创建查询构建器
   * @description
   * 创建一个新的查询构建器实例，用于构建数据库查询。
   * 支持链式调用和配置对象两种方式。
   *
   * @param dbName 数据库名称
   * @param tableName 表名称
   * @returns QueryBuilder 实例
   *
   * @example
   * ```typescript
   * // 链式调用
   * const results = await createQuery('myDB', 'users')
   *   .select('name', 'email')
   *   .where('age', '>', 18)
   *   .orderBy('name', 'asc')
   *   .limit(10)
   *   .execute()
   *
   * // 配置对象方式
   * const results = await createQuery('myDB', 'users')
   *   .setConfig({
   *     select: ['name', 'email'],
   *     where: [{ field: 'age', operator: '>', value: 18 }],
   *     orderBy: [{ field: 'name', direction: 'asc' }],
   *     limit: 10
   *   })
   *   .execute()
   * ```
   */
  function createQuery(dbName, tableName) {
      return new QueryBuilder(dbName, tableName);
  }

  /**
   * 保存文件到数据库
   * @description 自动检查并创建数据库表，然后保存文件。支持图片缩略图、文件压缩等处理。
   */
  function saveFilesToDB(dbName_1, tableName_1, file_1) {
      return tslib.__awaiter(this, arguments, void 0, function (dbName, tableName, file, options) {
          var exists, now, fileShortId, downloadToken, baseInfo, fileData_1, dimensions, imageInfo, rawThumbnail, compressedThumbnail, error_1, db, transaction, store_1, error_2;
          if (options === void 0) { options = {
              generateUrl: true,
              generateThumbnail: false,
              thumbnailSize: 100
          }; }
          return tslib.__generator(this, function (_a) {
              switch (_a.label) {
                  case 0:
                      _a.trys.push([0, 11, , 12]);
                      // 参数验证
                      if (!dbName)
                          return [2 /*return*/, ResponseMessages.DBNAME_IS_NULL()];
                      if (!tableName)
                          return [2 /*return*/, ResponseMessages.TBNAME_IS_NULL()];
                      if (!file)
                          return [2 /*return*/, ResponseMessages.BASIC_ERROR('文件不能为空')
                              // 检查表是否存在，不存在则创建
                          ];
                      return [4 /*yield*/, isTableExist(dbName, tableName)];
                  case 1:
                      exists = _a.sent();
                      if (!!exists) return [3 /*break*/, 3];
                      return [4 /*yield*/, createTable$$1(dbName, tableName, {
                              primaryKey: 'id',
                              autoIncrement: true,
                              indexes: ['name']
                          })];
                  case 2:
                      _a.sent();
                      _a.label = 3;
                  case 3:
                      now = Date.now();
                      fileShortId = generateFileShortId();
                      downloadToken = generateDownloadToken();
                      baseInfo = {
                          name: file.name,
                          type: file.type,
                          size: file.size,
                          lastModified: file.lastModified,
                          processedAt: now,
                          fileShortId: fileShortId,
                          downloadToken: downloadToken
                      };
                      // 如果需要生成URL
                      if (options.generateUrl) {
                          baseInfo.url = URL.createObjectURL(file);
                      }
                      fileData_1 = {
                          name: file.name,
                          url: URL.createObjectURL(file),
                          rawFileInfo: tslib.__assign(tslib.__assign({}, baseInfo), { file: file, blob: file, url: URL.createObjectURL(file) }),
                          handleFileInfo: tslib.__assign(tslib.__assign({}, baseInfo), { url: URL.createObjectURL(file) })
                      };
                      if (!file.type.startsWith('image/')) return [3 /*break*/, 9];
                      return [4 /*yield*/, getImageDimensions(file)];
                  case 4:
                      dimensions = _a.sent();
                      imageInfo = {
                          width: dimensions.width,
                          height: dimensions.height
                      };
                      Object.assign(fileData_1.rawFileInfo, imageInfo);
                      Object.assign(fileData_1.handleFileInfo, imageInfo);
                      if (!options.generateThumbnail) return [3 /*break*/, 9];
                      _a.label = 5;
                  case 5:
                      _a.trys.push([5, 8, , 9]);
                      return [4 /*yield*/, generateThumbnail(file, options.thumbnailSize || 100, false)];
                  case 6:
                      rawThumbnail = _a.sent();
                      fileData_1.rawFileInfo.thumbnail = rawThumbnail.base64;
                      fileData_1.rawFileInfo.thumbnailUrl = URL.createObjectURL(rawThumbnail.blob);
                      return [4 /*yield*/, generateThumbnail(file, options.thumbnailSize || 100, true)];
                  case 7:
                      compressedThumbnail = _a.sent();
                      fileData_1.handleFileInfo.thumbnail = compressedThumbnail.base64;
                      fileData_1.handleFileInfo.thumbnailUrl = URL.createObjectURL(compressedThumbnail.blob);
                      fileData_1.handleFileInfo.compressed = true;
                      fileData_1.handleFileInfo.compressedSize = compressedThumbnail.blob.size;
                      fileData_1.rawFileInfo.processMethod = 'thumbnail';
                      fileData_1.handleFileInfo.processMethod = 'thumbnail+compress';
                      return [3 /*break*/, 9];
                  case 8:
                      error_1 = _a.sent();
                      logger.warn('生成缩略图失败:', error_1);
                      return [3 /*break*/, 9];
                  case 9: return [4 /*yield*/, useDatabase(dbName)];
                  case 10:
                      db = _a.sent();
                      transaction = db.transaction([tableName], 'readwrite');
                      store_1 = transaction.objectStore(tableName);
                      return [2 /*return*/, new Promise(function (resolve, reject) {
                              var request = store_1.add(fileData_1);
                              request.onsuccess = function () {
                                  logger.debug("\u6587\u4EF6 ".concat(file.name, " \u4FDD\u5B58\u6210\u529F"));
                                  resolve(ResponseMessages.FILE_SAVE_SUCCESS(request.result));
                              };
                              request.onerror = function () {
                                  logger.error("\u4FDD\u5B58\u6587\u4EF6 ".concat(file.name, " \u5931\u8D25:"), request.error);
                                  reject(ResponseMessages.FILE_SAVE_ERROR(request.error));
                              };
                          })];
                  case 11:
                      error_2 = _a.sent();
                      logger.error('保存文件失败:', error_2);
                      return [2 /*return*/, ResponseMessages.FILE_SAVE_ERROR(error_2)];
                  case 12: return [2 /*return*/];
              }
          });
      });
  }
  // 获取图片尺寸
  function getImageDimensions(file) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          return tslib.__generator(this, function (_a) {
              return [2 /*return*/, new Promise(function (resolve, reject) {
                      var img = new Image();
                      img.onload = function () { return resolve({ width: img.width, height: img.height }); };
                      img.onerror = reject;
                      img.src = URL.createObjectURL(file);
                  })];
          });
      });
  }
  // 生成文件短标识
  function generateFileShortId() {
      return Math.random().toString(36).substring(2, 10);
  }
  // 生成下载令牌
  function generateDownloadToken() {
      return Math.random().toString(36).substring(2, 15);
  }
  /**
   * 生成图片缩略图
   */
  function generateThumbnail(file_1, size_1) {
      return tslib.__awaiter(this, arguments, void 0, function (file, size, compress) {
          if (compress === void 0) { compress = false; }
          return tslib.__generator(this, function (_a) {
              return [2 /*return*/, new Promise(function (resolve, reject) {
                      var reader = new FileReader();
                      reader.onload = function (e) {
                          var _a;
                          var img = new Image();
                          img.onload = function () {
                              var canvas = document.createElement('canvas');
                              var ctx = canvas.getContext('2d');
                              var scale = size / Math.max(img.width, img.height);
                              canvas.width = img.width * scale;
                              canvas.height = img.height * scale;
                              ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                              // 根据是否压缩使用不同的质量参数
                              var quality = compress ? 0.6 : 0.9;
                              var base64 = canvas.toDataURL('image/jpeg', quality);
                              // 转换为Blob
                              canvas.toBlob(function (blob) {
                                  if (blob) {
                                      resolve({ base64: base64, blob: blob });
                                  }
                                  else {
                                      reject(new Error('Failed to create blob'));
                                  }
                              }, 'image/jpeg', quality);
                          };
                          img.onerror = reject;
                          img.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                      };
                      reader.onerror = reject;
                      reader.readAsDataURL(file);
                  })];
          });
      });
  }

  /**
   * 从数据库获取文件
   * @description 根据ID获取文件信息，支持URL生成
   */
  function getFileFromDB(dbName_1, tableName_1, fileId_1) {
      return tslib.__awaiter(this, arguments, void 0, function (dbName, tableName, fileId, options) {
          var db, transaction, store_1, error_1;
          if (options === void 0) { options = { generateUrl: true }; }
          return tslib.__generator(this, function (_a) {
              switch (_a.label) {
                  case 0:
                      _a.trys.push([0, 2, , 3]);
                      if (!dbName)
                          return [2 /*return*/, ResponseMessages.DBNAME_IS_NULL()];
                      if (!tableName)
                          return [2 /*return*/, ResponseMessages.TBNAME_IS_NULL()];
                      if (!fileId)
                          return [2 /*return*/, ResponseMessages.BASIC_ERROR('文件ID不能为空')];
                      return [4 /*yield*/, useDatabase(dbName)];
                  case 1:
                      db = _a.sent();
                      transaction = db.transaction([tableName], 'readonly');
                      store_1 = transaction.objectStore(tableName);
                      return [2 /*return*/, new Promise(function (resolve, reject) {
                              var request = store_1.get(fileId);
                              request.onsuccess = function () {
                                  var fileData = request.result;
                                  if (!fileData) {
                                      reject(ResponseMessages.BASIC_ERROR('文件不存在'));
                                      return;
                                  }
                                  // 如果需要生成新的URL
                                  if (options.generateUrl) {
                                      // 生成原始文件URL
                                      if (fileData.rawFileInfo.file) {
                                          fileData.url = URL.createObjectURL(fileData.rawFileInfo.file);
                                          fileData.rawFileInfo.url = fileData.url;
                                      }
                                      // 如果有缩略图，也生成缩略图URL
                                      if (fileData.rawFileInfo.thumbnail) {
                                          var rawBlob = dataURLtoBlob(fileData.rawFileInfo.thumbnail);
                                          fileData.rawFileInfo.thumbnailUrl = URL.createObjectURL(rawBlob);
                                      }
                                      if (fileData.handleFileInfo.thumbnail) {
                                          var handleBlob = dataURLtoBlob(fileData.handleFileInfo.thumbnail);
                                          fileData.handleFileInfo.thumbnailUrl = URL.createObjectURL(handleBlob);
                                      }
                                  }
                                  logger.debug("\u83B7\u53D6\u6587\u4EF6 ".concat(fileData.name, " \u6210\u529F"));
                                  resolve(ResponseMessages.FILE_GET_SUCCESS(fileData));
                              };
                              request.onerror = function () {
                                  logger.error('获取文件失败:', request.error);
                                  reject(ResponseMessages.FILE_GET_ERROR(request.error));
                              };
                          })];
                  case 2:
                      error_1 = _a.sent();
                      logger.error('获取文件失败:', error_1);
                      return [2 /*return*/, ResponseMessages.FILE_GET_ERROR(error_1)];
                  case 3: return [2 /*return*/];
              }
          });
      });
  }
  // base64转Blob
  function dataURLtoBlob(dataURL) {
      var _a;
      var arr = dataURL.split(',');
      var mime = (_a = arr[0].match(/:(.*?);/)) === null || _a === void 0 ? void 0 : _a[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
  }

  /**
   * 获取所有文件
   * @description 支持分页和URL生成
   */
  function getAllFiles(dbName_1, tableName_1) {
      return tslib.__awaiter(this, arguments, void 0, function (dbName, tableName, options) {
          var db, transaction, store_1, error_1;
          if (options === void 0) { options = {
              generateUrl: true,
              page: 1,
              pageSize: 10
          }; }
          return tslib.__generator(this, function (_a) {
              switch (_a.label) {
                  case 0:
                      _a.trys.push([0, 2, , 3]);
                      if (!dbName)
                          return [2 /*return*/, ResponseMessages.DBNAME_IS_NULL()];
                      if (!tableName)
                          return [2 /*return*/, ResponseMessages.TBNAME_IS_NULL()];
                      return [4 /*yield*/, useDatabase(dbName)];
                  case 1:
                      db = _a.sent();
                      transaction = db.transaction([tableName], 'readonly');
                      store_1 = transaction.objectStore(tableName);
                      return [2 /*return*/, new Promise(function (resolve, reject) {
                              var request = store_1.getAll();
                              request.onsuccess = function () {
                                  var files = request.result;
                                  // 处理分页
                                  if (options.page && options.pageSize) {
                                      var start = (options.page - 1) * options.pageSize;
                                      var end = start + options.pageSize;
                                      files = files.slice(start, end);
                                  }
                                  // 处理文件数据
                                  files = files.map(function (fileData) {
                                      // 如果需要生成URL
                                      if (options.generateUrl) {
                                          // 生成原始文件URL
                                          if (fileData.rawFileInfo.file) {
                                              fileData.url = URL.createObjectURL(fileData.rawFileInfo.file);
                                              fileData.rawFileInfo.url = fileData.url;
                                          }
                                          // 如果有缩略图，生成缩略图URL
                                          if (fileData.rawFileInfo.thumbnail) {
                                              var rawBlob = dataURLtoBlob$1(fileData.rawFileInfo.thumbnail);
                                              fileData.rawFileInfo.thumbnailUrl = URL.createObjectURL(rawBlob);
                                          }
                                          if (fileData.handleFileInfo.thumbnail) {
                                              var handleBlob = dataURLtoBlob$1(fileData.handleFileInfo.thumbnail);
                                              fileData.handleFileInfo.thumbnailUrl = URL.createObjectURL(handleBlob);
                                          }
                                      }
                                      return fileData;
                                  });
                                  logger.debug("\u83B7\u53D6\u5230 ".concat(files.length, " \u4E2A\u6587\u4EF6"));
                                  resolve(ResponseMessages.FILE_GET_SUCCESS(files));
                              };
                              request.onerror = function () {
                                  logger.error('获取文件列表失败:', request.error);
                                  reject(ResponseMessages.FILE_GET_ERROR(request.error));
                              };
                          })];
                  case 2:
                      error_1 = _a.sent();
                      logger.error('获取文件列表失败:', error_1);
                      return [2 /*return*/, ResponseMessages.FILE_GET_ERROR(error_1)];
                  case 3: return [2 /*return*/];
              }
          });
      });
  }
  // base64转Blob
  function dataURLtoBlob$1(dataURL) {
      var _a;
      var arr = dataURL.split(',');
      var mime = (_a = arr[0].match(/:(.*?);/)) === null || _a === void 0 ? void 0 : _a[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
  }

  /**
   * 下载单个文件
   * @description 从数据库获取并下载文件，支持原始文件和处理后的文件
   */
  function downloadFileFromDB(dbName_1, tableName_1, fileId_1) {
      return tslib.__awaiter(this, arguments, void 0, function (dbName, tableName, fileId, options) {
          var result, fileData, fileInfo, file, url, a, error_1;
          if (options === void 0) { options = { type: 'raw' }; }
          return tslib.__generator(this, function (_a) {
              switch (_a.label) {
                  case 0:
                      _a.trys.push([0, 2, , 3]);
                      return [4 /*yield*/, getFileFromDB(dbName, tableName, fileId)
                          // console.log(result);
                      ];
                  case 1:
                      result = _a.sent();
                      // console.log(result);
                      if (result.code !== 200) {
                          return [2 /*return*/, result];
                      }
                      fileData = result.result;
                      fileInfo = options.type === 'handled' ? fileData.handleFileInfo : fileData.rawFileInfo;
                      file = fileInfo.file || fileInfo.blob;
                      // console.log(file);
                      if (!file) {
                          return [2 /*return*/, ResponseMessages.FILE_GET_ERROR('文件数据不存在')];
                      }
                      url = URL.createObjectURL(file);
                      a = document.createElement('a');
                      a.href = url;
                      a.download = options.fileName || fileInfo.name;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                      logger.debug("\u6587\u4EF6 ".concat(fileInfo.name, " \u4E0B\u8F7D\u6210\u529F"));
                      return [2 /*return*/, ResponseMessages.FILE_GET_SUCCESS(fileData)];
                  case 2:
                      error_1 = _a.sent();
                      logger.error('下载文件失败:', error_1);
                      return [2 /*return*/, ResponseMessages.FILE_GET_ERROR(error_1)];
                  case 3: return [2 /*return*/];
              }
          });
      });
  }

  /**
   * 批量下载文件
   * @description 支持打包下载多个文件，可选择原始文件或处理后的文件
   */
  function downloadAllFiles(dbName_1, tableName_1) {
      return tslib.__awaiter(this, arguments, void 0, function (dbName, tableName, options) {
          var result, files, fileInfo, file, url_1, a_1, zip_1, zipBlob, url, a, error_1;
          if (options === void 0) { options = { type: 'raw' }; }
          return tslib.__generator(this, function (_a) {
              switch (_a.label) {
                  case 0:
                      _a.trys.push([0, 3, , 4]);
                      return [4 /*yield*/, getAllFiles(dbName, tableName)];
                  case 1:
                      result = _a.sent();
                      if (result.code !== 200) {
                          return [2 /*return*/, result];
                      }
                      files = result.result;
                      if (!files.length) {
                          return [2 /*return*/, ResponseMessages.BASIC_ERROR('没有可下载的文件')];
                      }
                      // 如果只有一个文件，直接下载
                      if (files.length === 1) {
                          fileInfo = options.type === 'handled' ? files[0].handleFileInfo : files[0].rawFileInfo;
                          file = fileInfo.file || fileInfo.blob;
                          if (!file) {
                              return [2 /*return*/, ResponseMessages.FILE_GET_ERROR('文件数据不存在')];
                          }
                          url_1 = URL.createObjectURL(file);
                          a_1 = document.createElement('a');
                          a_1.href = url_1;
                          a_1.download = fileInfo.name;
                          document.body.appendChild(a_1);
                          a_1.click();
                          document.body.removeChild(a_1);
                          URL.revokeObjectURL(url_1);
                          logger.debug("\u6587\u4EF6 ".concat(fileInfo.name, " \u4E0B\u8F7D\u6210\u529F"));
                          return [2 /*return*/, ResponseMessages.FILE_GET_SUCCESS(files[0])];
                      }
                      zip_1 = new JSZip();
                      files.forEach(function (fileData) {
                          var fileInfo = options.type === 'handled' ? fileData.handleFileInfo : fileData.rawFileInfo;
                          var file = fileInfo.file || fileInfo.blob;
                          if (file) {
                              zip_1.file(fileInfo.name, file);
                          }
                      });
                      return [4 /*yield*/, zip_1.generateAsync({ type: 'blob' })];
                  case 2:
                      zipBlob = _a.sent();
                      url = URL.createObjectURL(zipBlob);
                      a = document.createElement('a');
                      a.href = url;
                      a.download = options.zipName || "files_".concat(Date.now(), ".zip");
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                      logger.debug("".concat(files.length, " \u4E2A\u6587\u4EF6\u6253\u5305\u4E0B\u8F7D\u6210\u529F"));
                      return [2 /*return*/, ResponseMessages.FILE_GET_SUCCESS(files)];
                  case 3:
                      error_1 = _a.sent();
                      logger.error('批量下载文件失败:', error_1);
                      return [2 /*return*/, ResponseMessages.FILE_GET_ERROR(error_1)];
                  case 4: return [2 /*return*/];
              }
          });
      });
  }

  /**
   * 释放文件URL，避免内存泄漏
   * @param url 文件URL
   */
  function revokeFileUrl(url) {
      if (url.startsWith('blob:') || url.startsWith('data:')) {
          URL.revokeObjectURL(url);
      }
  }

  /**
   * 生成文件短标识
   */
  function generateFileShortId$1() {
      var timestamp = Date.now().toString(36);
      var random = Math.random().toString(36).substring(2, 8);
      return "".concat(timestamp, "-").concat(random);
  }
  /**
   * 创建文件下载令牌
   */
  function createFileDownloadToken(file, customName) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          var fileData, hash, hashArray, hashHex;
          return tslib.__generator(this, function (_a) {
              switch (_a.label) {
                  case 0: return [4 /*yield*/, file.arrayBuffer()];
                  case 1:
                      fileData = _a.sent();
                      return [4 /*yield*/, crypto.subtle.digest('SHA-256', fileData)];
                  case 2:
                      hash = _a.sent();
                      hashArray = Array.from(new Uint8Array(hash));
                      hashHex = hashArray.map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
                      return [2 /*return*/, "".concat(hashHex, "_").concat(customName || file.name)];
              }
          });
      });
  }

  function migrateData(fromDB_1, toDB_1) {
      return tslib.__awaiter(this, arguments, void 0, function (fromDB, toDB, options) {
          var sourceData, tables, existingTablesResult, existingTables_1, tablesToCreate, _i, tablesToCreate_1, table, targetDB, totalRecords, _loop_1, _a, sourceData_1, table, result, error_1;
          var _b;
          if (options === void 0) { options = {}; }
          return tslib.__generator(this, function (_c) {
              switch (_c.label) {
                  case 0:
                      _c.trys.push([0, 12, , 13]);
                      return [4 /*yield*/, findDBData$$1(fromDB)];
                  case 1:
                      sourceData = _c.sent();
                      console.log('源数据:', sourceData);
                      if (!sourceData || !Array.isArray(sourceData)) {
                          return [2 /*return*/, ResponseMessages.TB_MIGRATE_ERROR('源数据库为空')];
                      }
                      tables = sourceData.map(function (table) { return ({
                          name: table.tableName,
                          version: table.version || 1
                      }); });
                      if (!tables.length) {
                          return [2 /*return*/, ResponseMessages.TB_MIGRATE_ERROR('源数据库没有表')];
                      }
                      return [4 /*yield*/, getTableNames(toDB)];
                  case 2:
                      existingTablesResult = _c.sent();
                      existingTables_1 = (existingTablesResult === null || existingTablesResult === void 0 ? void 0 : existingTablesResult.result) || [];
                      tablesToCreate = tables.filter(function (table) { return !existingTables_1.includes(table.name); });
                      if (!(tablesToCreate.length > 0)) return [3 /*break*/, 6];
                      logger.debug("\u9700\u8981\u521B\u5EFA ".concat(tablesToCreate.length, " \u4E2A\u8868"));
                      _i = 0, tablesToCreate_1 = tablesToCreate;
                      _c.label = 3;
                  case 3:
                      if (!(_i < tablesToCreate_1.length)) return [3 /*break*/, 6];
                      table = tablesToCreate_1[_i];
                      return [4 /*yield*/, createTable$$1(toDB, table.name, { version: table.version })];
                  case 4:
                      _c.sent();
                      logger.debug("\u8868 ".concat(table.name, " \u521B\u5EFA\u6210\u529F"));
                      _c.label = 5;
                  case 5:
                      _i++;
                      return [3 /*break*/, 3];
                  case 6: return [4 /*yield*/, useDatabase(toDB)
                      // 6. 遍历每个表进行数据迁移
                  ];
                  case 7:
                      targetDB = _c.sent();
                      totalRecords = 0;
                      _loop_1 = function (table) {
                          var tableName, tableData, transaction, store_1, error_2;
                          return tslib.__generator(this, function (_d) {
                              switch (_d.label) {
                                  case 0:
                                      _d.trys.push([0, 4, , 5]);
                                      tableName = table.tableName;
                                      // 读取阶段
                                      if (options.onProgress) {
                                          options.onProgress({
                                              phase: 'reading',
                                              current: sourceData.indexOf(table),
                                              total: sourceData.length,
                                              percentage: Math.round((sourceData.indexOf(table) / sourceData.length) * 100),
                                              message: "\u6B63\u5728\u8BFB\u53D6\u8868 ".concat(tableName, " \u7684\u6570\u636E")
                                          });
                                      }
                                      tableData = ((_b = table.children) === null || _b === void 0 ? void 0 : _b.result) || [];
                                      if (!Array.isArray(tableData)) {
                                          logger.warn("\u8868 ".concat(tableName, " \u7684\u6570\u636E\u4E0D\u662F\u6570\u7EC4\uFF0C\u8DF3\u8FC7"));
                                          return [2 /*return*/, "continue"];
                                      }
                                      // 数据转换
                                      if (options.transform) {
                                          tableData = options.transform(tableData);
                                      }
                                      // 写入阶段
                                      if (options.onProgress) {
                                          options.onProgress({
                                              phase: 'writing',
                                              current: sourceData.indexOf(table),
                                              total: sourceData.length,
                                              percentage: Math.round((sourceData.indexOf(table) / sourceData.length) * 100),
                                              message: "\u6B63\u5728\u5199\u5165\u8868 ".concat(tableName, " \u7684\u6570\u636E")
                                          });
                                      }
                                      transaction = targetDB.transaction(tableName, 'readwrite');
                                      store_1 = transaction.objectStore(tableName);
                                      if (!options.overwrite) return [3 /*break*/, 2];
                                      return [4 /*yield*/, new Promise(function (resolve, reject) {
                                              var request = store_1.clear();
                                              request.onsuccess = function () { return resolve(undefined); };
                                              request.onerror = function () { return reject(request.error); };
                                          })];
                                  case 1:
                                      _d.sent();
                                      _d.label = 2;
                                  case 2: 
                                  // 批量写入数据
                                  return [4 /*yield*/, Promise.all(tableData.map(function (item) {
                                          return new Promise(function (resolve, reject) {
                                              var request = store_1.add(item);
                                              request.onsuccess = function () { return resolve(undefined); };
                                              request.onerror = function () { return reject(request.error); };
                                          });
                                      }))];
                                  case 3:
                                      // 批量写入数据
                                      _d.sent();
                                      totalRecords += tableData.length;
                                      logger.debug("\u8868 ".concat(tableName, " \u8FC1\u79FB\u5B8C\u6210\uFF0C\u5171\u8FC1\u79FB ").concat(tableData.length, " \u6761\u8BB0\u5F55"));
                                      return [3 /*break*/, 5];
                                  case 4:
                                      error_2 = _d.sent();
                                      logger.error("\u8FC1\u79FB\u8868 ".concat(table.tableName, " \u5931\u8D25:"), error_2);
                                      throw error_2;
                                  case 5: return [2 /*return*/];
                              }
                          });
                      };
                      _a = 0, sourceData_1 = sourceData;
                      _c.label = 8;
                  case 8:
                      if (!(_a < sourceData_1.length)) return [3 /*break*/, 11];
                      table = sourceData_1[_a];
                      return [5 /*yield**/, _loop_1(table)];
                  case 9:
                      _c.sent();
                      _c.label = 10;
                  case 10:
                      _a++;
                      return [3 /*break*/, 8];
                  case 11:
                      // 7. 关闭目标数据库连接
                      targetDB.close();
                      result = {
                          fromDB: fromDB,
                          toDB: toDB,
                          tables: tables.map(function (t) { return t.name; }),
                          totalRecords: totalRecords
                      };
                      logger.debug('数据迁移成功:', result);
                      return [2 /*return*/, ResponseMessages.TB_MIGRATE_SUCCESS(result)];
                  case 12:
                      error_1 = _c.sent();
                      logger.error('数据迁移失败:', error_1);
                      return [2 /*return*/, ResponseMessages.TB_MIGRATE_ERROR(error_1)];
                  case 13: return [2 /*return*/];
              }
          });
      });
  }

  function exportToJson(dbName_1) {
      return tslib.__awaiter(this, arguments, void 0, function (dbName, options) {
          var _a, pretty, _b, download, _c, fileName, sourceData, exportData, jsonString, blob, url, a, error_1;
          if (options === void 0) { options = {}; }
          return tslib.__generator(this, function (_d) {
              switch (_d.label) {
                  case 0:
                      _d.trys.push([0, 2, , 3]);
                      _a = options.pretty, pretty = _a === void 0 ? false : _a, _b = options.download, download = _b === void 0 ? true : _b, _c = options.fileName, fileName = _c === void 0 ? "".concat(dbName, "_export.json") : _c;
                      return [4 /*yield*/, findDBData$$1(dbName)];
                  case 1:
                      sourceData = _d.sent();
                      console.log(sourceData);
                      if (!sourceData || !Array.isArray(sourceData)) {
                          return [2 /*return*/, ResponseMessages.JSON_EXPORT_ERROR('数据库为空')];
                      }
                      exportData = {
                          database: dbName,
                          exportedAt: new Date().toISOString(),
                          tables: sourceData.map(function (table) { return table.tableName; }),
                          data: sourceData.reduce(function (acc, table) {
                              var _a;
                              acc[table.tableName] = ((_a = table.children) === null || _a === void 0 ? void 0 : _a.result) || [];
                              return acc;
                          }, {})
                      };
                      jsonString = pretty
                          ? JSON.stringify(exportData, null, 2)
                          : JSON.stringify(exportData);
                      // 如果需要下载
                      if (download) {
                          blob = new Blob([jsonString], { type: 'application/json' });
                          url = URL.createObjectURL(blob);
                          a = document.createElement('a');
                          a.href = url;
                          a.download = fileName;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                      }
                      return [2 /*return*/, ResponseMessages.JSON_EXPORT_SUCCESS({
                              data: jsonString,
                              tables: exportData.tables,
                              totalTables: exportData.tables.length,
                              fileName: download ? fileName : undefined
                          })];
                  case 2:
                      error_1 = _d.sent();
                      logger.error('导出JSON失败:', error_1);
                      return [2 /*return*/, ResponseMessages.JSON_EXPORT_ERROR(error_1)];
                  case 3: return [2 /*return*/];
              }
          });
      });
  }

  function importFromJson(dbName_1, jsonData_1) {
      return tslib.__awaiter(this, arguments, void 0, function (dbName, jsonData, options) {
          var _a, overwrite, onProgress, importData, tables, data, db, totalRecords, _loop_1, _i, _b, _c, tableName, tableData, error_1;
          if (options === void 0) { options = {}; }
          return tslib.__generator(this, function (_d) {
              switch (_d.label) {
                  case 0:
                      _d.trys.push([0, 6, , 7]);
                      _a = options.overwrite, overwrite = _a === void 0 ? false : _a, onProgress = options.onProgress;
                      importData = JSON.parse(jsonData);
                      tables = importData.tables, data = importData.data;
                      if (!tables || !data) {
                          throw new Error('无效的JSON数据格式');
                      }
                      return [4 /*yield*/, useDatabase(dbName)];
                  case 1:
                      db = _d.sent();
                      totalRecords = 0;
                      _loop_1 = function (tableName, tableData) {
                          var transaction, store_1, error_2;
                          return tslib.__generator(this, function (_e) {
                              switch (_e.label) {
                                  case 0:
                                      _e.trys.push([0, 7, , 8]);
                                      // 进度通知 - 准备阶段
                                      if (onProgress) {
                                          onProgress({
                                              phase: 'preparing',
                                              current: tables.indexOf(tableName),
                                              total: tables.length,
                                              percentage: Math.round((tables.indexOf(tableName) / tables.length) * 100),
                                              message: "\u6B63\u5728\u51C6\u5907\u5BFC\u5165\u8868 ".concat(tableName)
                                          });
                                      }
                                      if (!!db.objectStoreNames.contains(tableName)) return [3 /*break*/, 2];
                                      return [4 /*yield*/, createTable$$1(dbName, tableName)];
                                  case 1:
                                      _e.sent();
                                      _e.label = 2;
                                  case 2:
                                      transaction = db.transaction(tableName, 'readwrite');
                                      store_1 = transaction.objectStore(tableName);
                                      if (!overwrite) return [3 /*break*/, 4];
                                      return [4 /*yield*/, new Promise(function (resolve, reject) {
                                              var request = store_1.clear();
                                              request.onsuccess = function () { return resolve(undefined); };
                                              request.onerror = function () { return reject(request.error); };
                                          })];
                                  case 3:
                                      _e.sent();
                                      _e.label = 4;
                                  case 4:
                                      if (!Array.isArray(tableData)) return [3 /*break*/, 6];
                                      return [4 /*yield*/, Promise.all(tableData.map(function (item) {
                                              return new Promise(function (resolve, reject) {
                                                  var request = store_1.add(item);
                                                  request.onsuccess = function () { return resolve(undefined); };
                                                  request.onerror = function () { return reject(request.error); };
                                              });
                                          }))];
                                  case 5:
                                      _e.sent();
                                      totalRecords += tableData.length;
                                      _e.label = 6;
                                  case 6:
                                      // 进度通知 - 导入阶段
                                      if (onProgress) {
                                          onProgress({
                                              phase: 'importing',
                                              current: tables.indexOf(tableName) + 1,
                                              total: tables.length,
                                              percentage: Math.round(((tables.indexOf(tableName) + 1) / tables.length) * 100),
                                              message: "\u8868 ".concat(tableName, " \u5BFC\u5165\u5B8C\u6210")
                                          });
                                      }
                                      return [3 /*break*/, 8];
                                  case 7:
                                      error_2 = _e.sent();
                                      logger.error("\u5BFC\u5165\u8868 ".concat(tableName, " \u5931\u8D25:"), error_2);
                                      throw error_2;
                                  case 8: return [2 /*return*/];
                              }
                          });
                      };
                      _i = 0, _b = Object.entries(data);
                      _d.label = 2;
                  case 2:
                      if (!(_i < _b.length)) return [3 /*break*/, 5];
                      _c = _b[_i], tableName = _c[0], tableData = _c[1];
                      return [5 /*yield**/, _loop_1(tableName, tableData)];
                  case 3:
                      _d.sent();
                      _d.label = 4;
                  case 4:
                      _i++;
                      return [3 /*break*/, 2];
                  case 5: return [2 /*return*/, ResponseMessages.JSON_IMPORT_SUCCESS({
                          tables: tables,
                          totalRecords: totalRecords
                      })];
                  case 6:
                      error_1 = _d.sent();
                      logger.error('导入JSON失败:', error_1);
                      return [2 /*return*/, ResponseMessages.JSON_IMPORT_ERROR(error_1)];
                  case 7: return [2 /*return*/];
              }
          });
      });
  }

  // 从 core/index.ts 导入所有核心功能

  exports.useDatabase = useDatabase;
  exports.deleteTable = deleteTable;
  exports.deleteDatabase = deleteDatabase;
  exports.deleteAllDatabases = deleteAllDatabases;
  exports.closeAllConnections = closeAllConnections$1;
  exports.getTableNames = getTableNames;
  exports.deleteAllTables = deleteAllTables$$1;
  exports.createTable = createTable$$1;
  exports.insertOne = insertOne$$1;
  exports.insertMany = insertMany$$1;
  exports.findDBData = findDBData$$1;
  exports.findByKey = findByKey$$1;
  exports.findByIndex = findByIndex$$1;
  exports.deleteOneByPk = deleteOneByPk$$1;
  exports.deleteOneByIndex = deleteOneByIndex$$1;
  exports.deleteManyByPK = deleteManyByPK$$1;
  exports.deleteManyByIndex = deleteManyByIndex$$1;
  exports.updateDataByPrimaryKey = updateDataByPrimaryKey$$1;
  exports.updateDataByIndex = updateDataByIndex$$1;
  exports.createQuery = createQuery;
  exports.saveFilesToDB = saveFilesToDB;
  exports.getFileFromDB = getFileFromDB;
  exports.getAllFiles = getAllFiles;
  exports.downloadFileFromDB = downloadFileFromDB;
  exports.downloadAllFiles = downloadAllFiles;
  exports.revokeFileUrl = revokeFileUrl;
  exports.generateFileShortId = generateFileShortId$1;
  exports.createFileDownloadToken = createFileDownloadToken;
  exports.migrateData = migrateData;
  exports.exportToJson = exportToJson;
  exports.importFromJson = importFromJson;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=indexeddb-toolkit.umd.js.map
