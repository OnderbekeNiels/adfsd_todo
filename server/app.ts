import 'reflect-metadata'
import express, { NextFunction, Request, response, Response } from 'express'
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions'
import { createConnection } from 'typeorm'
import { graphqlHTTP } from 'express-graphql'
import { GraphQLSchema } from 'graphql'
import cors from 'cors'
import { buildSchema } from 'type-graphql'
import dotenv from 'dotenv'
import admin from 'firebase-admin'
import authMiddleware from './auth/firebase.middleware'

import { RoutineResolver } from './resolvers/RoutineResolver'
import { connection } from './mongo-connection'
import { TodoResolver } from './resolvers/TodoResolver'
import { UserResolver } from './resolvers/UserResolver'

const app = express(),
  port = process.env.PORT || 3000

app.use(cors())

dotenv.config()

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
})

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

  app.use(authMiddleware)

  // GraphQL init middleware
  app.use(
    '/v1/', // Url, do you want to keep track of a version?
    graphqlHTTP((request, response) => ({
      schema: schema,
      context: { request, response },
      graphiql: true,
    })),
  )

  app.post(
    '/signup',
    async (request: Request, response: Response, next: NextFunction) => {
      const { email, password, name } = request.body

      const user = await admin.auth().createUser({
        email,
        password,
        displayName: name,
      })

      return response.json(user)
    },
  )

  app.get(
    '/test',
    (request: Request, response: Response, next: NextFunction) => {
      console.log('hey')
      return response.json({ ok: 'ja' })
    },
  )

  // APP START -> also covered in basic Express part
  app.listen(port, () => {
    console.info(`\nWelcome 👋\nGraphQL server @ http://localhost:${port}/v1\n`)
  })
})()
