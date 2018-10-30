import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const MOVE_ITEM = gql`
  mutation moveItem($id: ID!, $oldCol: ID!, $newCol: ID!) {
    moveItem(id: $id, oldCol: $oldCol, newCol: $newCol) {
      id,
      name,
      items {
        id,
        text
      }
    }
  }
`;

function Card(props) {
  console.log(props);
  return (
    <div className="card">
      <Mutation mutation={MOVE_ITEM}>
        {(moveItem, { loading, error }) => (
          <React.Fragment>
            <button
              className={['card-mover', props.column === 0 ? 'hide' : 'show'].join(' ')}
              onClick={() => {
                moveItem({ variables: { id: props.id, oldCol: props.column, newCol: props.column - 1 } });
              }}
            >
              {'<'}
            </button>
            <p className="text">{props.text}</p>
            {error && 'Error::::'}
            <button
              className={['card-mover', props.column === props.end ? 'hide' : 'show'].join(' ')}
              onClick={() => {
                moveItem({ variables: { id: props.id, oldCol: props.column, newCol: props.column + 1 } });
              }}
            >
              {'>'}
            </button>
          </React.Fragment>
        )}
      </Mutation>
    </div>
  );
}

export default Card;
