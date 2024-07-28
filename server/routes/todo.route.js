import express from "express";
import { getAllTodos , createTodo ,deleteTodo ,updateTodo } from "../controllers/todo.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";





const router = express.Router()


router.route('/')
    .get(isLoggedIn,getAllTodos)
    .post(isLoggedIn,createTodo)

router.route('/:id')
    .put(isLoggedIn,updateTodo)
    .delete(isLoggedIn,deleteTodo)

export default router