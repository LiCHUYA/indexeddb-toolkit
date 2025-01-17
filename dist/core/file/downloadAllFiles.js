"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constant_1 = tslib_1.__importDefault(require("../../constant"));
var getAllFiles_1 = tslib_1.__importDefault(require("./getAllFiles"));
var logger_1 = require("../../utils/logger");
var jszip_1 = tslib_1.__importDefault(require("jszip"));
/**
 * 批量下载文件
 * @description 支持打包下载多个文件，可选择原始文件或处理后的文件
 */
function downloadAllFiles(dbName_1, tableName_1) {
    return tslib_1.__awaiter(this, arguments, void 0, function (dbName, tableName, options) {
        var result, files, fileInfo, file, url_1, a_1, zip_1, zipBlob, url, a, error_1;
        if (options === void 0) { options = { type: 'raw' }; }
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, getAllFiles_1.default)(dbName, tableName)];
                case 1:
                    result = _a.sent();
                    if (result.code !== 200) {
                        return [2 /*return*/, result];
                    }
                    files = result.result;
                    if (!files.length) {
                        return [2 /*return*/, constant_1.default.BASIC_ERROR('没有可下载的文件')];
                    }
                    // 如果只有一个文件，直接下载
                    if (files.length === 1) {
                        fileInfo = options.type === 'handled' ? files[0].handleFileInfo : files[0].rawFileInfo;
                        file = fileInfo.file || fileInfo.blob;
                        if (!file) {
                            return [2 /*return*/, constant_1.default.FILE_GET_ERROR('文件数据不存在')];
                        }
                        url_1 = URL.createObjectURL(file);
                        a_1 = document.createElement('a');
                        a_1.href = url_1;
                        a_1.download = fileInfo.name;
                        document.body.appendChild(a_1);
                        a_1.click();
                        document.body.removeChild(a_1);
                        URL.revokeObjectURL(url_1);
                        logger_1.logger.debug("\u6587\u4EF6 ".concat(fileInfo.name, " \u4E0B\u8F7D\u6210\u529F"));
                        return [2 /*return*/, constant_1.default.FILE_GET_SUCCESS(files[0])];
                    }
                    zip_1 = new jszip_1.default();
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
                    logger_1.logger.debug("".concat(files.length, " \u4E2A\u6587\u4EF6\u6253\u5305\u4E0B\u8F7D\u6210\u529F"));
                    return [2 /*return*/, constant_1.default.FILE_GET_SUCCESS(files)];
                case 3:
                    error_1 = _a.sent();
                    logger_1.logger.error('批量下载文件失败:', error_1);
                    return [2 /*return*/, constant_1.default.FILE_GET_ERROR(error_1)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.default = downloadAllFiles;
//# sourceMappingURL=downloadAllFiles.js.map