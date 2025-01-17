"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importFromJson = exports.exportToJson = exports.migrateData = exports.createFileDownloadToken = exports.generateFileShortId = exports.revokeFileUrl = exports.downloadAllFiles = exports.downloadFileFromDB = exports.getAllFiles = exports.getFileFromDB = exports.saveFilesToDB = exports.createQuery = exports.updateDataByIndex = exports.updateDataByPrimaryKey = exports.deleteManyByIndex = exports.deleteManyByPK = exports.deleteOneByIndex = exports.deleteOneByPk = exports.findByIndex = exports.findByKey = exports.findDBData = exports.insertMany = exports.insertOne = exports.createTable = exports.deleteAllTables = exports.getTableNames = exports.closeAllConnections = exports.deleteAllDatabases = exports.deleteDatabase = exports.deleteTable = exports.useDatabase = void 0;
var tslib_1 = require("tslib");
// 从 core/index.ts 导入所有核心功能
var core_1 = require("./core");
Object.defineProperty(exports, "useDatabase", { enumerable: true, get: function () { return core_1.useDatabase; } });
Object.defineProperty(exports, "deleteTable", { enumerable: true, get: function () { return core_1.deleteTable; } });
Object.defineProperty(exports, "deleteDatabase", { enumerable: true, get: function () { return core_1.deleteDatabase; } });
Object.defineProperty(exports, "deleteAllDatabases", { enumerable: true, get: function () { return core_1.deleteAllDatabases; } });
Object.defineProperty(exports, "closeAllConnections", { enumerable: true, get: function () { return core_1.closeAllConnections; } });
Object.defineProperty(exports, "getTableNames", { enumerable: true, get: function () { return core_1.getTableNames; } });
Object.defineProperty(exports, "deleteAllTables", { enumerable: true, get: function () { return core_1.deleteAllTables; } });
// 表操作
Object.defineProperty(exports, "createTable", { enumerable: true, get: function () { return core_1.createTable; } });
Object.defineProperty(exports, "insertOne", { enumerable: true, get: function () { return core_1.insertOne; } });
Object.defineProperty(exports, "insertMany", { enumerable: true, get: function () { return core_1.insertMany; } });
Object.defineProperty(exports, "findDBData", { enumerable: true, get: function () { return core_1.findDBData; } });
Object.defineProperty(exports, "findByKey", { enumerable: true, get: function () { return core_1.findByKey; } });
Object.defineProperty(exports, "findByIndex", { enumerable: true, get: function () { return core_1.findByIndex; } });
Object.defineProperty(exports, "deleteOneByPk", { enumerable: true, get: function () { return core_1.deleteOneByPk; } });
Object.defineProperty(exports, "deleteOneByIndex", { enumerable: true, get: function () { return core_1.deleteOneByIndex; } });
Object.defineProperty(exports, "deleteManyByPK", { enumerable: true, get: function () { return core_1.deleteManyByPK; } });
Object.defineProperty(exports, "deleteManyByIndex", { enumerable: true, get: function () { return core_1.deleteManyByIndex; } });
Object.defineProperty(exports, "updateDataByPrimaryKey", { enumerable: true, get: function () { return core_1.updateDataByPrimaryKey; } });
Object.defineProperty(exports, "updateDataByIndex", { enumerable: true, get: function () { return core_1.updateDataByIndex; } });
// 从 core/query 导入查询功能
var createQuery_1 = require("./core/query/createQuery");
Object.defineProperty(exports, "createQuery", { enumerable: true, get: function () { return createQuery_1.createQuery; } });
// 从 core/file 导入文件操作
var file_1 = require("./core/file");
Object.defineProperty(exports, "saveFilesToDB", { enumerable: true, get: function () { return file_1.saveFilesToDB; } });
Object.defineProperty(exports, "getFileFromDB", { enumerable: true, get: function () { return file_1.getFileFromDB; } });
Object.defineProperty(exports, "getAllFiles", { enumerable: true, get: function () { return file_1.getAllFiles; } });
Object.defineProperty(exports, "downloadFileFromDB", { enumerable: true, get: function () { return file_1.downloadFileFromDB; } });
Object.defineProperty(exports, "downloadAllFiles", { enumerable: true, get: function () { return file_1.downloadAllFiles; } });
Object.defineProperty(exports, "revokeFileUrl", { enumerable: true, get: function () { return file_1.revokeFileUrl; } });
// 从 core/file/utils 导入文件工具函数
var utils_1 = require("./core/file/utils");
Object.defineProperty(exports, "generateFileShortId", { enumerable: true, get: function () { return utils_1.generateFileShortId; } });
Object.defineProperty(exports, "createFileDownloadToken", { enumerable: true, get: function () { return utils_1.createFileDownloadToken; } });
// 从 core/migration 导入数据迁移功能
var migrateData_1 = require("./core/migration/migrateData");
Object.defineProperty(exports, "migrateData", { enumerable: true, get: function () { return tslib_1.__importDefault(migrateData_1).default; } });
// 从 core/json 导入 JSON 导入导出功能
var exportToJson_1 = require("./core/json/exportToJson");
Object.defineProperty(exports, "exportToJson", { enumerable: true, get: function () { return tslib_1.__importDefault(exportToJson_1).default; } });
var importFromJson_1 = require("./core/json/importFromJson");
Object.defineProperty(exports, "importFromJson", { enumerable: true, get: function () { return tslib_1.__importDefault(importFromJson_1).default; } });
//# sourceMappingURL=index.js.map