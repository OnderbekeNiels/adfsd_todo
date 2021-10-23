import 'reflect-metadata'
import express, { Request, Response } from 'express'
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions'
import { createConnection } from 'typeorm'
import { graphqlHTTP } from 'express-graphql'
import { GraphQLSchema } from 'graphql'
import cors from 'cors'
import { buildSchema } from 'type-graphql'

import { RoutineResolver } from './resolvers/RoutineResolver'
import { connection } from './mongo-connection'
import { TodoResolver } from './resolvers/TodoResolver'
import { UserResolver } from './resolvers/UserResolver'

const app = express(),
  port = process.env.PORT || 3000

app.use(cors())

// MIDDLEWARE
app.use(express.json()) // for parsing application/json
;(async () => {
  // All our code
  // APP SETUP
  await createConnection(connection)

  /**
   *
   * @description create the graphql schema with the imported resolvers
   */
  let schema: GraphQLSchema = {} as GraphQLSchema

  await buildSchema({
    resolvers: [RoutineResolver, TodoResolver, UserResolver],
  }).then((_: any) => {
    schema = _
  })

  // GraphQL init middleware
  app.use(
    '/v1/', // Url, do you want to keep track of a version?
    graphqlHTTP((request, response) => ({
      schema: schema,
      context: { request, response },
      graphiql: true,
    })),
  )

  // APP START -> also covered in basic Express part
  app.listen(port, () => {
    console.info(`\nWelcome 👋\nGraphQL server @ http://localhost:${port}/v1\n`)
  })
})()
