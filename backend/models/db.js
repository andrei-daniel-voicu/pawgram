const mongoose = require('mongoose');

mongoose
  .connect(
    "mongodb+srv://pawgram:parola@cluster0.dtj4g.mongodb.net/Pawgram",
    //process.env.MONGO_URI,
     {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('our db is connected');
  })
  .catch(err => console.log(err.message));
