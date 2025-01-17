"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constant_1 = tslib_1.__importDefault(require("../../constant"));
var index_1 = require("../index");
var logger_1 = require("../../utils/logger");
function exportToJson(dbName_1) {
    return tslib_1.__awaiter(this, arguments, void 0, function (dbName, options) {
        var _a, pretty, _b, download, _c, fileName, sourceData, exportData, jsonString, blob, url, a, error_1;
        if (options === void 0) { options = {}; }
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    _a = options.pretty, pretty = _a === void 0 ? false : _a, _b = options.download, download = _b === void 0 ? true : _b, _c = options.fileName, fileName = _c === void 0 ? "".concat(dbName, "_export.json") : _c;
                    return [4 /*yield*/, (0, index_1.findDBData)(dbName)];
                case 1:
                    sourceData = _d.sent();
                    console.log(sourceData);
                    if (!sourceData || !Array.isArray(sourceData)) {
                        return [2 /*return*/, constant_1.default.JSON_EXPORT_ERROR('数据库为空')];
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
                    return [2 /*return*/, constant_1.default.JSON_EXPORT_SUCCESS({
                            data: jsonString,
                            tables: exportData.tables,
                            totalTables: exportData.tables.length,
                            fileName: download ? fileName : undefined
                        })];
                case 2:
                    error_1 = _d.sent();
                    logger_1.logger.error('导出JSON失败:', error_1);
                    return [2 /*return*/, constant_1.default.JSON_EXPORT_ERROR(error_1)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = exportToJson;
//# sourceMappingURL=exportToJson.js.map