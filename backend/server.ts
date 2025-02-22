import express from 'express'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.ts';
import taskRoutes from './routes/taskRoutes.ts';
const app = express();

const PORT = process.env.PORT || '3000';

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} 🩵`);
})

