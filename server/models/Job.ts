import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { User } from './user';
import { Category } from './Category';
import { Quote } from './Quote';

@Entity()
export class Job {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  active: boolean;

  @ManyToOne(type => User, user => user.jobs)
  user: User

  @ManyToOne(type => Category, category => category.jobs)
  category: Category

  @OneToMany(type => Quote, quote => quote.job)
  quotes: Quote[]
}