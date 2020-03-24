import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  AfterLoad
} from 'typeorm';
import bcrypt from 'bcrypt';
import { Job } from './Job';
import { Quote } from './Quote';

export enum MembershipType {
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

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: MembershipType,
    default: MembershipType.GHOST
  })
  membership: MembershipType;

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  @OneToMany(
    type => Quote,
    quote => quote.user
  )
  quotes: Quote[];

  @OneToMany(
    type => Job,
    job => job.user
  )
  jobs: Job[];
}