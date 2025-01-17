// 判断是否为生产环境的简单方法
const isProduction = () => {
  try {
    return window.location.hostname !== 'localhost' && 
           window.location.hostname !== '127.0.0.1';
  } catch {
    return false;
  }
};

export const logger = {
  debug: (...args: any[]) => {
    if (!isProduction()) {
      console.debug('[IndexedDB Toolkit]', ...args);
    }
  },
  error: (...args: any[]) => {
    if (!isProduction()) {
      console.error('[IndexedDB Toolkit]', ...args);
    }
  },
  warn: (...args: any[]) => {
    if (!isProduction()) {
      console.warn('[IndexedDB Toolkit]', ...args);
    }
  }
};