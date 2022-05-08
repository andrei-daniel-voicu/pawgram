const mongoose = require('mongoose');

mongoose
  .connect(
    "mongodb+srv://pawgram:parola@cluster0.dtj4g.mongodb.net/Pawgram",
     {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('our db is connected');
  })
  .catch(err => console.log(err.message));


//process.env.MONGO_URI,

// const connect = async() => {
//   try{
//     await mongoose.connect(`mongodb+srv://pawgram:parola@cluster0.dtj4g.mongodb.net/Pawgram`, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useFindAndModify: false
//     })
//   } catch(error) {
//       console.log(error)
//   }
//   console.log("conectat frate")
// }
// connect ()