import { useDatabase } from '../core'

/**
 * 关闭当前数据库连接
 * @param {string} dbName 数据库名称
 * @returns {Promise<void>}
 */
async function closeCurrentConnection(dbName: string): Promise<void> {
  try {
    const db = await useDatabase(dbName);
    
    if (!db) {
      return; // 如果没有活动连接，直接返回
    }
    
    // 检查是否有未完成的事务
    if (db.objectStoreNames && db.objectStoreNames.length > 0) {
      try {
        // 等待所有活动事务完成
        const stores = Array.from(db.objectStoreNames);
        for (const storeName of stores) {
          const transaction = db.transaction(storeName, 'readonly');
          await new Promise((resolve) => {
            transaction.oncomplete = resolve;
            transaction.onerror = resolve;
            transaction.onabort = resolve;
          });
        }
      } catch (err) {
        console.warn('等待事务完成时出错:', err);
      }
    }

    // 关闭数据库连接
    if (typeof db.close === 'function') {
      db.close();
    }
  } catch (error) {
    console.warn('关闭数据库连接时出错:', error);
  }
}

export default closeCurrentConnection
