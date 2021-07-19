const fs = require("fs");
const { 
  filterByQuery,
  findById, 
  createNewZookeeper,
  validateZookeeper
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers");

jest.mock("fs");

test("create zookeeper object", () => {
  const zookeeper = createNewZookeeper(
    {
      id: "0",
      name: "Kim",
      age: 28,
      favoriteAnimal: "dolphin"
    }, 
    zookeepers
  );

  expect(zookeeper.name).toBe("Kim");
  expect(zookeeper.id).toBe("0");
  expect(zookeeper.age).toEqual(expect.any(Number));
  expect(zookeeper.favoriteAnimal).toBe("dolphin");
});

test("filter by query", () => {
  const startingZookeepers = [
    {
      "id": "0",
      "name": "Kim",
      "age": 28,
      "favoriteAnimal": "dolphin"
    },
    {
      "id": "1",
      "name": "Raksha",
      "age": 31,
      "favoriteAnimal": "penguin"
    }
  ];

  const filteredZookeepers = filterByQuery({ age: 28 }, startingZookeepers);

  expect(filteredZookeepers.length).toEqual(1);
});

test("find by id", () => {
  const startingZookeepers = [
    {
      "id": "0",
      "name": "Kim",
      "age": 28,
      "favoriteAnimal": "dolphin"
    },
    {
      "id": "1",
      "name": "Raksha",
      "age": 31,
      "favoriteAnimal": "penguin"
    }
  ];

  const result = findById("0", startingZookeepers);

  expect(result.name).toBe("Kim");
});

test("validates age", () => {
  const zookeeper = {
    "id": "0",
    "name": "Kim",
    "age": 28,
    "favoriteAnimal": "dolphin"
  };

  const invalidZookeeper = {
    "id": "0",
    "name": "Kim",
    "age": "28",
    "favoriteAnimal": "dolphin"
  }; 

  const result = validateZookeeper(zookeeper);
  const resultInvalid = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(resultInvalid).toBe(false);
});
