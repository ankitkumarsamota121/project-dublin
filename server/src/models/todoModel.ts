import mongoose, { Schema } from 'mongoose';

import { ITodoModel } from '../interfaces/todoInterfaces';

export const TodoSchema = new Schema(
  {
    desc: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITodoModel>('Todo', TodoSchema);
