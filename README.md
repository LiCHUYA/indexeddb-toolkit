# **indexeddb-toolkit**

- **indexeddb-toolkit**是一个用于浏览器的轻量级数据库操作库，使用 ts+promise 提供了对 IndexedDB
  的封装和便捷的
  API，用于简化数据库的创建、表的管理和数据的增删改查操作。它提供了一系列的方法来操作数据库和表，包括创建、删除、查询和更新数据等功能,来减少开发者的成本,API命名与主流数据库orm类似,

## 安装

``` js
npm i indexeddb-toolkit
或
pnpm i indexeddb-toolkit
```

## 使用方式

方式一

```javascript
import { useDatabase } from 'indexeddb-toolkit'
```

方式二

```js
import indexeddbToolkit from 'indexeddb-toolkit'

const { useDatabase } = indexeddbToolkit
```

方式三

```js
<script src="../dist/indexeddb-toolkit.js"></script>
<script>
  console.log(indexeddbToolkit)
</script>
```

## **<span style="color:red">使用前必看!</span>**

> 学习API之前,提前先了解一下核心基础
>
> 1. **由于indexeddb的一些限制,请不要创建表和创建数据库同时进行。**
> 2. 该库封装分为两大块:database,table的操作,对应着"数据库","表",也对应着对它们的crud方法延申。
> 3. 本库都采用promise的方式,我们可以轻松使用async,await的方式拿到其结果。
> 4. indexedb是支持nosql的非关系型数据库。

---

> 有很好用的三个API,笔者在这单独拿出来提一下
>
> 创建数据库**useDatabase**, 查询数据**findDBData**, 创建表**createTable**
>
>
>
> 1.useDatabase(dbName: string)
>
> 该方法可以不用考虑繁杂琐碎的原生API, 只需要传入一个名字便,无感创建/使用数据库,极大减小心智负担。
>
>
>
> 2.`createTable(dbName: string, tableName: string, indexs: any[])`
>
> 该方法接收三个参数,数据库名,表名和索引数组。
>
> 当不太熟悉什么是索引时,我们可以看以下示例:
>
> ```js
> 我们从indexeddb中某张表中查出了一条数据,
> 	{id:1,age:18,sex:'男'}
> 	以上对象中有id,age,sex为key,那么就可以任意选择这三个字段作为索引id数组中的某一项,这对后面查询方法会很有用,想查询出age=18的数据,就可以用索引来进行查询。
> 
> 示例:
> await createTable('db','tb',['id','name','age']) //创建表
> await insertOne('db','tb',{id:1,age:18,sex:'男'}) //插入一条数据
> 
> 使用索引查询数据
> await findByIndex('db','tb','age','18') //这样就能查询出所有age为18的这一条数据
> 
> ```
>
>
>
> 3.`findDBData(dbName: string, tableName?: string)`
>
>  该方法用于查询数据库中表格的数据,可以传入两个参数,一个是dbName,一个是tbName,
>
> 当只传入dbName的时候,查询 该数据库下所有表,以及所有数据,呈树状结构

## 数据库的操作方法

- `useDatabase(dbName: string)`: 使用/创建指定数据库
- `deleteAllDatabases()`: 删除所有数据库
- `deleteDatabase(dbName: string)`: 删除指定数据库
- `getTableNames(dbName: string)`: 获取指定数据库的表名列表

#### `useDatabase(dbName: string)`

- 功能：使用/创建指定数据库，如果数据库不存在则创建，存在则表示使用数据库
- 参数：
  - `dbName` - 数据库名称
- 返回值：返回一个 Promise 对象，包含当前数据库实例

```javascript
//使用示例
(async function() {
  let res = await useDatabase("数据库名称");
})();

//或者
useDatabase('dbName').then()
```

#### `deleteAllDatabases()`

- 功能：删除所有数据库
- 参数：无
- 返回值：返回一个 Promise 对象，包含删除结果的状态和消息

#### `deleteDatabase(dbName: string)`

- 功能：删除指定数据库
- 参数：
  - `dbName` - 数据库名称
- 返回值：返回一个 Promise 对象，包含删除结果的状态和消息

#### `getTableNames(dbName: string)`

- 功能：获取指定数据库中的表名列表
- 参数：
  - `dbName` - 数据库名称
- 返回值：返回一个 Promise 对象，包含表名称数组
-

## 表的操作方法

### 创建表

- `createTable(dbName: string, tableName: string, indexs: any[])`: 创建表
- `deleteTable(dbName: string, tableName: string)`: 删除指定表
- `deleteAllTables(dbName: string): 删除所有表

#### `createTable(dbName: string, tableName: string, indexs: any[])`

- 功能：创建表
- 参数：
  - `dbName` - 数据库名称
  - `tableName` - 表名称
  - `indexs` - 索引数组
- 返回值：返回一个 Promise 对象，包含创建结果的状态和状态码

```javascript
//创建表
(async function() {
  let res = await createTable("数据库名称", "表的名称", "索引数组");
})();
```

#### `deleteTable(dbName: string, tableName: string)`

- 功能：删除指定表
- 参数：
  - `dbName` - 数据库名称
  - `tableName` - 表名称
- 返回值：返回一个 Promise 对象，包含删除结果的状态和消息

#### `deleteAllTables(dbName: string)`

- 功能：删除指定数据库中的所有表
- 参数：
  - `dbName` - 数据库名称
- 返回值：返回一个 Promise 对象，包含删除结果的状态和消息

## 表数据操作方法

### 查询

**注意事项:**

> findByKey和findByIndex时,最后一个参数为isAll,因为indexeddb根据主键和索引查询出来的数据只展示第一条,
>
> 可以通过这个参数来控制是展示查询到的第一条还是全部数据。

- `findDBData(dbName: string, tableName?: string)`: 查询表的数据
- `findByKey(dbName: string, tableName: string, key: any, isAll: boolean = true)`: 根据主键查询数据
- `findByIndex(dbName: string, tableName: string, indexName: string, indexValue: any,isAll: boolean = true)`:
  根据索引查询

### 插入

- `insertOne(dbName: any, tableName: string, data: any)`: 向指定表中插入一条数据
- `insertMany(dbName: any, tableName: string, data: any[]): 向指定表中插入多条数据

```javascript
(async function() {
  //插入一条数据
  let res = await insertOne("数据库名称", "表的名称", "数据");
})();
```

### 更新

- `updateDataByPrimaryKey(dbName: any, storeName: string, id: number, data: any`): 根据主键更新数据
- `updateDataByIndex(dbName: any, storeName: string, indexName: string, indexValue: any, data: any):
  根据索引更新数据

```javascript
(async function() {
  //根据主键更新数据
  let res = await updateDataByPrimaryKey(
    "数据库名称",
    "表的名称",
    "主键",
    "数据"
  );
})();
```

### 删除

- `deleteOneByPk(dbName: string, tableName: string, id: number): 根据主键删除数据
- `deleteOneByIndex(dbName: string, tableName: string, indexName: string, indexValue: any)`:
  根据索引删除数据
- `deleteManyByKeys(dbName: string, tableName: string, ids: number[])`: 根据主键数组批量删除数据
- `deleteManyByIndex(dbName: string, tableName: string, indexName: string, indexValues: any[])`:
  根据索引批量删除数据

## CRUD方法具体介绍

#### `findDBData(dbName: string, tableName?: string)`

- 功能：查询数据库中表的数据
- 参数：
  - `dbName` - 数据库名称
  - `tableName` - 表名称，可选，不传则查询所有表的数据
- 返回值：返回一个 Promise 对象，包含查询结果数组

```javascript
(async function() {
  //查询表的数据
  let res = await updateDataByPrimaryKey("数据库名称", "表的名称_可选");
})();
```

#### `findByKey(dbName: string, tableName: string, key: any)`

- 功能：根据主键查询数据
- 参数：
  - `dbName` - 数据库名称
  - `tableName` - 表名称
  - `key` - 主键值
- 返回值：返回一个 Promise 对象，包含查询结果对象

#### `findByIndex(dbName: string, tableName: string, indexName: string, indexValue: any)`

- 功能：根据索引查询数据
- 参数：
  - `dbName` - 数据库名称
  - `tableName` - 表名称
  - `indexName` - 索引名称
  - `indexValue` - 索引值
- 返回值：返回一个 Promise 对象，包含查询结果对象

#### `insertOne(dbName: any, tableName: string, data: any)`

- 功能：向指定表中插入一条数据
- 参数：
  - `dbName` - 数据库名称
  - `tableName` - 表名称
  - `data` - 待插入的数据对象
- 返回值：返回一个 Promise 对象，包含插入结果的状态

#### `insertMany(dbName: any, tableName: string, data: any[])`

- 功能：向指定表中插入多条数据
- 参数：
  - `dbName` - 数据库名称
  - `tableName` - 表名称
  - `data` - 待插入的数据数组
- 返回值：返回一个 Promise 对象，包含插入结果的状态

#### `updateDataByPrimaryKey(dbName: any, storeName: string, id: number, data: any)`

- 功能：根据主键更新数据
- 参数：
  - `dbName` - 数据库名称
  - `storeName` - 存储对象的名称
  - `id` - 主键值
  - `data` - 要更新的数据对象
- 返回值：返回一个 Promise 对象，包含更新结果的状态

#### `updateDataByIndex(dbName: any, storeName: string, indexName: string, indexValue: any, data: any)`

- 功能：根据索引更新数据
- 参数：
  - `dbName` - 数据库名称
  - `storeName` - 存储对象的名称
  - `indexName` - 索引名称
  - `indexValue` - 索引值
  - `data` - 要更新的数据对象
- 返回值：返回一个 Promise 对象，包含更新结果的状态

#### `deleteOneByPk(dbName: string, tableName: string, id: number)`

- 功能：根据主键删除数据
- 参数：
  - `dbName` - 数据库名称
  - `tableName` - 表名称
  - `id` - 主键值
- 返回值：返回一个 Promise 对象，包含删除结果的状态和消息

#### `deleteOneByIndex(dbName: string, tableName: string, indexName: string, indexValue: any)`

- 功能：根据索引删除数据
- 参数：
  - `dbName` - 数据库名称
  - `tableName` - 表名称
  - `indexName` - 索引名称
  - `indexValue` - 索引值
- 返回值：返回一个 Promise 对象，包含删除结果的状态和消息

#### `deleteManyByPK(dbName: string, tableName: string, ids: number[])`

- 功能：根据主键数组批量删除数据
- 参数：
  - `dbName` - 数据库名称
  - `tableName` - 表名称
  - `ids` - 主键值数组
- 返回值：返回一个 Promise 对象，包含删除结果的状态和消息

#### `deleteManyByIndex(dbName: string, tableName: string, indexName: string, indexValues: any[])`

- 功能：根据索引批量删除数据
- 参数：
  - `dbName` - 数据库名称
  - `tableName` - 表名称
  - `indexName` - 索引名称
  - `indexValues` - 索引值数组
- 返回值：返回一个 Promise 对象，包含删除结果的状态和消息









