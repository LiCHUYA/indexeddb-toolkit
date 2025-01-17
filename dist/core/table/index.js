"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDataByIndex = exports.updateDataByPrimaryKey = exports.deleteManyByIndex = exports.deleteManyByPK = exports.deleteOneByIndex = exports.deleteOneByPk = exports.findByIndex = exports.findByKey = exports.findDBData = exports.insertMany = exports.insertOne = exports.createTable = void 0;
var tslib_1 = require("tslib");
var createTable_1 = require("./createTable");
Object.defineProperty(exports, "createTable", { enumerable: true, get: function () { return tslib_1.__importDefault(createTable_1).default; } });
var insertOne_1 = require("./insertOne");
Object.defineProperty(exports, "insertOne", { enumerable: true, get: function () { return tslib_1.__importDefault(insertOne_1).default; } });
var insertMany_1 = require("./insertMany");
Object.defineProperty(exports, "insertMany", { enumerable: true, get: function () { return tslib_1.__importDefault(insertMany_1).default; } });
var findDBData_1 = require("./findDBData");
Object.defineProperty(exports, "findDBData", { enumerable: true, get: function () { return tslib_1.__importDefault(findDBData_1).default; } });
var findByKey_1 = require("./findByKey");
Object.defineProperty(exports, "findByKey", { enumerable: true, get: function () { return tslib_1.__importDefault(findByKey_1).default; } });
var findByIndex_1 = require("./findByIndex");
Object.defineProperty(exports, "findByIndex", { enumerable: true, get: function () { return tslib_1.__importDefault(findByIndex_1).default; } });
var deleteOneByPk_1 = require("./deleteOneByPk");
Object.defineProperty(exports, "deleteOneByPk", { enumerable: true, get: function () { return tslib_1.__importDefault(deleteOneByPk_1).default; } });
var deleteOneByIndex_1 = require("./deleteOneByIndex");
Object.defineProperty(exports, "deleteOneByIndex", { enumerable: true, get: function () { return tslib_1.__importDefault(deleteOneByIndex_1).default; } });
var deleteManyByPK_1 = require("./deleteManyByPK");
Object.defineProperty(exports, "deleteManyByPK", { enumerable: true, get: function () { return tslib_1.__importDefault(deleteManyByPK_1).default; } });
var deleteManyByIndex_1 = require("./deleteManyByIndex");
Object.defineProperty(exports, "deleteManyByIndex", { enumerable: true, get: function () { return tslib_1.__importDefault(deleteManyByIndex_1).default; } });
var updateDataByPrimaryKey_1 = require("./updateDataByPrimaryKey");
Object.defineProperty(exports, "updateDataByPrimaryKey", { enumerable: true, get: function () { return tslib_1.__importDefault(updateDataByPrimaryKey_1).default; } });
var updateDataByIndex_1 = require("./updateDataByIndex");
Object.defineProperty(exports, "updateDataByIndex", { enumerable: true, get: function () { return tslib_1.__importDefault(updateDataByIndex_1).default; } });
//# sourceMappingURL=index.js.map