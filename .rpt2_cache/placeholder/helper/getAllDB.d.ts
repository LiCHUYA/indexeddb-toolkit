/**
 * 获取所有数据库实例
 * @returns {Promise<{status: number, message: string, data: any[]}>} Promise对象，包含所有数据库实例的数组
 */
declare function getAllDB(): Promise<any>;
export default getAllDB;
