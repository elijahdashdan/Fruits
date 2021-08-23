//jshint esversion:6

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitsDB",{ useNewUrlParser: true });

const fruitSchema = new mongoose.Schema({
  name: {
  type: String,
  required: [true, "Please specify!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
    },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);
const fruit = new Fruit({
  name : "Apple",
  rating: 8,
  review: "Great fruit"
});

fruit.save();


const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});


const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name : "Pineapple",
  rating: 9,
  review: "Nice fruit"
});

const person1 = new Person({
  name : "Amy",
  age: 12,
  favoriteFruit: pineapple
});

const person2 = new Person({
  name : "Dan",
  age: 11,
  favoriteFruit: pineapple
});

// person.save();

const orange = new Fruit({
  name : "Orange",
  rating: 9,
  review: "Nice fruit"
});

Person.insertMany([person1, person2], function(err){
  if (err){
    console.log(err);
  }
  else {
    console.log("Success");
  }
})

const kiwi = new Fruit({
  name : "Kiwi",
  rating: 6,
  review: "Bad fruit"
});

// Fruit.insertMany([orange, kiwi], function(err){
//   if (err){
//     console.log(err);
//   }
//   else {
//     console.log("Success");
//   }
// })

Fruit.find(function(err, fruits){
  if (err){
    console.log(err);
  }
  else {
    mongoose.connection.close();
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
    }
});

Fruit.updateOne({_id:"60505f2e8debb71495d15985"},{name:"Peach"}, function(err){
  if (err){
    console.log(err);
  }
  else {
    console.log("Success");
  }
});

Fruit.deleteOne({name:"Peach"}, function(err){
  if (err){
    console.log(err);
  }
  else {
    console.log("Success");
  }
});

Person.deleteMany({name:"John"}, function(err){
  if (err){
    console.log(err);
  }
  else {
    console.log("Success");
  }
});
