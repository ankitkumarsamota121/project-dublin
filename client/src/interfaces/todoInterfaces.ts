import { SsgRoute } from 'next/dist/build';

export interface ITodo {
  id: string;
  desc: string;
  isCompleted: boolean;
}

export interface IDelResp {
  success: boolean;
  message: string;
}
