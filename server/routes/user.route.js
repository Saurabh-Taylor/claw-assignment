import express from "express";
import { loginController , registerController , logoutController , getSessionsController } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";


const router = express.Router()


router.route('/register')
    .post(registerController)
router.route('/login')
    .post(loginController)
router.route('/logout')
    .get(isLoggedIn , logoutController)

router.route('/sessions')
.get(isLoggedIn, getSessionsController)



export default router