// importar mongoose
const mongoose = require('mongoose');
// crear un Schema
const UserSchema = new mongoose.Schema({
  id: Number,
  name: String,
  mail: String,
  birthday: Date
});
// a partir del Schema crean el Modelo
const User = mongoose.model('User', UserSchema);
// exportarlo
module.exports = User;
