const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();
require('./models/db');
const userRouter = require('./routes/user');

const User = require('./models/user');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
// app.use(express.json());
app.use(cors({
  origin: '*'
}))


app.use(userRouter);

// const test = async (email, password) => {
//   const user = await User.findOne({ email: email });
//   const result = await user.comparePassword(password);
//   console.log(result);
// };

// test('niraj@email.com', 'niraj12');

app.get('/test', (req, res) => {
  res.send('Hello world');
});

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Welcome to backend zone!' });
});

app.listen(2345, () => {
  console.log('port is listening');
});
