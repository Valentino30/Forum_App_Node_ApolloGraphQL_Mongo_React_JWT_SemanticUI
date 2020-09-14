require("dotenv").config();
const { connect } = require("mongoose");
const { ApolloServer } = require("apollo-server");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");

const MONGODB = process.env.MONGO_URI;
const port = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongo DB connected..."))
  .then(() => server.listen({ port }))
  .then(({ url }) => console.log(`Server running at ${url}`))
  .catch((error) => console.log(error.message));
