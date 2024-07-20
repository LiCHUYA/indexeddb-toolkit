/**
 * 使用指定的数据库
 *
 * @param {string} dbName - 数据库名称
 * @returns {Promise<any>} Promise对象，包含当前数据库实例或错误信息
 *
 * @example
 * useDatabase('myDatabase')
 *   .then(response => {
 *     console.log('Database opened successfully', response);
 *   })
 *   .catch(error => {
 *     console.error('Error opening database', error);
 *   });
 */
declare function useDatabase(dbName: string): any;
export default useDatabase;
