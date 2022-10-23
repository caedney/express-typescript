import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import routes from './routes';

const app = express();

// Adds new headers for security
app.use(helmet());
// Allows json to be passed in the req body
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const middleware =
  ({ name }: { name: string }) =>
  (req: Request, res: Response, next: NextFunction) => {
    res.locals.name = name;
    next();
  };

// Route Parameters with global middleware
app.use(middleware({ name: 'Craig' }));

routes(app);

app.listen(3000, () => {
  console.log('Application listening at http://localhost:3000');
});
