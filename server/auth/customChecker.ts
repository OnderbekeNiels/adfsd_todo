import { AuthChecker } from 'type-graphql'
import { getMongoManager, MongoEntityManager } from 'typeorm'
import { Context } from 'vm'
import { User } from '../entities/UserEntity'
/**
 *@description checks if a user is authorized to use the requested query or mutation based on their role
 */
export const customAuthChecker: AuthChecker<Context> = async ({ context }) =>
  // roles, // Optional: you can use roles
  {
    const manager: MongoEntityManager = getMongoManager('mongodb')

    const user = await manager.findOne(User, {
      uuid: context.request.currentUser.uid,
    })

    if (user) {
      return true
    }

    return false
  }
