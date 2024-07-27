import express from "express";
import { getAllTodos , createTodo ,deleteTodo ,updateTodo } from "../controllers/todo.controller.js";





const router = express.Router()


router.route('/')
    .get(getAllTodos)
    .post(createTodo)

router.route('/:id')
    .put(updateTodo)
    .delete(deleteTodo)





export default router