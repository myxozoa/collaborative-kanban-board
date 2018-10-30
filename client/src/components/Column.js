import React from 'react';
import Card from './Card.js';
import shortid from 'shortid';
import PropTypes from 'prop-types';

class Column extends React.Component {

  generateCard = (autotext) => {
    let cardText;
    if(autotext) {
      cardText = prompt('What is the task?');
    } else {
      cardText = `Column ${this.props.id}`;
    }
    const newCard = { text: cardText, id: shortid.generate(), moveCard: this.props.moveCard, column: this.props.id };
    this.props.addNewCard(this.props.id, newCard);
  }

  componentDidMount() {
    // for(let i = 0; i < 2; i++) {
    //   this.generateCard(false);
    // }
  }

  render() {
    return (
      <div className="columns">
        <header className="title" style={{background: this.props.color}}>{this.props.title}</header>
        {this.props.cards.map((el, index) => {
          return <Card {...el} end={this.props.end} column={this.props.number} key={index}/>;
        })}
        <button className='new-card' onClick={this.generateCard}>+Add New Card</button>
      </div>
    )}
}

export default Column;

Column.propTypes = {
  title: PropTypes.string,
  cards: PropTypes.array,
};