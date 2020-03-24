import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';
import { User } from './User';
import { Job } from './Job';

@Entity()
export class Quote {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  accepted: boolean;

  @ManyToOne(type => User, user => user.quotes)
  user: User;

  @ManyToOne(type => Job, job => job.quotes)
  job: Job
}