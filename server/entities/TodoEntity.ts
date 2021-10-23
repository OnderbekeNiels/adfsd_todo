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
@InputType('TodosInput')
@Entity('Todos')
export class Todo extends BaseEntity {
  @Field(() => ID, { nullable: true }) //Field decorator, represent a Graphql field of our graphql object type
  @ObjectIdColumn() //Special decorator, to tell that this collumn represent an unique generated ID
  id?: ObjectID
  @Field()
  @Column()
  title!: string
  @Field()
  @Column()
  routineId?: string
  @Field()
  @Column()
  color!: string
  @Field()
  @Column()
  icon!: string
  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}

@InputType('CreateTodosInput')
@Entity('Todos')
export class CreateTodosInput extends Todo {}
