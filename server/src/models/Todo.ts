import mongoose, { Schema } from 'mongoose';

import { ITodo } from '../interfaces/todoInterfaces';

export const TodoSchema: Schema<ITodo> = new Schema(
  {
    desc: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITodo>('Todo', TodoSchema);
