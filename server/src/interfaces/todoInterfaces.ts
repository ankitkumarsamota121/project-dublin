import { Document, Types } from 'mongoose';

export interface ITodo {
  desc: string;
  isCompleted: boolean;
  user: Types.ObjectId;
}

export interface ITodoModel extends ITodo, Document {}

export interface ICreateTodoArgs {
  desc: string;
}
