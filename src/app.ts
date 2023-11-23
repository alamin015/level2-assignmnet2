import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './app/user/user.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});

// application router
app.use('/api', userRouter.router);

export default app;
