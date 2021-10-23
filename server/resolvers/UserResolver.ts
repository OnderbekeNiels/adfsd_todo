import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { getMongoManager, MongoEntityManager, ObjectID } from 'typeorm'
import { Routine } from '../entities/RoutineEntity'
import { CreateUsersInput, User } from '../entities/UserEntity'

@Resolver()
export class UserResolver {
  manager: MongoEntityManager = getMongoManager('mongodb')

  @Query(() => [User], { nullable: true })
  async getUsers(): Promise<User[]> {
    return await this.manager.find<User>(User)
  }

  @Query(() => User, { nullable: true })
  async getUsersById(@Arg('id') id: string): Promise<User | undefined | null> {
    const res = await this.manager.findOne<User>(User, id)
    return res
  }

  @Mutation(() => User, { nullable: true })
  async createUser(
    @Arg('data') newUserData: CreateUsersInput,
  ): Promise<User | undefined | null> {
    console.log(newUserData)

    const result = await this.manager
      .save<User>(newUserData)
      .catch(ex => console.log(ex))

    if (result) {
      return result
    } else {
      return undefined
    }
  }
}
