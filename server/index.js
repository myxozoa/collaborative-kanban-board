const { GraphQLServer, PubSub } = require('graphql-yoga');

let itemCount = 3;
const board = [
  { id: 'col1', name: 'Backlog', items: [{ id: '1', text: 'you can use this' }] },
  { id: 'col2', name: 'In Progress', items: [{ id: '2', text: 'in real time' }] },
  { id: 'col3', name: 'Done', items: [{ id: '3', text: 'with other ppl' }] },
];

const typeDefs = `
  type Query {
    info: String!,
    board: [Column]!,
    column(id: ID!, col: ID!): Column!,
    item(id: ID!, col: ID!): Item,
  }

  type Column {
    id: ID!,
    name: String!
    items: [Item]!
  }

  type Item {
    id: ID!,
    text: String!
  }

  type Mutation {
    addItem(col: ID!, text: String!): Item!,
    moveItem(id: ID!, oldCol: ID!, newCol: ID!): [Column]!,
    deleteItem(id: ID!, col: ID!): Item!,
  }

  type Subscription {
    board: [Column]!
  }

`;

const resolvers = {
  Query: {
    info: () => 'This is the collaborative Kanban Board',
    board: () => board,
    column: (_, { id, col }) => board[col],
    item: (_, { id, col }) => board[col].items.find(items => items.id === id),
  },
  Mutation: {
    addItem: (_, { col, text }, { pubsub }) => {
      const newItem = { id: ++itemCount, text };
      board[col].items.push(newItem);

      console.log(board);
      pubsub.publish('Board', { board });
      return newItem;
    },
    moveItem: (_, { id, oldCol, newCol }, { pubsub }) => {
      let item = {};
      board[oldCol].items = board[oldCol].items.filter(items => {
        if (items.id === id) {
          item = items;
          return false;
        }
        return true;
      });
      board[newCol].items.push(item);

      pubsub.publish('Board', { board });
      return board;
    },
    deleteItem: (_, { id, col }, { pubsub }) => {
      let item = {};
      board[col].items = board[col].items.filter(items => {
        if (items.id === id) {
          item = items;
          return false;
        }
        return true;
      });

      pubsub.publish('Board', { board });
      return item;
    },
  },
  Subscription: {
    board: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('Board'),
    },
  },
};

const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { pubsub },
});

server.start({ subscriptions: { keepAlive: true }, playground: '/playground' }, () => console.log('server is running on http://localhost:4000'));
