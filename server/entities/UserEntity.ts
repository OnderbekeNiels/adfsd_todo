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
@InputType('UsersInput')
@Entity('Users')
export class User extends BaseEntity {
  @Field(() => ID, { nullable: true }) //Field decorator, represent a Graphql field of our graphql object type
  @ObjectIdColumn() //Special decorator, to tell that this collumn represent an unique generated ID
  id?: ObjectID
  @Field({ nullable: true })
  @Column()
  uuid?: string
  @Field()
  @Column()
  name!: string
  @Field({ nullable: true })
  @Column()
  lastActive?: Date
  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}

@InputType('CreateUsersInput')
@Entity('Users')
export class CreateUsersInput extends User {}
