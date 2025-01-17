import { useDatabase } from '../index'
import ResponseMessages from '../../constant'
import { logger } from '../../utils/logger'

interface WhereClause {
  field: string
  operator: string
  value: any
}

interface OrderByClause {
  field: string
  direction: 'asc' | 'desc'
}

interface QueryConfig {
  select?: string[]
  where?: Array<{
    field: string
    operator: string
    value: any
  }>
  orderBy?: Array<{
    field: string
    direction: 'asc' | 'desc'
  }>
  limit?: number
  offset?: number
}

export class QueryBuilder {
  private dbName: string
  private tableName: string
  private selectedFields: string[] = []
  private whereConditions: WhereClause[] = []
  private orderByClauses: OrderByClause[] = []
  private limitValue?: number
  private offsetValue?: number

  constructor(dbName: string, tableName: string) {
    this.dbName = dbName
    this.tableName = tableName
  }

  // 链式查询方法
  select(...fields: string[]) {
    this.selectedFields = fields.length ? fields : ['*']
    return this
  }

  where(field: string, operator: string, value: any) {
    this.whereConditions.push({ field, operator, value })
    return this
  }

  orderBy(field: string, direction: 'asc' | 'desc' = 'asc') {
    this.orderByClauses.push({ field, direction })
    return this
  }

  limit(value: number) {
    this.limitValue = value
    return this
  }

  offset(value: number) {
    this.offsetValue = value
    return this
  }

  // 配置查询方法
  setConfig(config: QueryConfig) {
    if (config.select) {
      this.selectedFields = config.select
    }
    if (config.where) {
      this.whereConditions = config.where
    }
    if (config.orderBy) {
      this.orderByClauses = config.orderBy
    }
    if (config.limit !== undefined) {
      this.limitValue = config.limit
    }
    if (config.offset !== undefined) {
      this.offsetValue = config.offset
    }
    return this
  }

  // 执行查询
  async execute(): Promise<any> {
    try {
      const db = await useDatabase(this.dbName)
      const transaction = db.transaction([this.tableName], 'readonly')
      const store = transaction.objectStore(this.tableName)

      return new Promise((resolve, reject) => {
        const request = store.getAll()

        request.onsuccess = () => {
          try {
            let results = request.result

            // 应用where条件
            if (this.whereConditions.length) {
              results = this.applyWhereConditions(results)
            }

            // 应用orderBy
            if (this.orderByClauses.length) {
              results = this.applyOrderBy(results)
            }

            // 应用select
            if (this.selectedFields.length && !this.selectedFields.includes('*')) {
              results = results.map(item => {
                const selected: any = {}
                this.selectedFields.forEach(field => {
                  if (field in item) {
                    selected[field] = item[field]
                  }
                })
                return selected
              })
            }

            // 应用分页
            if (this.offsetValue !== undefined) {
              results = results.slice(this.offsetValue)
            }
            if (this.limitValue !== undefined) {
              results = results.slice(0, this.limitValue)
            }

            resolve(ResponseMessages.TB_SELECT_SUCCESS(results))
          } catch (error) {
            reject(ResponseMessages.TB_SELECT_ERROR(error))
          }
        }

        request.onerror = () => {
          reject(ResponseMessages.TB_SELECT_ERROR(request.error))
        }
      })
    } catch (error) {
      logger.error('Query execution failed:', error)
      return ResponseMessages.TB_SELECT_ERROR(error)
    }
  }

  private applyWhereConditions(results: any[]): any[] {
    return results.filter(item => {
      return this.whereConditions.every(({ field, operator, value }) => {
        const itemValue = item[field]
        switch (operator) {
          case '=':
            return itemValue === value
          case '!=':
            return itemValue !== value
          case '>':
            return itemValue > value
          case '>=':
            return itemValue >= value
          case '<':
            return itemValue < value
          case '<=':
            return itemValue <= value
          case 'between':
            return itemValue >= value[0] && itemValue <= value[1]
          case 'in':
            return value.includes(itemValue)
          case 'like':
            if (typeof itemValue !== 'string') return false
            const pattern = value.replace(/%/g, '.*')
            return new RegExp(`^${pattern}$`).test(itemValue)
          default:
            return false
        }
      })
    })
  }

  private applyOrderBy(results: any[]): any[] {
    return [...results].sort((a, b) => {
      for (const { field, direction } of this.orderByClauses) {
        if (a[field] < b[field]) return direction === 'asc' ? -1 : 1
        if (a[field] > b[field]) return direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }
} 