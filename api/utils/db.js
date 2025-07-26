const fs = require("fs");
const DB_FILE = "./db/db.json";

const readDB = () => JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
const writeDB = (data) =>
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

if (!fs.existsSync(DB_FILE)) writeDB({ lists: [] });

module.exports = { readDB, writeDB };
