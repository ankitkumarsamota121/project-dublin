import { errorClg } from '../../utils/loggers';
import { IUser, IGetUserArgs, IAuthResp, ILoginArgs } from '../../interfaces/userInterfaces';
import { IContext } from '../../interfaces/gqlInterfaces';
import { ICreateTodoArgs } from '../../interfaces/todoInterfaces';

export default {
  Query: {
    getAllTodos: async (_: any, __: any, { auth }: IContext): Promise<any> => {
      return 'This will get all the todos.';
    },
  },

  Mutation: {
    createTodo: async (
      _: any,
      { desc }: ICreateTodoArgs,
      { auth, User, Todo }: IContext
    ): Promise<any> => {
      if (!auth.isAuth) {
        return 'Hey, Come on! Just Login first.';
      }

      return 'You have the access to the protected information!';
    },
  },
};
