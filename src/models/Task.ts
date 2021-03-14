import { Moment } from "moment";

export type Task = {
  id: number;
  title: string;
  createdAt: string;
  projectId?: number;
};
