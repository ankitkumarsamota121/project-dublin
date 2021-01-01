import { ApolloClient, InMemoryCache } from '@apollo/client';

let token: string = '';
if (typeof window !== 'undefined') {
  const tokenFromStorage = localStorage.getItem('token');
  token = tokenFromStorage ? JSON.parse(tokenFromStorage) : '';
}

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Brearer ${token}`,
  },
});

export default client;
