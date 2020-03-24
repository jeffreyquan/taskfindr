import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/user';

const LocalStrategy = passportLocal.Strategy;

function initialize(passport: any) {
  const authenticateUser = (email: string, password: string, done: any) => {

    const authError: Error = new Error("Email or Password is incorrect");

    const emailError: Error = new Error("User does not exist")

    const userRepository = getCustomRepository(
      UserRepository
    );

    let user: User | undefined;

    userRepository.findByEmail(email).then((userEntity) => {
      user = userEntity;
    });

    if (user === null) {
      return done(emailError);
    }

    try {
      if (user && user.comparePassword(password)) {
        return done(null, user);
      } else {
        return done(authError);
      }
    } catch(e) {
      return done(e);
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

  passport.serializeUser((user: User, done: any) => {

  })
  passport.deserializeUser((user: User, done: any) => {
  })
}

export default initialize;