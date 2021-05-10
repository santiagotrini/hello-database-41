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

// rutas para el recurso usuario
// ruta para TODOS los usuarios
app.get('/users', (req, res) => {
  User.find().exec((err, users) => {
    res.json(users);
  });
});
// ruta para un usuario en particular por ID
app.get('/users/:id', (req, res) => {
  User.find({ id: req.params.id }).exec((err, user) => {
    res.json(user);
  });
});

app.get('/', (req, res) => {
  res.send('Usar los endpoints /users o /users/id');
});

app.listen(port, () => {
  console.log('Server escuchando en el puerto ' + port);
});
