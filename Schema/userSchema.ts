import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    userId: String,
    username:  String,
    lastname: String,
    city:   String,
    birthdate: String
  });

  const Users = mongoose.model('Users', userSchema);
  Users.createCollection().then(function(collection) {
    console.log('Collection is created!');
  });
  module.exports = Users