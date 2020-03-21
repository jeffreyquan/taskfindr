import express from 'express';
import cors from 'cors';
import passport from 'passport';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${ port }`);
})