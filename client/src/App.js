import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Page from './components/Page';
import './App.css';

export const GET_BOARD = gql`
  {
    board {
      id,
      name,
      items {
        id,
        text
      }
    }
  }
`;

const BOARD_SUB = gql`
  subscription {
    board {
      id,
      name,
      items {
        id,
        text,
      }
    }
  }
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Query query={GET_BOARD}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return "Loading...";
          if (error) return `Error: ${error.message}`;

          return (
            <Page board={data.board} subscribeToBoardChanges={() =>
              (subscribeToMore({
                document: BOARD_SUB,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;
                  console.log(prev);

                  console.log(subscriptionData);
                  console.log(subscriptionData);

                  return { data: { board: [...prev.board, subscriptionData ]}};
                }
              }))}/>
          );
        }}
        </Query>
      </div>
    );
  }
}

export default App;
