import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Subscription } from 'react-apollo';

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
            <Page board={data.board}/>
          );
        }}
        </Query>
      </div>
    );
  }
}

export default App;
