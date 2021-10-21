import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { getMongoManager, MongoEntityManager, ObjectID } from 'typeorm'
import { Routine } from '../entities/RoutineEntity'

@Resolver()
export class RoutineResolver {
  manager: MongoEntityManager = getMongoManager('mongodb')

  @Query(() => [Routine], { nullable: true })
  async getRoutines(): Promise<Routine[]> {
    return await this.manager.find<Routine>(Routine);
  }

  @Query(() => Routine, { nullable: true })
  async getRoutinesById(
    @Arg('id') id: string,
  ): Promise<Routine | undefined | null> {
    const res = await this.manager.findOne<Routine>(Routine, id)
    return res
  }

//   @Mutation(() => Course, { nullable: true })
//   async createCourse(
//     @Arg('data') newCourseData: CreateCoursesInput,
//   ): Promise<Course | undefined | null> {
//     console.log(newCourseData)

//     const result = await this.manager
//       .save<Course>(newCourseData)
//       .catch(ex => console.log(ex))
//     if (result) {
//       return result
//     } else {
//       return undefined
//     }
//   }

//   @Mutation(() => Course)
//   async updateCourse(
//     @Arg('id') id: string,
//     @Arg('data') myUpdateCourse: Course,
//   ): Promise<Course> {
//     try {
//       const myCourse: Course | undefined = await this.manager.findOne(
//         Course,
//         id,
//       )

//       if (myCourse) {
//         myUpdateCourse.updatedAt = new Date()
//         await this.manager.update<Course>(Course, id, myUpdateCourse)
//         const rnaupdate = await this.manager.findOne<Course>(Course, id)
//         return rnaupdate
//       }
//     } catch (error) {
//       throw new Error(`Update of the Course with id ${id} failed.` + error)
//     }
//   }

//   @Mutation(() => String)
//   async deleteCourse(@Arg('id') id: string): Promise<string> {
//     try {
//       const myCourse: Course | undefined = await this.manager.findOne(
//         Course,
//         id,
//       )

//       if (myCourse) {
//         await this.manager.delete(Course, id)
//         return id
//       }
//     } catch (error) {
//       throw new Error(`Failed to delete todo with id ${id}.` + error)
//     }
//   }
}
