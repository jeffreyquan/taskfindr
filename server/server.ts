import express from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import 'reflect-metadata';
import databaseService from './services/DatabaseService';
import { User } from './models/user';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from './repositories/UserRepository';
import initializePassport from './controllers/authController';

const LocalStrategy = passportLocal.Strategy;

initializePassport(passport, email => {
  
}) 

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Server is running on port ${ port }`);
  console.log('Initialising database...');
  await databaseService.initDB();
  console.log('Database connected')
})