declare function insertOne<T>(dbName: string, tableName: string, data: T): Promise<any>;
export default insertOne;
