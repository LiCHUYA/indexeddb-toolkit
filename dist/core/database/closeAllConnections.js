"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * 关闭所有数据库连接
 */
function closeAllConnections() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var databases;
        var _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, ((_b = (_a = window.indexedDB).databases) === null || _b === void 0 ? void 0 : _b.call(_a))];
                case 1:
                    databases = (_c.sent()) || [];
                    // 关闭每个数据库连接
                    databases.forEach(function (db) {
                        if (db.name) {
                            var request = window.indexedDB.open(db.name);
                            request.onsuccess = function (event) {
                                var db = event.target.result;
                                db.close();
                            };
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = closeAllConnections;
//# sourceMappingURL=closeAllConnections.js.map