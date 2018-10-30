import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
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

class App extends Component {
  moveCard = (id, direction) => {
    this.setState((prev) => {
      const newState = prev.columns.slice();
      let cardToMove = null;
      let index = null;
      let cardNumber = null;


      for(let i = 0; i < newState.length; i++) {
        for(let m = 0; m < newState[i].length; m++) {
          if(newState[i][m].id === id) {
            index = i;
            cardNumber = m;
          }
        }
      }

      cardToMove = newState[index].splice(cardNumber, 1)[0];

      let destination = index;

      if(direction === 'left') {
        destination = --destination >= 0 ? destination : 0;
      } else if (direction === 'right') {
        destination = ++destination <= this.state.columns.length - 1 ? destination : this.state.columns.length - 1;
      }

      newState[destination].push(cardToMove);
      return {columns: newState};
    });
  }

  state = {
    columns: [
      [],
      [],
      [],
      [],
    ],
  }

  addNewCard = (column, card) => {
    this.setState((prev) => {
      const newState = prev.columns.slice();
      newState[column].push(card);
      return { columns: newState };
    });
  }


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
