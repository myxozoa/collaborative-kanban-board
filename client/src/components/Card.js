import React from 'react';

function Card(props) {
  return (
    <div className="card">
      {props.column !== 0 && <button className='card-mover' onClick={() => props.moveCard(props.id, 'left')}>{'<'}</button>}
      <p className="text">{props.text}</p>
      {props.column !== 3 && <button className='card-mover' onClick={() => props.moveCard(props.id, 'right')}>{'>'}</button>}
    </div>
  );
}

export default Card;