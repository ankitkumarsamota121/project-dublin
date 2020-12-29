import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

import { IUserModel } from '../interfaces/userInterfaces';

const UserSchema = new Schema(
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
    todos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Todo',
      },
    ],
  },
  { timestamps: true }
);

UserSchema.methods.matchPassword = async function (password: string): Promise<boolean> {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

UserSchema.pre<IUserModel>('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

export default mongoose.model<IUserModel>('User', UserSchema);
