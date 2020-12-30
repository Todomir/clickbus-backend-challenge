import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:3000`);
});
