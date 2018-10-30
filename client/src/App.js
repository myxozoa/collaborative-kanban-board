import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Subscription } from 'react-apollo';
import Column from './components/Column.js';
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

// const BOARD_SUB = gql`
//   subscription {
//     board {
//       id,
//       name,
//       items {
//         id,
//         text,
//       }
//     }
//   }
// `;

class App extends Component {
  render() {
    return (
      <div className="App">
      <Query query={GET_BOARD}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error: ${error.message}`;

        console.log(data);
        return (
          <React.Fragment>
            {data.board.map((col, index) => (
              <Column key={col.id} end={data.board.length - 1} number={index} id={col.id} title={col.name} color='#8E6E95' cards={col.items} addNewCard={() => {}} moveCard={() => {}} />
            ))}
          </React.Fragment>
        );
      }}
      </Query>
        {/* <Column id={0} title='Winnie' color='#8E6E95' cards={this.state.columns[0]} addNewCard={this.addNewCard} moveCard={this.moveCard}/>
        <Column id={1} title='Bob' color='#39A59C' cards={this.state.columns[1]} addNewCard={this.addNewCard} moveCard={this.moveCard}/>
        <Column id={2} title='Thomas' color='#344759' cards={this.state.columns[2]} addNewCard={this.addNewCard} moveCard={this.moveCard}/>
        <Column id={3} title='George' color='#E8741E' cards={this.state.columns[3]} addNewCard={this.addNewCard} moveCard={this.moveCard}/> */}
      </div>
    );
  }
}

export default App;
