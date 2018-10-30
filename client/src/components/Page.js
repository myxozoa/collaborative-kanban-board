import React from 'react';

import Column from './Column';


class Page extends React.Component {
  render() {
    return (
      <React.Fragment>
      {this.props.board.map((col, index) => (
        <Column key={col.id} end={this.props.board.length - 1} number={index} id={col.id} title={col.name} color='#8E6E95' cards={col.items} />
      ))}
    </React.Fragment>
    );
  }
}

export default Page;
