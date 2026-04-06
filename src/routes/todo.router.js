const express = require("express");
const todoControllers = require("../controller/todo.controller");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/create-todo", auth, todoControllers.addTask);
router.get("/get-todo", auth, todoControllers.getTask);

router.delete("/delete-todo/:id", auth, todoControllers.deleteTask);
router.put("/update-todo/:id", auth, todoControllers.updateTask);
router.patch("/update-todo/:id", auth, todoControllers.updateTaskPatch);

module.exports = router;
