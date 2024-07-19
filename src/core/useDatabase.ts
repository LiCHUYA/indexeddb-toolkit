import ResponseMessages from '../constant/index'

import { getIndexedDBVersion } from '../helper/index'

export function useDatabase(dbName: string) {
  if (!dbName) {
   return ResponseMessages.DBNAME_IS_NULL()
  }
  const request = window.indexedDB.open(dbName)
  request.onsuccess = (event: any) => {
    return ResponseMessages.OPEN_DB_SUCCESS(event.target.result)
  }
  request.onerror = async (event: any) => {
    try {
      const message = event.target.error.name
      if (message === 'VersionError') {
        const version = await getIndexedDBVersion(dbName)
        const request = window.indexedDB.open(dbName, version)
        request.onsuccess = (event: any) => {
          return ResponseMessages.OPEN_DB_SUCCESS(event.target.result)
        }
      } else {
        return ResponseMessages.OPEN_DB_ERROR(event.target.error)
      }
    } catch (error) {
      return ResponseMessages.BASIC_ERROR(event.target.error)
    }
  }

  request.onupgradeneeded = (event: any) => {
    try {
      return ResponseMessages.OPEN_DB_SUCCESS(event.target.result)
    } catch (error) {
      return ResponseMessages.BASIC_ERROR(event.target.error)
    }
  }
}
