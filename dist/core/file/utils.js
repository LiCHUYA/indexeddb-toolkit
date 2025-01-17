"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFileShortId = generateFileShortId;
exports.createFileDownloadToken = createFileDownloadToken;
var tslib_1 = require("tslib");
/**
 * 生成文件短标识
 */
function generateFileShortId() {
    var timestamp = Date.now().toString(36);
    var random = Math.random().toString(36).substring(2, 8);
    return "".concat(timestamp, "-").concat(random);
}
/**
 * 创建文件下载令牌
 */
function createFileDownloadToken(file, customName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var fileData, hash, hashArray, hashHex;
        return tslib_1.__generator(this, function (_a) {
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
//# sourceMappingURL=utils.js.map