/**
 * 关闭所有数据库连接
 */
async function closeAllConnections(): Promise<void> {
  // 获取当前所有打开的数据库连接
  const databases = await window.indexedDB.databases?.() || [];
  
  // 关闭每个数据库连接
  databases.forEach((db: any) => {
    if (db.name) {
      const request = window.indexedDB.open(db.name);
      request.onsuccess = (event: any) => {
        const db = event.target.result;
        db.close();
      };
    }
  });
}

export default closeAllConnections; 