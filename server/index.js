const { GraphQLServer } = require('graphql-yoga');

let count = 3;
const board = [{name: 'In', items: [{id: '1', name: 'test'}]},{name: '', items: [{id: '2', name: 'test'}]},{items: [{id: '3', name: 'test'}]}];

const typeDefs = `
  type Query {
    info: String!,
    board: [Column]!,
    item(id: ID!, col: ID!): Item
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
    deleteItem(id: ID!, col: ID!): Item!
  }
`;

const resolvers = {
  Query: {
    info: () => 'This is the collaborative Kanban Board',
    board: () => board,
    item: (_, { id, col }) => board[col].items.find((items) => items.id === id),
  },
  Mutation: {
    addItem: (_, { col, name }) => {
      const newItem = { id: ++count, name };
      board[col].items.push(newItem);

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
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log('server is running on http://localhost:4000'));
