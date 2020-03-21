import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { Job } from './Job';
import { Quote } from './Quote';

export enum UserType {
  CUSTOMER = "customer",
  BUSINESS = "business",
  GHOST = "ghost"
}

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.GHOST
  })
  membership: UserType;

  @OneToMany(type => Quote, quote => quote.user )
  quotes: Quote[];

  @OneToMany(type => Job, job => job.user)
  jobs: Job[];
}