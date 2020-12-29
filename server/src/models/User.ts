import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

import { TodoSchema } from './Todo';
import { IUser } from '../interfaces/userInterfaces';

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    todos: [TodoSchema],
  },
  { timestamps: true }
);

UserSchema.methods.matchPassword = async function (password: string): Promise<boolean> {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

UserSchema.pre('save', async function (this: IUser, next) {
  const user = this;
  if (!user.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

export default mongoose.model<IUser>('User', UserSchema);
