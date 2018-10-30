import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import './Reset.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.error(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: 'http://localhost:4000',
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache()
});

ReactDOM.render((
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
), document.getElementById('root'));

registerServiceWorker();
