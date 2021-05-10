const express = require('express');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const db   = process.env.MONGODB_URI || 'mongodb://localhost/users';

const app = express();

// conexion a la base de datos
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log(`DB connected @ ${db}`);
  })
.catch(err => console.error(`Connection error ${err}`));

// importamos el modelo de User
const User = require('./models/User');

app.get('/', (req, res) => {
  User.find().exec((err, users) => {
    res.json(users);
  });
});

app.listen(port, () => {
  console.log('Server escuchando en el puerto ' + port);
});
