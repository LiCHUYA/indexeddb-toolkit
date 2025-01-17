/**
 * 索引类型枚举
 */
export declare enum IndexType {
    UNIQUE = "unique",// 唯一索引
    MULTI_ENTRY = "multi",// 多值索引
    NORMAL = "normal"
}
/**
 * 索引配置接口
 */
interface IndexConfig {
    name: string;
    type: IndexType;
}
/**
 * 表配置选项
 */
interface TableOptions {
    primaryKey?: string;
    autoIncrement?: boolean;
    version?: number;
    indexes?: Array<string | IndexConfig>;
    timeout?: number;
    force?: boolean;
}
/**
 * 创建数据库表
 * @description
 * 创建一个新的 IndexedDB 对象仓库并配置索引。
 * 支持唯一索引和多值索引。
 *
 * @example
 * ```typescript
 * // 创建用户表 - 简单方式
 * await createTable('myDB', 'users', {
 *   primaryKey: 'userId',
 *   indexes: ['email', 'name', 'tags'] // 默认为普通索引
 * })
 *
 * // 创建用户表 - 高级配置
 * await createTable('myDB', 'users', {
 *   primaryKey: 'userId',
 *   indexes: [
 *     'name',                          // 普通索引
 *     {
 *       name: 'email',
 *       type: IndexType.UNIQUE         // 唯一索引
 *     },
 *     {
 *       name: 'tags',
 *       type: IndexType.MULTI_ENTRY    // 多值索引，用于数组字段
 *     }
 *   ]
 * })
 * ```
 */
declare function createTable(dbName: string, tableName: string, options?: TableOptions): Promise<any>;
export default createTable;
