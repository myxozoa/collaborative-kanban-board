import React from 'react';

function Card(props) {
  return (
    <div className="card">
      <button className={['card-mover', props.column === 0 ? 'hide' : 'show'].join(' ')} onClick={() => props.moveCard(props.id, 'left')}>{'<'}</button>
      <p className="text">{props.text}</p>
      <button className={['card-mover', props.column === props.end ? 'hide' : 'show'].join(' ')} onClick={() => props.moveCard(props.id, 'right')}>{'>'}</button>
    </div>
  );
}

export default Card;