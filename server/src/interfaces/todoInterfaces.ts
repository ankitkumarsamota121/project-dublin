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

export interface IDelResp {
  success: boolean;
  message: string;
}

export interface IDelArgs {
  id: string;
}

export interface IEditArgs {
  id: string;
  desc: string;
  isCompleted: boolean;
}
