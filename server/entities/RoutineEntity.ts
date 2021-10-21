import { Field, ID, InputType, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'
@ObjectType()
@InputType('RoutineInput')
@Entity('Routine')
export class Routine extends BaseEntity {
  @Field(() => ID, { nullable: true }) //Field decorator, represent a Graphql field of our graphql object type
  @ObjectIdColumn() //Special decorator, to tell that this collumn represent an unique generated ID
  id?: ObjectID
  @Field()
  @Column()
  title!: string
  @Field({ nullable: true })
  @Column()
  numberOfTodos?: number
  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}

// @InputType('CreateCoursesInput')
// @Entity('Courses')
// export class CreateCoursesInput extends Course {
//   @Field(type => [CoursesLectorInput], { nullable: true })
//   @Column(type => Lecturer)
//   lecturers: Lecturer[]
// }

// @InputType('CreateCoursesLectorInput')
// export class CoursesLectorInput {
//   @Field()
//   name: string
//   @Field()
//   language: string
// }
