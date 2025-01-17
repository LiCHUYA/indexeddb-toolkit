"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constant_1 = tslib_1.__importDefault(require("../../constant"));
var getFileFromDB_1 = tslib_1.__importDefault(require("./getFileFromDB"));
var logger_1 = require("../../utils/logger");
/**
 * 下载单个文件
 * @description 从数据库获取并下载文件，支持原始文件和处理后的文件
 */
function downloadFileFromDB(dbName_1, tableName_1, fileId_1) {
    return tslib_1.__awaiter(this, arguments, void 0, function (dbName, tableName, fileId, options) {
        var result, fileData, fileInfo, file, url, a, error_1;
        if (options === void 0) { options = { type: 'raw' }; }
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, getFileFromDB_1.default)(dbName, tableName, fileId)
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
                        return [2 /*return*/, constant_1.default.FILE_GET_ERROR('文件数据不存在')];
                    }
                    url = URL.createObjectURL(file);
                    a = document.createElement('a');
                    a.href = url;
                    a.download = options.fileName || fileInfo.name;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    logger_1.logger.debug("\u6587\u4EF6 ".concat(fileInfo.name, " \u4E0B\u8F7D\u6210\u529F"));
                    return [2 /*return*/, constant_1.default.FILE_GET_SUCCESS(fileData)];
                case 2:
                    error_1 = _a.sent();
                    logger_1.logger.error('下载文件失败:', error_1);
                    return [2 /*return*/, constant_1.default.FILE_GET_ERROR(error_1)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = downloadFileFromDB;
//# sourceMappingURL=downloadFileFromDB.js.map