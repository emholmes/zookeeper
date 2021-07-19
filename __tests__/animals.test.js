const fs = require("fs");
const { 
  filterByQuery,
  findById, 
  createNewAnimal,
  validateAnimal
} = require("../lib/animals.js");
const { animals } = require("../data/animals");

jest.mock("fs");

test("create animal object", () => {
  const animal = createNewAnimal(
    {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: ["quirky", "rash"]
    }, 
    animals
  );

  expect(animal.name).toBe("Erica");
  expect(animal.id).toBe("3");
  expect(animal.species).toBe("gorilla");
  expect(animal.diet).toBe("omnivore");
  expect(animal.personalityTraits).toEqual(expect.arrayContaining(["quirky", "rash"]));
});

test("filter by query", () => {
  const startingAnimals = [
    {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: ["quirky", "rash"],
    },
    {
      id: "4",
      name: "Noel",
      species: "bear",
      diet: "carnivore",
      personalityTraits: ["impish", "sassy", "brave"],
    },
  ];

  const filteredAnimals = filterByQuery({ species: "gorilla" }, startingAnimals);

  expect(filteredAnimals.length).toEqual(1);
});

test("find by id", () => {
  const startingAnimals = [
    {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: ["quirky", "rash"],
    },
    {
      id: "4",
      name: "Noel",
      species: "bear",
      diet: "carnivore",
      personalityTraits: ["impish", "sassy", "brave"],
    },
  ];

  const results = findById("3", startingAnimals);

  expect(results.name).toBe("Erica");
});

test("validates personality traits", () => {
  const animal = {
    id: "3",
    name: "Erica",
    species: "gorilla",
    diet: "omnivore",
    personalityTraits: ["quirky", "rash"],
  }

  const invalidAnimal = {
    id: "3",
    name: "Erica",
    species: "gorilla",
    diet: "omnivore"
  };

  const results = validateAnimal(animal);
  const resultsInvalid = validateAnimal(invalidAnimal);

  expect(results).toBe(true);
  expect(resultsInvalid).toBe(false);
});

