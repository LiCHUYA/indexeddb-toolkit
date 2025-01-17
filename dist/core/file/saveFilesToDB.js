"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constant_1 = tslib_1.__importDefault(require("../../constant"));
var index_1 = require("../index");
var logger_1 = require("../../utils/logger");
var helper_1 = require("../../helper");
var table_1 = require("../table");
/**
 * 保存文件到数据库
 * @description 自动检查并创建数据库表，然后保存文件。支持图片缩略图、文件压缩等处理。
 */
function saveFilesToDB(dbName_1, tableName_1, file_1) {
    return tslib_1.__awaiter(this, arguments, void 0, function (dbName, tableName, file, options) {
        var exists, now, fileShortId, downloadToken, baseInfo, fileData_1, dimensions, imageInfo, rawThumbnail, compressedThumbnail, error_1, db, transaction, store_1, error_2;
        if (options === void 0) { options = {
            generateUrl: true,
            generateThumbnail: false,
            thumbnailSize: 100
        }; }
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 11, , 12]);
                    // 参数验证
                    if (!dbName)
                        return [2 /*return*/, constant_1.default.DBNAME_IS_NULL()];
                    if (!tableName)
                        return [2 /*return*/, constant_1.default.TBNAME_IS_NULL()];
                    if (!file)
                        return [2 /*return*/, constant_1.default.BASIC_ERROR('文件不能为空')
                            // 检查表是否存在，不存在则创建
                        ];
                    return [4 /*yield*/, (0, helper_1.isTableExist)(dbName, tableName)];
                case 1:
                    exists = _a.sent();
                    if (!!exists) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, table_1.createTable)(dbName, tableName, {
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
                        rawFileInfo: tslib_1.__assign(tslib_1.__assign({}, baseInfo), { file: file, blob: file, url: URL.createObjectURL(file) }),
                        handleFileInfo: tslib_1.__assign(tslib_1.__assign({}, baseInfo), { url: URL.createObjectURL(file) })
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
                    logger_1.logger.warn('生成缩略图失败:', error_1);
                    return [3 /*break*/, 9];
                case 9: return [4 /*yield*/, (0, index_1.useDatabase)(dbName)];
                case 10:
                    db = _a.sent();
                    transaction = db.transaction([tableName], 'readwrite');
                    store_1 = transaction.objectStore(tableName);
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var request = store_1.add(fileData_1);
                            request.onsuccess = function () {
                                logger_1.logger.debug("\u6587\u4EF6 ".concat(file.name, " \u4FDD\u5B58\u6210\u529F"));
                                resolve(constant_1.default.FILE_SAVE_SUCCESS(request.result));
                            };
                            request.onerror = function () {
                                logger_1.logger.error("\u4FDD\u5B58\u6587\u4EF6 ".concat(file.name, " \u5931\u8D25:"), request.error);
                                reject(constant_1.default.FILE_SAVE_ERROR(request.error));
                            };
                        })];
                case 11:
                    error_2 = _a.sent();
                    logger_1.logger.error('保存文件失败:', error_2);
                    return [2 /*return*/, constant_1.default.FILE_SAVE_ERROR(error_2)];
                case 12: return [2 /*return*/];
            }
        });
    });
}
// 获取图片尺寸
function getImageDimensions(file) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
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
    return tslib_1.__awaiter(this, arguments, void 0, function (file, size, compress) {
        if (compress === void 0) { compress = false; }
        return tslib_1.__generator(this, function (_a) {
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
exports.default = saveFilesToDB;
//# sourceMappingURL=saveFilesToDB.js.map