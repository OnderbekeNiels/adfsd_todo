import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";

export const connection: MongoConnectionOptions = {
  name: 'mongodb', // Useful for reference later on
  type: 'mongodb',
  url: 'mongodb+srv://admin:zG4yB-Cu9mQK*xU@cluster0.zqxjp.mongodb.net/todo_db?retryWrites=true&w=majority',
  useNewUrlParser: true,
  synchronize: true,
  logging: true,
  useUnifiedTopology: true,
  entities: [`${__dirname}/entities/*{.ts,.js}`],
  ssl: true, // false for local dev.
}