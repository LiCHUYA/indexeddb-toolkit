"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constant_1 = tslib_1.__importDefault(require("../constant"));
/**
 * 获取所有数据库实例
 * @returns {Promise<{status: number, message: string, data: any[]}>} Promise对象，包含所有数据库实例的数组
 */
function getAllDB() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var res, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, indexedDB.databases()];
                case 1:
                    res = _a.sent();
                    if (Array.isArray(res)) {
                        return [2 /*return*/, constant_1.default.GET_ALL_DBS_SUCCESS(res)];
                    }
                    else {
                        return [2 /*return*/, constant_1.default.DB_NOTFOUND()];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, constant_1.default.BASIC_ERROR(error_1)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = getAllDB;
//# sourceMappingURL=getAllDB.js.map