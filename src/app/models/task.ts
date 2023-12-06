//import { User } from "./user";

import { User } from "./user";


// export class Task {
//   taskId!: number;
//   title!: string;
//   description!: string;
//   dueDate!: Date;
//   priority!: string;
//   status!: string;
//   createdAt!: Date;
//   updatedAt!: Date;
//   userId!: number;
//   userName?: string;
//   //user: User;
// }
export interface Task {
  taskId?: number;
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: User; // Include a reference to the user
  userName?: string;
}