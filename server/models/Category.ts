import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column
} from 'typeorm';
import { Job } from './Job';

@Entity()
export class Category {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string
  
  @OneToMany(type => Job, job => job.category)
  jobs: Job[]
}