import SQLite from "react-native-sqlite-storage";
import { Project } from "../../models";
import DBService from "./DBService";

export interface ProjectDbInterface {
  getProject: (projectId: number) => Promise<Project>;
  getProjects: (count?: number, offset?: number) => Promise<Project[]>;
  createProject: (params: Project) => Promise<Project>;
  updateProject: (projectId: number, params: Project) => Promise<Project>;
  deleteProject: (projectId: number) => Promise<Project>;
}

class ProjectDbService extends DBService implements ProjectDbInterface {
  constructor(dbInstance: SQLite.SQLiteDatabase) {
    super(dbInstance);
  }

  async getProject(projectId: number): Promise<Project> {
    const query = `SELECT * FROM projects WHERE id = ${projectId}`;
    const [project] = await this.executeSql<Project>(query);

    return project;
  }

  async getProjects(
    count: number = 10,
    offset: number = 0
  ): Promise<Project[]> {
    let query = `SELECT * FROM projects LIMIT ${offset},${count}`;

    return await this.executeSql<Project>(query);
  }

  async createProject(params: Project): Promise<Project> {
    const paramNames = ["title", "createdAt"];
    const paramValues = [params.title, params.createdAt];

    const insertQuery = `INSERT INTO projects (${paramNames.join(
      ","
    )}) VALUES ('${paramValues.join("','")}')`;
    const querySelect = `SELECT * FROM projects WHERE createdAt = '${params.createdAt}'`;

    await this.executeSql<Project>(insertQuery);
    const [project] = await this.executeSql<Project>(querySelect);

    return project;
  }

  async deleteProject(projectId: number): Promise<Project> {
    const query = `DELETE FROM projects WHERE id = ${projectId}`;
    const [project] = await this.executeSql<Project>(query);

    return project;
  }

  async updateProject(projectId: number, params: Project): Promise<Project> {
    const paramSets = [`title = ${params.title}`];
    const selectQuery = `SELECT * FROM exerciseSets WHERE id = ${projectId}`;
    const updateQuery = `UPDATE exerciseSets SET ${paramSets.join(
      ", "
    )} WHERE id = ${projectId}`;

    await this.executeSql<Project>(updateQuery);
    const [project] = await this.executeSql<Project>(selectQuery);

    return project;
  }
}

export default ProjectDbService;
