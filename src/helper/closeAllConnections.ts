/**
 * 关闭所有数据库连接
 */
async function closeAllConnections(): Promise<void> {
  try {
    // 获取当前所有打开的数据库连接
    const databases = await window.indexedDB.databases();
    
    // 关闭每个数据库连接
    for (const db of databases) {
      if (db.name) {
        const request = window.indexedDB.open(db.name);
        request.onsuccess = (event: any) => {
          const database = event.target.result;
          database.close();
        };
      }
    }
  } catch (error) {
    console.error('Error closing database connections:', error);
  }
}

export default closeAllConnections;