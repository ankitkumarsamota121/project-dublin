import '../styles/globals.css';
import '../styles/bootstrap.min.css';
import { ApolloProvider } from '@apollo/client';

import client from '../src/graphql/config';
import Root from '../src/redux/Root';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Root>
        <Component {...pageProps} />
      </Root>
    </ApolloProvider>
  );
}

export default MyApp;
