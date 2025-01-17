import { QueryBuilder } from './QueryBuilder'

/**
 * 创建查询构建器
 * @description 
 * 创建一个新的查询构建器实例，用于构建数据库查询。
 * 支持链式调用和配置对象两种方式。
 * 
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @returns QueryBuilder 实例
 * 
 * @example
 * ```typescript
 * // 链式调用
 * const results = await createQuery('myDB', 'users')
 *   .select('name', 'email')
 *   .where('age', '>', 18)
 *   .orderBy('name', 'asc')
 *   .limit(10)
 *   .execute()
 * 
 * // 配置对象方式
 * const results = await createQuery('myDB', 'users')
 *   .setConfig({
 *     select: ['name', 'email'],
 *     where: [{ field: 'age', operator: '>', value: 18 }],
 *     orderBy: [{ field: 'name', direction: 'asc' }],
 *     limit: 10
 *   })
 *   .execute()
 * ```
 */
export function createQuery(dbName: string, tableName: string): QueryBuilder {
  return new QueryBuilder(dbName, tableName)
}

