const express = require("express");
const router = express.Router();
const {
  getAllLists,
  getListById,
  createList,
  updateList,
  deleteList,
  addItem,
  deleteItem,
} = require("../controllers/listController");

router.get("/", getAllLists);
router.get("/:id", getListById);
router.post("/", createList);
router.put("/:id", updateList);
router.delete("/:id", deleteList);
router.post("/:id/items", addItem);
router.delete("/:listId/items/:itemId", deleteItem);

module.exports = router;
