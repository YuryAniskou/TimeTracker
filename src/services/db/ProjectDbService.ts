import moment from "moment";
import SQLite from "react-native-sqlite-storage";
import { Project } from "../../models";
import DBService, { ServiceDbInterface } from "./DBService";

class ProjectDbService
  extends DBService<Project>
  implements ServiceDbInterface<Project> {
  private tableName: string = "projects";
  private paramNames = "title, createdAt";

  constructor(dbInstance: SQLite.SQLiteDatabase) {
    super(dbInstance);
  }

  async getById(id: number) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ${id}`;

    return await this.executeSqlSingle(query);
  }

  async getList(options?: { count?: number; offset?: number }) {
    let query = `SELECT * FROM ${this.tableName}`;

    return await this.executeSql(query);
  }

  async createItem(params: Project) {
    const paramValues = [params.title, moment().toISOString()].join("','");

    const insertQuery = `INSERT INTO ${this.tableName} (${this.paramNames}) VALUES ('${paramValues}')`;
    const querySelect = `SELECT * FROM ${this.tableName} WHERE createdAt = '${params.createdAt}'`;

    await this.executeSql(insertQuery);

    return await this.executeSqlSingle(querySelect);
  }

  async deleteItem(id: number) {
    const query = `DELETE FROM ${this.tableName} WHERE id = ${id}`;

    return await this.executeSqlSingle(query);
  }

  async updateItem(id: number, params: Project) {
    const paramSets = [`title = ${params.title}`];
    const selectQuery = `SELECT * FROM ${this.tableName} WHERE id = ${id}`;

    const paramsList = paramSets.join(",");
    const updateQuery = `UPDATE ${this.tableName} SET ${paramsList} WHERE id = ${id}`;

    await this.executeSql(updateQuery);

    return await this.executeSqlSingle(selectQuery);
  }
}

export default ProjectDbService;
