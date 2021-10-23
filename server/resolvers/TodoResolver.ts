import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { getMongoManager, MongoEntityManager, ObjectID } from 'typeorm'
import { Routine } from '../entities/RoutineEntity'
import { CreateTodosInput, Todo } from '../entities/TodoEntity'

@Resolver()
export class TodoResolver {
  manager: MongoEntityManager = getMongoManager('mongodb')

  @Query(() => [Todo], { nullable: true })
  async getTodos(): Promise<Todo[]> {
    return await this.manager.find<Todo>(Todo)
  }

  @Query(() => Todo, { nullable: true })
  async getTodosById(@Arg('id') id: string): Promise<Todo | undefined | null> {
    const res = await this.manager.findOne<Todo>(Todo, id)
    return res
  }

  @Mutation(() => Todo, { nullable: true })
  async createTodo(
    @Arg('data') newTodoData: CreateTodosInput,
  ): Promise<Todo | undefined | null> {
    console.log(newTodoData)

    const result = await this.manager
      .save<Todo>(newTodoData)
      .catch(ex => console.log(ex))

    if (result) {
      // ! Update number of todos for a routine
      const myRoutine: Routine | undefined = await this.manager.findOne(
        Routine,
        newTodoData.routineId,
      )

      if (myRoutine) {
        myRoutine.numberOfTodos += 1
        myRoutine.updatedAt = new Date()
        await this.manager.update<Routine>(
          Routine,
          newTodoData.routineId,
          myRoutine,
        )
      }
      if (myRoutine) {
        return result
      } else {
        return undefined
      }
    } else {
      return undefined
    }
  }

  @Mutation(() => Boolean)
  async updateTodo(
    @Arg('id') id: string,
    @Arg('data') myUpdateTodo: Todo,
  ): Promise<Boolean> {
    try {
      const myTodo: Todo | undefined = await this.manager.findOne(Todo, id)

      if (myTodo) {
        myUpdateTodo.updatedAt = new Date()
        await this.manager.update<Todo>(Todo, id, myUpdateTodo)
        const rnaupdate = await this.manager.findOne<Todo>(Todo, id)
        return true
      }
      else{
          return false
      }
    } catch (error) {
      throw new Error(`Update of the Todo with id ${id} failed.` + error)
    }
  }

  @Mutation(() => String)
  async deleteTodo(@Arg('id') id: string): Promise<string> {
    try {
      const myTodo: Todo | undefined = await this.manager.findOne(Todo, id)

      if (myTodo) {
        await this.manager.delete(Todo, id)

        // ! Update number of todos for a routine
        const myRoutine: Routine | undefined = await this.manager.findOne(
          Routine,
          myTodo.routineId,
        )

        if (myRoutine) {
          myRoutine.numberOfTodos -= 1
          await this.manager.update<Routine>(
            Routine,
            myTodo.routineId,
            myRoutine,
          )
        }
        return id
      } else {
        throw new Error(`Failed to delete Todo with id ${id}.`)
      }
    } catch (error) {
      throw new Error(`Failed to delete Todo with id ${id}.` + error)
    }
  }
}
