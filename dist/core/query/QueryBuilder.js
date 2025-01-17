"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
var tslib_1 = require("tslib");
var index_1 = require("../index");
var constant_1 = tslib_1.__importDefault(require("../../constant"));
var logger_1 = require("../../utils/logger");
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var db, transaction, store_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, index_1.useDatabase)(this.dbName)];
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
                                        resolve(constant_1.default.TB_SELECT_SUCCESS(results));
                                    }
                                    catch (error) {
                                        reject(constant_1.default.TB_SELECT_ERROR(error));
                                    }
                                };
                                request.onerror = function () {
                                    reject(constant_1.default.TB_SELECT_ERROR(request.error));
                                };
                            })];
                    case 2:
                        error_1 = _a.sent();
                        logger_1.logger.error('Query execution failed:', error_1);
                        return [2 /*return*/, constant_1.default.TB_SELECT_ERROR(error_1)];
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
        return tslib_1.__spreadArray([], results, true).sort(function (a, b) {
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
exports.QueryBuilder = QueryBuilder;
//# sourceMappingURL=QueryBuilder.js.map