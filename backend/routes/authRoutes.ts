import express from 'express'
import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createNewUser, findUser } from '../db/models/userModel.ts'

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const saltRounds = 10; // Recommended value
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    let queryRes = await createNewUser(req.body.username, hashedPassword)

    res.status(201).json(queryRes.rows[0])
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.name, message: error.detail });
  }
})

router.post('/login', async (req: Request, res: Response, next) => {
  try {
    const result = await findUser(req.body.username);
    if (!result.rows[0]) {
      res.status(400).send('invalid credentials');
      return;
    }
    const isPwdMatch = await bcrypt.compare(req.body.password, result.rows[0].password);
    if (!isPwdMatch) {
      res.status(400).json({ error: 'error', message: 'invalid credentials' });
      return;
    }
    let token = await jwt.sign({ username: req.body.username }, process.env.SECRET_KEY, {
      expiresIn: '1h'
    })
    res.set('Authorization', `Bearer ${token}`);
    res.status(200).json({ token: token });

  } catch (error) {
    res.status(500).json({ error: 'error', message: 'server error' });
  }

})

export default router;
