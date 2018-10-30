const { GraphQLServer } = require('graphql-yoga');

const board = [{name: '', items: [{id: '1', name: 'test'}]},{items: [{id: '2', name: 'test'}]},{items: [{id: '3', name: 'test'}]}];

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
    name: String!
  }

  type Mutation {
    addItem(id: ID!, col: ID!): Item!,
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
    addItem: (_, { id, oldCol, newCol }) => {},
    moveItem: (_, { id, oldCol, newCol }) => {},
    deleteItem: (_, { id, col }) => {},
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log('server is running on http://localhost:4000'));
