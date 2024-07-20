# **indexeddb-helper**

- **indexeddb-helper**是一个用于浏览器的轻量级数据库操作库，使用 ts+promise 提供了对 IndexedDB 的封装和便捷的 API，用于简化数据库的创建、表的管理和数据的增删改查操作。它提供了一系列的方法来操作数据库和表，包括创建、删除、查询和更新数据等功能,来减少开发者的成本,API命名与主流数据库orm类似.

## 构造函数

```javascript
let db = new hydb();
```

## 版本介绍

```javascript
  hyDB.js 用于原生js,可直接script标签进行引入在进行实例化
  hydb.esm.js 用于es6模块,可通过import进行引入
  hydb.cjs.js 用于commonjs模块,可通过require进行引入
```

## 数据库操作方法

### 介绍

- `useDatabase(dbName: string): Promise<void>`: 使用/创建指定数据库
- `deleteAllDatabases(): Promise<any>`: 删除所有数据库
- `deleteDatabase(dbName: string): Promise<any>`: 删除指定数据库
- `showDBs(): Promise<void>`: 显示当前数据库列表
- `getTableNames(dbName: string): Promise<any[]>`: 获取指定数据库的表名列表

#### `useDatabase(dbName: string): Promise<void>`

- 功能：使用/创建指定数据库，如果数据库不存在则创建，存在则表示使用数据库
- 参数：
  - `dbName` - 数据库名称
- 返回值：返回一个 Promise 对象，包含当前数据库实例

```javascript
//使用/创建指定数据库，如果数据库不存在则创建，存在则表示使用数据库
(async function () {
  let res = await db.useDatabase("数据库名称");
})();
```

#### `deleteAllDatabases(): Promise<any>`

- 功能：删除所有数据库
- 参数：无
- 返回值：返回一个 Promise 对象，包含删除结果的状态和消息

#### `deleteDatabase(dbName: string): Promise<any>`

- 功能：删除指定数据库
- 参数：
  - `dbName` - 数据库名称
- 返回值：返回一个 Promise 对象，包含删除结果的状态和消息

#### `showDBs(): Promise<void>`

- 功能：初始化操作，获取所有数据库实例并保存到 `this.dbs` 中
- 参数：无
- 返回值：无

#### `getTableNames(dbName: string): Promise<any[]>`

- 功能：获取指定数据库中的表名列表
- 参数：
  - `dbName` - 数据库名称
- 返回值：返回一个 Promise 对象，包含表名称数组

## 表的操作方法

### 创建表

- `createTable(dbName: string, tableName: string, indexs: any[]): Promise<any>`: 创建表
- `deleteTable(dbName: string, tableName: string): Promise<any>`: 删除指定表
- `deleteAllTables(dbName: string): Promise<any>`: 删除所有表

#### `createTable(dbName: string, tableName: string, indexs: any[]): Promise<any>`

- 功能：创建表
- 参数：
  - `dbName` - 数据库名称
  - `tableName` - 表名称
  - `indexs` - 索引数组
- 返回值：返回一个 Promise 对象，包含创建结果的状态和状态码

```javascript
//创建表
(async function () {
  let res = await db.createTable("数据库名称", "表的名称", "索引数组");
})();
```

#### `deleteTable(dbName: string, tableName: string): Promise<any>`

- 功能：删除指定表
- 参数：
  - `dbName` - 数据库名称
  - `tableName` - 表名称
- 返回值：返回一个 Promise 对象，包含删除结果的状态和消息

#### `deleteAllTables(dbName: string): Promise<any>`

- 功能：删除指定数据库中的所有表
- 参数：
  - `dbName` - 数据库名称
- 返回值：返回一个 Promise 对象，包含删除结果的状态和消息

## 表数据操作方法

### 查询

- `findTableData(dbName: string, tableName?: string): Promise<any[]>`: 查询表的数据
- `findByKey(dbName: string, tableName: string, key: any): Promise<any>`: 根据主键查询数据
- `findByIndex(dbName: string, tableName: string, indexName: string, indexValue: any): Promise<any>`: 根据索引查询

### 插入

- `insertOne(dbName: any, tableName: string, data: any): Promise<any>`: 向指定表中插入一条数据
- `insertMany(dbName: any, tableName: string, data: any[]): Promise<any>`: 向指定表中插入多条数据

```javascript
(async function () {
  //插入一条数据
  let res = await db.insertOne("数据库名称", "表的名称", "数据");
})();
```

### 更新

- `updateDataByPrimaryKey(dbName: any, storeName: string, id: number, data: any): Promise<{ success: boolean }>`: 根据主键更新数据
- `updateDataByIndex(dbName: any, storeName: string, indexName: string, indexValue: any, data: any): Promise<{ success: boolean }>`: 根据索引更新数据

```javascript
(async function () {
  //根据主键更新数据
  let res = await db.updateDataByPrimaryKey(
    "数据库名称",
    "表的名称",
    "主键",
    "数据"
  );
})();
```

### 删除

- `deleteOneByPk(dbName: string, tableName: string, id: number): Promise<any>`: 根据主键删除数据
- `deleteOneByIndex(dbName: string, tableName: string, indexName: string, indexValue: any): Promise<any>`: 根据索引删除数据
- `deleteManyByPKs(dbName: string, tableName: string, ids: number[]): Promise<any>`: 根据主键数组批量删除数据
- `deleteManyByIndexs(dbName: string, tableName: string, indexName: string, indexValues: any[]): Promise<any>`: 根据索引批量删除数据

#### `findTableData(dbName: string, tableName?: string): Promise<any[]>`

- 功能：查询表的数据
- 参数：
  - `dbName` - 数据库名称
  - `tableName` - 表名称，可选，不传则查询所有表的数据
- 返回值：返回一个 Promise 对象，包含查询结果数组

```javascript
(async function () {
  //查询表的数据
  let res = await db.updateDataByPrimaryKey("数据库名称", "表的名称_可选");
})();
```

#### `findByKey(dbName: string, tableName: string, key: any): Promise<any>`

- 功能：根据主键查询数据
- 参数：
  - `dbName` - 数据库名称
  - `tableName` - 表名称
  - `key` - 主键值
- 返回值：返回一个 Promise 对象，包含查询结果对象

#### `findByIndex(dbName: string, tableName: string, indexName: string, indexValue: any): Promise<any>`

- 功能：根据索引查询数据
- 参数：
  - `dbName` - 数据库名称
  - `tableName` - 表名称
  - `indexName` - 索引名称
  - `indexValue` - 索引值
- 返回值：返回一个 Promise 对象，包含查询结果对象

#### `insertOne(dbName: any, tableName: string, data: any): Promise<{ success: boolean }>`

- 功能：向指定表中插入一条数据
- 参数：
  - `dbName` - 数据库名称
  - `tableName` - 表名称
  - `data` - 待插入的数据对象
- 返回值：返回一个 Promise 对象，包含插入结果的状态

#### `insertMany(dbName: any, tableName: string, data: any[]): Promise<any>`

- 功能：向指定表中插入多条数据
- 参数：
  - `dbName` - 数据库名称
  - `tableName` - 表名称
  - `data` - 待插入的数据数组
- 返回值：返回一个 Promise 对象，包含插入结果的状态

#### `updateDataByPrimaryKey(dbName: any, storeName: string, id: number, data: any): Promise<{ success: boolean }>`

- 功能：根据主键更新数据
- 参数：
  - `dbName` - 数据库名称
  - `storeName` - 存储对象的名称
  - `id` - 主键值
  - `data` - 要更新的数据对象
- 返回值：返回一个 Promise 对象，包含更新结果的状态

#### `updateDataByIndex(dbName: any, storeName: string, indexName: string, indexValue: any, data: any): Promise<{ success: boolean }>`

- 功能：根据索引更新数据
- 参数：
  - `dbName` - 数据库名称
  - `storeName` - 存储对象的名称
  - `indexName` - 索引名称
  - `indexValue` - 索引值
  - `data` - 要更新的数据对象
- 返回值：返回一个 Promise 对象，包含更新结果的状态

#### `deleteOneByPk(dbName: string, tableName: string, id: number): Promise<any>`

- 功能：根据主键删除数据
- 参数：
  - `dbName` - 数据库名称
  - `tableName` - 表名称
  - `id` - 主键值
- 返回值：返回一个 Promise 对象，包含删除结果的状态和消息

#### `deleteOneByIndex(dbName: string, tableName: string, indexName: string, indexValue: any): Promise<any>`

- 功能：根据索引删除数据
- 参数：
  - `dbName` - 数据库名称
  - `tableName` - 表名称
  - `indexName` - 索引名称
  - `indexValue` - 索引值
- 返回值：返回一个 Promise 对象，包含删除结果的状态和消息

#### `deleteManyByPKs(dbName: string, tableName: string, ids: number[]): Promise<any>`

- 功能：根据主键数组批量删除数据
- 参数：
  - `dbName` - 数据库名称
  - `tableName` - 表名称
  - `ids` - 主键值数组
- 返回值：返回一个 Promise 对象，包含删除结果的状态和消息

#### `deleteManyByIndexs(dbName: string, tableName: string, indexName: string, indexValues: any[]): Promise<any>`

- 功能：根据索引批量删除数据
- 参数：
  - `dbName` - 数据库名称
  - `tableName` - 表名称
  - `indexName` - 索引名称
  - `indexValues` - 索引值数组
- 返回值：返回一个 Promise 对象，包含删除结果的状态和消息

### 不常用

#### `updateDataBaseVersion(hyDB: any)`

- 功能：更新数据库版本号
- 参数：`hyDB` - 数据库实例
- 返回值：无

#### `closeCurrentConnection()`

- 功能：关闭当前数据库连接
- 参数：无
- 返回值：无

#### `getIndexedDBVersion(databaseName: string)`

- 功能：获取指定数据库的版本号
- 参数：
  - `databaseName` - 数据库名称
- 返回值：返回一个 Promise 对象，包含数据库的版本号
