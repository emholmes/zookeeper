const fs = require("fs");
const { 
  filterByQuery,
  findById, 
  createNewAnimal,
  validateAnimal
} = require("../lib/animals.js");
const { animals } = require("../data/animals");

