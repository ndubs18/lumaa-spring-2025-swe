import express from 'express'
import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { createNewTask, getAllTasks, removeTask, editTask, changeStatusOfTask } from '../db/models/taskModel.ts'

import type { TaskDto } from '../db/models/taskModel.ts';
const router = express.Router();

router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    let queryRes = await getAllTasks()
    let resultList: TaskDto[] = queryRes.rows.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      isComplete: task.iscomplete
    })
    )
    res.status(200).json(resultList);
  } catch (error) {
    res.status(500).json('server error')
  }
});

router.post('/', verifyToken, async (req: Request, res: Response) => {
  try {
    let result = await createNewTask(req.body.title, req.body.description);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).send('server error');
  }
});

router.put('/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    let result = await editTask(req.body);
    res.status(204).json(result);
  } catch (error) {
    res.status(500).send('server error')
  }

});

router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    let result = await removeTask(req.body.id);
    if (result.rows[0]) {
      res.status(204).json(result);
    }
  } catch (error) {
    res.status(500).send('server error');
  }
});

function verifyToken(req : Request, res : Response, next) {
  console.log("Checking for token present in request header.");
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  console.log(token);
  // JWT not present in header
  if (!token) {
    console.log("No token found. 401 error returned to client.");
    return res.status(401).send('Unauthorized access');
  }
  try {
    console.log("Now verifying token.");
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // Add decoded user information to req object
    req.user = decoded;
    console.log("Token verified.");
    next();
  } catch (err) {
    console.log("Token is invalid. 403 error returned to client.");
    // JWT present in cookies but is invalid
    res.status(403).send('Invalid token');
  }
};

export default router;