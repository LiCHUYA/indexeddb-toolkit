"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 释放文件URL，避免内存泄漏
 * @param url 文件URL
 */
function revokeFileUrl(url) {
    if (url.startsWith('blob:') || url.startsWith('data:')) {
        URL.revokeObjectURL(url);
    }
}
exports.default = revokeFileUrl;
//# sourceMappingURL=revokeFileUrl.js.map