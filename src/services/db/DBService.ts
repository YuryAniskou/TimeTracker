import SQLite from "react-native-sqlite-storage";

export interface DBInterface {
  executeSql: <T>(query: string, params: any[]) => Promise<T[]>;
}

class DBService implements DBInterface {
  private dbInstance: SQLite.SQLiteDatabase;

  constructor(dbInstance: SQLite.SQLiteDatabase) {
    this.dbInstance = dbInstance;
  }

  executeSql<T>(query: string, params: any[] = []): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      this.dbInstance.transaction((transaction) => {
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
