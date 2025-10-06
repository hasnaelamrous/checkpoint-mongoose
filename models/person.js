const mongoose = require('mongoose');

// creation of the schema for Person
const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String], // Array of strings
  },
});

// creation of the model for Person
const Person = mongoose.model("Person", PersonSchema);

// export the model
module.exports = Person;





