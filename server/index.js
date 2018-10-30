const { GraphQLServer, PubSub } = require('graphql-yoga');

let itemCount = 3;
let mouseCount = 0;
const board = [{name: 'In', items: [{id: '1', name: 'test'}]},{name: '', items: [{id: '2', name: 'test'}]},{items: [{id: '3', name: 'test'}]}];
const mousePositions = [];

const typeDefs = `
  type Query {
    info: String!,
    board: [Column]!,
    item(id: ID!, col: ID!): Item,
    mousePositions: [Mouse]!,
  }

  type Mouse {
    name: String,
    x: Float!,
    y: Float!,
  }

  type Column {
    name: String!
    items: [Item]!
  }

  type Item {
    id: ID!,
    name: String!
  }

  type Mutation {
    addItem(col: ID!, name: String!): Item!,
    moveItem(id: ID!, oldCol: ID!, newCol: ID!): Item!,
    deleteItem(id: ID!, col: ID!): Item!,
    addMouse(name: String): Mouse!,
    moveMouse(id: ID!, x: Float!, y: Float!): Mouse!,
  }

  type Subscription {
    mousePositions: [Mouse]!
  }
`;

const resolvers = {
  Query: {
    info: () => 'This is the collaborative Kanban Board',
    board: () => board,
    item: (_, { id, col }) => board[col].items.find((items) => items.id === id),
    mousePositions: () => mousePositions,
  },
  Mutation: {
    addItem: (_, { col, name }) => {
      const newItem = { id: ++itemCount, name };
      board[col].items.push(newItem);

      console.log(board);
      return newItem;
    },
    moveItem: (_, { id, oldCol, newCol }) => {
      let item = {};
      board[oldCol].items = board[oldCol].items.filter((items) => {
        if(items.id === id) {
          item = items;
          return false;
        }
        return true;
      });
      board[newCol].items.push(item);
      return item;
    },
    deleteItem: (_, { id, col }) => {},
    addMouse: (_, { name }, { pubsub }) => {
      mousePositions[mouseCount++] = { name, x: 0, y: 0 };
      console.log(mousePositions);

      pubsub.publish('Mouse', { mousePositions });
      return mousePositions[mouseCount - 1];
    },
    moveMouse: (_, { id, x, y }, { pubsub }) => {
      mousePositions[id].x = x;
      mousePositions[id].y = y;
      console.log(mousePositions);

      pubsub.publish('Mouse', { mousePositions });
      return mousePositions[id];
    },
  },
  Subscription: {
    mousePositions: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('Mouse'),
    }
  }
}

const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { pubsub }
});

server.start(() => console.log('server is running on http://localhost:4000'));
