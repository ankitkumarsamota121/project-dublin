import { errorClg } from '../../utils/loggers';
import {
  IUser,
  IAuthResp,
  ILoginArgs,
  IRegisterArgs,
  IDelUserResp,
} from '../../interfaces/userInterfaces';
import { IContext } from '../../interfaces/gqlInterfaces';
import generateToken from '../../utils/generateToken';

export default {
  Query: {
    hello: () => 'Hello World!',

    getAllUsers: async (_: any, args: null, { User }: IContext): Promise<IUser[] | Error> => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        errorClg(error.message);
        return error;
      }
    },
    getUser: async (_: any, __: any, { auth, User }: IContext): Promise<IUser | Error> => {
      try {
        const user = await User.findById(auth.userId);
        if (!user) {
          return new Error('User not found!');
        }

        return user;
      } catch (error) {
        errorClg(error.message);
        return error;
      }
    },
    loginUser: async (
      _: any,
      { email, password }: ILoginArgs,
      { User }: IContext
    ): Promise<IAuthResp | Error> => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('Unable to find user!');
        }
        const auth = await user.matchPassword(password);
        if (auth) {
          const token = generateToken(user._id);
          if (!token || token instanceof Error) {
            throw new Error('Some Error Occured. Unable to generate a token!');
          }

          return { user, token };
        } else {
          throw new Error('Invalid Username or Password!');
        }
      } catch (error) {
        errorClg(error.message);
        return error;
      }
    },
  },

  Mutation: {
    registerUser: async (
      _: any,
      { name, email, password }: IRegisterArgs,
      { User }: IContext
    ): Promise<IAuthResp | Error> => {
      try {
        const user = await User.create({ name, email, password, todos: [] });
        if (!user) {
          throw new Error('Some Error occured. Unable to create new User!');
        }

        const token = generateToken(user._id);
        if (!token || token instanceof Error) {
          throw new Error('Some Error occured. Unable to generate a token!');
        }

        return { user, token };
      } catch (error) {
        errorClg(error.message);
        return error;
      }
    },

    deleteUser: async (
      _: any,
      __: any,
      { auth, User, Todo }: IContext
    ): Promise<IDelUserResp | Error> => {
      try {
        if (!auth.isAuth) {
          return new Error('User not authenticated!');
        }

        const user = await User.findById(auth.userId);
        if (!user) {
          return new Error('User not found!');
        }

        await Todo.deleteMany({ user: user._id });
        await User.deleteOne({ _id: auth.userId });

        return {
          success: true,
          message: 'User deleted successfully!',
        };
      } catch (error) {
        errorClg(error.message);
        return error;
      }
    },
  },
};
