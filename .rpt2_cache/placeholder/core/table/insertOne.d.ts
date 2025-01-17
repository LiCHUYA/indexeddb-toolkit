declare function insertOne<T extends object>(dbName: string, tableName: string, data: T): Promise<any>;
export default insertOne;
