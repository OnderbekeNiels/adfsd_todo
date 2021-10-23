import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { getMongoManager, MongoEntityManager, ObjectID } from 'typeorm'
import { CreateRoutinesInput, Routine } from '../entities/RoutineEntity'

@Resolver()
export class RoutineResolver {
  manager: MongoEntityManager = getMongoManager('mongodb')

  @Query(() => [Routine], { nullable: true })
  async getRoutines(): Promise<Routine[]> {
    return await this.manager.find<Routine>(Routine)
  }

  @Query(() => Routine, { nullable: true })
  async getRoutinesById(
    @Arg('id') id: string,
  ): Promise<Routine | undefined | null> {
    const res = await this.manager.findOne<Routine>(Routine, id)
    return res
  }

  @Mutation(() => Routine, { nullable: true })
  async createRoutine(
    @Arg('data') newRoutineData: CreateRoutinesInput,
  ): Promise<Routine | undefined | null> {
    console.log(newRoutineData)

    const result = await this.manager
      .save<Routine>(newRoutineData)
      .catch(ex => console.log(ex))
    if (result) {
      return result
    } else {
      return undefined
    }
  }

  @Mutation(() => Routine)
  async updateRoutine(
    @Arg('id') id: string,
    @Arg('data') myUpdateRoutine: Routine,
  ): Promise<Routine> {
    try {
      const myRoutine: Routine | undefined = await this.manager.findOne(
        Routine,
        id,
      )

      if (myRoutine) {
        myUpdateRoutine.updatedAt = new Date()
        await this.manager.update<Routine>(Routine, id, myUpdateRoutine)
        const rnaupdate = await this.manager.findOne<Routine>(Routine, id)
        return rnaupdate
      }
    } catch (error) {
      throw new Error(`Update of the Routine with id ${id} failed.` + error)
    }
  }

  @Mutation(() => String)
  async deleteRoutine(@Arg('id') id: string): Promise<string> {
    try {
      const myRoutine: Routine | undefined = await this.manager.findOne(
        Routine,
        id,
      )

      if (myRoutine) {
        await this.manager.delete(Routine, id)
        return id
      }
    } catch (error) {
      throw new Error(`Failed to delete Routine with id ${id}.` + error)
    }
  }
}
