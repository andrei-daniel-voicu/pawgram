const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();
require('./models/db');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const messageRouter = require('./routes/message');
const adoptionRouter = require('./routes/adoption');

// const User = require('./models/user');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors({
  origin: '*'
}))

app.use(userRouter);
app.use(postRouter);
app.use(messageRouter);
app.use(adoptionRouter);


app.get('/test', (req, res) => {
  res.send('Hello world');
});

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Welcome to backend zone!' });
});

app.listen(2345, () => {
  console.log('port is listening');
});
