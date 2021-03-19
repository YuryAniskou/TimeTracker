import { Moment } from "moment";

export type TimeLog = {
  id: number;
  parentType: "projects" | "tasks";
  parentId: number;
  duration: number;
  createdAt: string;
};
