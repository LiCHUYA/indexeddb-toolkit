interface QueryConfig {
    select?: string[];
    where?: Array<{
        field: string;
        operator: string;
        value: any;
    }>;
    orderBy?: Array<{
        field: string;
        direction: 'asc' | 'desc';
    }>;
    limit?: number;
    offset?: number;
}
export declare class QueryBuilder {
    private dbName;
    private tableName;
    private selectedFields;
    private whereConditions;
    private orderByClauses;
    private limitValue?;
    private offsetValue?;
    constructor(dbName: string, tableName: string);
    select(...fields: string[]): this;
    where(field: string, operator: string, value: any): this;
    orderBy(field: string, direction?: 'asc' | 'desc'): this;
    limit(value: number): this;
    offset(value: number): this;
    setConfig(config: QueryConfig): this;
    execute(): Promise<any>;
    private applyWhereConditions;
    private applyOrderBy;
}
export {};
