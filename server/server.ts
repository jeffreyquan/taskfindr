import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { Strategy } from 'passport-local';
import 'reflect-metadata';
import databaseService from './services/DatabaseService';
import userRoutes from './routes/userRoutes';
import session from 'express-session';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from './repositories/UserRepository';
import { User } from './models/User';
import { DEFAULT_COOKIE_EXPIRY } from './config/sessionConfig';

const app = express();

passport.use(
  new Strategy(
    { usernameField: "email" },
    async (email: string, password: string, done: any) => {
      const authError: Error = new Error("Email or Password is incorrect");

      const emailError: Error = new Error("User does not exist");

      const user = await getCustomRepository(UserRepository).findByEmail(email);

      if (user == null) {
        return done(emailError);
      }

      try {
        if (user && user.comparePassword(password)) {
          return done(null, user);
        } else {
          return done(authError);
        }
      } catch (e) {
        return done(e);
      }
    }
  )
);

passport.serializeUser((user: User, done: any) => {
  done(null, user.id);
});

passport.deserializeUser((user: User, done: any) => {
  done(
    null,
    getCustomRepository(UserRepository).findOne({
      where: { id: user.id }
    })
  );
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'S3cret',
  cookie: {
    maxAge: DEFAULT_COOKIE_EXPIRY,
    secure: false
  }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Server is running on port ${ port }`);
  console.log("Initializing database...");
  await databaseService.initDB();
  console.log("Database connected");
});