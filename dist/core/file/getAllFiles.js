"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constant_1 = tslib_1.__importDefault(require("../../constant"));
var index_1 = require("../index");
var logger_1 = require("../../utils/logger");
/**
 * 获取所有文件
 * @description 支持分页和URL生成
 */
function getAllFiles(dbName_1, tableName_1) {
    return tslib_1.__awaiter(this, arguments, void 0, function (dbName, tableName, options) {
        var db, transaction, store_1, error_1;
        if (options === void 0) { options = {
            generateUrl: true,
            page: 1,
            pageSize: 10
        }; }
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!dbName)
                        return [2 /*return*/, constant_1.default.DBNAME_IS_NULL()];
                    if (!tableName)
                        return [2 /*return*/, constant_1.default.TBNAME_IS_NULL()];
                    return [4 /*yield*/, (0, index_1.useDatabase)(dbName)];
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
                                            var rawBlob = dataURLtoBlob(fileData.rawFileInfo.thumbnail);
                                            fileData.rawFileInfo.thumbnailUrl = URL.createObjectURL(rawBlob);
                                        }
                                        if (fileData.handleFileInfo.thumbnail) {
                                            var handleBlob = dataURLtoBlob(fileData.handleFileInfo.thumbnail);
                                            fileData.handleFileInfo.thumbnailUrl = URL.createObjectURL(handleBlob);
                                        }
                                    }
                                    return fileData;
                                });
                                logger_1.logger.debug("\u83B7\u53D6\u5230 ".concat(files.length, " \u4E2A\u6587\u4EF6"));
                                resolve(constant_1.default.FILE_GET_SUCCESS(files));
                            };
                            request.onerror = function () {
                                logger_1.logger.error('获取文件列表失败:', request.error);
                                reject(constant_1.default.FILE_GET_ERROR(request.error));
                            };
                        })];
                case 2:
                    error_1 = _a.sent();
                    logger_1.logger.error('获取文件列表失败:', error_1);
                    return [2 /*return*/, constant_1.default.FILE_GET_ERROR(error_1)];
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
exports.default = getAllFiles;
//# sourceMappingURL=getAllFiles.js.map