import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { GET_BOARD } from '../App';

import Card from './Card.js';

const ADD_ITEM = gql`
  mutation addItem($col: ID!, $text: String!) {
    addItem(col: $col, text: $text) {
      id,
      text
    }
  }
`;

class Column extends React.Component {

  generateCard = (addItem) => {
    const cardText = prompt('Whats the task?');
    addItem({ variables: { col: this.props.number, text: cardText }});
  }

  render() {
    return (
      <div className="columns">
      <Mutation mutation={ADD_ITEM}
      update={(cache, { data: { addItem } }) => {
        const { board } = cache.readQuery({ query: GET_BOARD });
        board[this.props.number].items.push(addItem);
        cache.writeQuery({
          query: GET_BOARD,
          data: { board }
        });
      }}
      >
        {(addItem, { loading, error }) => (
          <React.Fragment>
            <header className="title" style={{background: this.props.color}}>{this.props.title}</header>
            {error && 'Error::::'}
            {this.props.cards.map((el, index) => (
              <Card {...el} end={this.props.end} column={this.props.number} key={index}/>
            ))}
            <button className='new-card' onClick={() => this.generateCard(addItem)}>+Add New Card</button>
          </React.Fragment>
        )}
      </Mutation>
      </div>
    )}
}

export default Column;

Column.propTypes = {
  title: PropTypes.string,
  cards: PropTypes.array,
};