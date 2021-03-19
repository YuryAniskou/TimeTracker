import { Moment } from "moment";

export type Project = {
  id: number;
  title: string;
  hourRate?: number;
  createdAt: string;
};
