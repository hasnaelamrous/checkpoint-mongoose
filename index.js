const express = require("express");
const connectDb = require("./config/database"); // fonction de connexion à la base de données
require("dotenv").config();
const Person = require("./models/person");// Importation du modèle Person
const app = express();
const PORT = process.env.PORT ;

// Middleware for parsing JSON bodies
app.use(express.json());




// create and save a person
const createAndSavePerson = async () => {
  try {
    const person = new Person({
      name: "hanane",
      age: 27,
      favoriteFoods: ["Pizza", "Pasta"],
    });

    const data = await person.save();
    console.log("Person saved:", data);
  } catch (err) {
    console.error(err);
  }
};

// create many people
const createManyPeople = async () => {
    const arrayOfPeople = [
      { name: "souhila", age: 25, favoriteFoods: ["Salad", "Chicken"] },
      { name: "Boutaina", age: 30, favoriteFoods: ["Steak", "Fries"] },
        { name: "Mary", age: 22, favoriteFoods: ["Sushi", "Ramen"] },
        { name: "Mary", age: 28, favoriteFoods: ["Tacos", "Burritos"] },
        { name: "John", age: 35, favoriteFoods: ["Pizza", "Pasta"] },
    ];
    try {
      const data = await Person.create(arrayOfPeople);
      console.log("People created:", data);
    } catch (err) { console.error(err);
    }
}

// find people by name
const findPeopleByName = async (personName) => {
    try {
      const people = await Person.find({ name: personName });
      console.log(`People found ${personName}:`,people );
    } catch (err) {
      console.error(err);
    }};
//find one person by food
const findOneByFood = async (food) => {
    try {
      const person = await Person.findOne({ favoriteFoods: food });
      console.log(`Person found with favorite food ${food}:`, person);
    } catch (err) {
      console.error(err);
    }};
// find person by ID
const findPersonById = async (personId) => {
    try {
      const person = await Person.findById(personId);
      console.log(`Person found with ID ${personId}:`, person);}
    catch (err) {
      console.error(err);
    }};

    
      //find edit then save
   const findEditThenSave = async (personId) => {
    try {
      const person = await Person.findById(personId);
      person.favoriteFoods.push("hamburger");
      const updatedPerson = await person.save();
      console.log("Updated person:", updatedPerson);
    } catch (err) {
      console.error(err);
    }};
   // find one and update 
    const findOneAndUpdate = async (personName) => {
        try {
          const updatedPerson = await Person.findOneAndUpdate(
            { name: personName },
            { age: 20 },    
            { new: true } // return the updated document
          );
          console.log("Person updated:", updatedPerson);
        } catch (err) {
          console.error(err);
        }};
    // delete by ID
const removeById = async (personId) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(personId);
    console.log("Person deleted:", deletedPerson);
  } catch (err) {
    console.error(err);
  }
};
    // delete many people
    const removeManyPeople = async () => {
        try {
          const result = await Person.deleteMany({ name: "Mary" });
          console.log("People deleted:", result);
        } catch (err) {
          console.error(err);
        }};
// query chain
const queryChain = async () => {
    try {
        const people = await Person.find({ favoriteFoods: "Pizza" })
        .sort({ name: 1 })
        .limit(2)
        .select({ age: 0 });
      console.log("Query result:", people);
    } catch (err) {
      console.error(err);
    }};


(async () => {
  await connectDb();
  await createAndSavePerson();
  await createManyPeople();
  await findPeopleByName("souhila");
    await findOneByFood("Pizza");
    await findPersonById("68e353aaae1520d12fab307a");
    await findEditThenSave("68e353a9ae1520d12fab3076");
    await findOneAndUpdate("hanane");
    await removeById("68e353aaae1520d12fab3079");
    await removeManyPeople();
    await queryChain();
})();




// Start the server

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
