import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import router from './app/route';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import NotFound from './app/middleware/NotFound';




const app: Application = express()
app.use(express.json());

app.use(cors({
  origin: "https://tech-tips-khaki.vercel.app",
  credentials: true
}));
app.use(cookieParser());
app.use("/api", router);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello Wrold')
})

app.use(globalErrorHandler);
// app.use(NotFound);

export default app;