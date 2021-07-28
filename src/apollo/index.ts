import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/api/graphql_dev',
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})
// const query = gql`query MyQuery {
//   users {
//     id
//   }
// }`
// apolloClient.query({
//   query
// }).then(e => console.log(e))

export default apolloClient
