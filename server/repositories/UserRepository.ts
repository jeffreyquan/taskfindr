import { EntityRepository, Repository } from 'typeorm';
import { User, MembershipType } from '../models/User';
import bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(
    name: string,
    email: string,
    password: string,
    membership: MembershipType
  ) {
    
    let user = this.create();
    user.name = name;
    user.email = email;
    user.membership = membership;
    user.jobs = [];
    user.quotes = [];

    const saltRounds = 10;

    await bcrypt.hash(password, saltRounds).then(hash => {
      user.password = hash;
    });

    return this.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
   return await this.findOne({
      where: { email }
    });
  }
}