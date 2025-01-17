"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * 关闭所有数据库连接
 */
function closeAllConnections() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var databases, _i, databases_1, db, request, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, window.indexedDB.databases()];
                case 1:
                    databases = _a.sent();
                    // 关闭每个数据库连接
                    for (_i = 0, databases_1 = databases; _i < databases_1.length; _i++) {
                        db = databases_1[_i];
                        if (db.name) {
                            request = window.indexedDB.open(db.name);
                            request.onsuccess = function (event) {
                                var database = event.target.result;
                                database.close();
                            };
                        }
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error closing database connections:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = closeAllConnections;
//# sourceMappingURL=closeAllConnections.js.map