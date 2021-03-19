import moment from "moment";
import SQLite from "react-native-sqlite-storage";
import { TimeLog } from "../../models";
import DBService, { ServiceDbInterface } from "./DBService";

class TimeLogDbService
  extends DBService<TimeLog>
  implements ServiceDbInterface<TimeLog> {
  private tableName: string = "timeLog";
  private paramNames = "duration, parentType, parentId, createdAt";

  constructor(dbInstance: SQLite.SQLiteDatabase) {
    super(dbInstance);
  }

  async getList() {
    let query = `SELECT * FROM ${this.tableName}`;

    return await this.executeSql(query);
  }

  async createItem(params: TimeLog) {
    const paramValues = [
      params.duration,
      params.parentType,
      params.parentId,
      moment().toISOString(),
    ].join("','");

    const insertQuery = `INSERT INTO ${this.tableName} (${this.paramNames}) VALUES ('${paramValues}')`;
    const querySelect = `SELECT * FROM ${this.tableName} WHERE createdAt = '${params.createdAt}'`;

    await this.executeSql(insertQuery);

    return await this.executeSqlSingle(querySelect);
  }

  async deleteItem(id: number) {
    const query = `DELETE FROM ${this.tableName} WHERE id = ${id}`;

    return await this.executeSqlSingle(query);
  }
}

export default TimeLogDbService;
