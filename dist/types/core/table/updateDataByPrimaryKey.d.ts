declare function updateDataByPrimaryKey<T>(dbName: any, tbName: string, id: number, data: T): Promise<any>;
export default updateDataByPrimaryKey;
