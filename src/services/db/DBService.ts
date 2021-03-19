import SQLite from "react-native-sqlite-storage";

export interface DBInterface<T> {
  executeSql: (query: string, params: (string | number)[]) => Promise<T[]>;
  executeSqlSingle: (query: string, params: (string | number)[]) => Promise<T>;
}

export interface ServiceDbInterface<T> {
  getList: (options?: { count?: number; offset?: number }) => Promise<T[]>;
  createItem: (params: T) => Promise<T>;
  deleteItem: (id: number) => Promise<T>;
  getById?: (id: number) => Promise<T>;
  updateItem?: (id: number, params: T) => Promise<T>;
}

class DBService<T> implements DBInterface<T> {
  private dbInstance: SQLite.SQLiteDatabase;

  constructor(dbInstance: SQLite.SQLiteDatabase) {
    this.dbInstance = dbInstance;
  }

  async executeSqlSingle(
    query: string,
    params: (string | number)[] = []
  ): Promise<T> {
    const [item] = await this.executeSql(query, params);

    return Promise.resolve(item);
  }

  async executeSql(
    query: string,
    params: (string | number)[] = []
  ): Promise<T[]> {
    return await new Promise<T[]>((resolve, reject) => {
      this.dbInstance.transaction((transaction: SQLite.Transaction) => {
        transaction.executeSql(
          query,
          params,
          (transaction, { rows }) => {
            const response = [];

            for (let i = 0; i < rows.length; i++) {
              response.push(rows.item(i));
            }

            resolve(response);
          },
          () => {
            reject([]);
          }
        );
      });
    });
  }
}

export default DBService;
