import express from 'express';
import { getCustomRepository } from 'typeorm';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import passport from 'passport';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password, membership } = req.body;

  const userRepository = getCustomRepository(UserRepository);

  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    return res.status(400).send({ message: 'User already exists' });
  }

  const user = await userRepository.createUser(name, email, password, membership);

  return res.status(200).send(user);
})

router.post('/login', (req, res) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
})

export default router;