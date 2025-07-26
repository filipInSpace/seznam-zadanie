const { readDB, writeDB } = require("../utils/db");
const { v4: uuidv4 } = require("uuid");

const findListById = (id) => {
  const db = readDB();
  const list = db.lists.find((l) => l.id === id);
  return { db, list };
};

const getAllLists = (req, res) => {
  const db = readDB();
  res.json(db.lists);
};

const getListById = (req, res) => {
  const { db, list } = findListById(req.params.id);
  if (!list) {
    return res.status(404).json({ error: "List not found" });
  }
  res.json(list);
};

const createList = (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "List name is required" });
  }

  const db = readDB();
  const newList = {
    id: uuidv4(),
    name,
    items: [],
  };
  db.lists.push(newList);
  writeDB(db);
  res.status(201).json(newList);
};

const updateList = (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "List name is required" });
  }

  const { db, list } = findListById(req.params.id);
  if (!list) {
    return res.status(404).json({ error: "List not found" });
  }

  list.name = name;
  writeDB(db);
  res.json(list);
};

const deleteList = (req, res) => {
  const db = readDB();
  const index = db.lists.findIndex((l) => l.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "List not found" });
  }

  db.lists.splice(index, 1);
  writeDB(db);
  res.status(204).send();
};

const addItem = (req, res) => {
  const { name, count } = req.body;
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Item name is required" });
  }

  const { db, list } = findListById(req.params.id);
  if (!list) {
    return res.status(404).json({ error: "List not found" });
  }

  const exists = list.items.find(
    (i) => i.name.toLowerCase() === name.toLowerCase()
  );
  if (exists) {
    return res.status(400).json({ error: "Item already exists" });
  }

  const newItem = {
    id: uuidv4(),
    name,
    count: typeof count === "number" && count > 0 ? count : 1,
  };

  list.items.push(newItem);
  writeDB(db);
  res.status(201).json(newItem);
};

const deleteItem = (req, res) => {
  const { db, list } = findListById(req.params.listId);
  if (!list) {
    return res.status(404).json({ error: "List not found" });
  }

  const itemIndex = list.items.findIndex((i) => i.id === req.params.itemId);
  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  list.items.splice(itemIndex, 1);
  writeDB(db);
  res.status(204).send();
};

module.exports = {
  getAllLists,
  getListById,
  createList,
  updateList,
  deleteList,
  addItem,
  deleteItem,
};
