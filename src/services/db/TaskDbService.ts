import SQLite from "react-native-sqlite-storage";
import { Task } from "../../models";
import DBService, { ServiceDbInterface } from "./DBService";

class TaskDbService
  extends DBService<Task>
  implements ServiceDbInterface<Task> {
  private tableName: string = "tasks";

  constructor(dbInstance: SQLite.SQLiteDatabase) {
    super(dbInstance);
  }

  async getById(id: number) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ${id}`;
    const [item] = await this.executeSql(query);

    return item;
  }

  async getList(options?: {
    count?: number;
    offset?: number;
    projectId?: number;
  }) {
    const { offset = 0, count = 10, projectId } = options || {};

    let query = `SELECT * FROM ${this.tableName} LIMIT ${offset},${count}`;

    if (projectId) {
      query = `SELECT * FROM ${this.tableName} WHERE projectId = ${projectId} LIMIT ${offset},${count}`;
    }

    return await this.executeSql(query);
  }

  async createItem(params: Task) {
    const paramNames = ["title", "createdAt"];
    const paramValues = [params.title, params.createdAt];

    const paramsList = paramNames.join(",");
    const insertQuery = `INSERT INTO ${
      this.tableName
    } (${paramsList}) VALUES ('${paramValues.join("','")}')`;
    const querySelect = `SELECT * FROM ${this.tableName} WHERE createdAt = '${params.createdAt}'`;

    await this.executeSql(insertQuery);
    const [item] = await this.executeSql(querySelect);

    return item;
  }

  async deleteItem(id: number) {
    const query = `DELETE FROM ${this.tableName} WHERE id = ${id}`;
    const [item] = await this.executeSql(query);

    return item;
  }

  async updateItem(id: number, params: Task) {
    const paramSets = [`title = ${params.title}`];
    const selectQuery = `SELECT * FROM ${this.tableName} WHERE id = ${id}`;

    const paramsList = paramSets.join(",");
    const updateQuery = `UPDATE ${this.tableName} SET ${paramsList} WHERE id = ${id}`;

    await this.executeSql(updateQuery);
    const [item] = await this.executeSql(selectQuery);

    return item;
  }
}

export default TaskDbService;
