import { errorClg } from '../../utils/loggers';
import { IUser } from '../../interfaces/userInterfaces';
import { IContext } from '../../interfaces/gqlInterfaces';

export default {
  Query: {
    getAllUsers: async (_: any, args: null, { User }: IContext): Promise<IUser[]> => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        errorClg(error.message);
        return [];
      }
    },
  },

  Mutation: {
    registerUser: async (
      _: any,
      { name, email, password }: IUser,
      { User }: IContext
    ): Promise<IUser> => {
      const user = await User.create({ name, email, password });
      await user.save();
      return user;
    },
  },
};
