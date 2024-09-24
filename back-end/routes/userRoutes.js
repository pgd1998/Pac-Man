import express from "express"
import { signup,login,logout,update } from "../controllers/user.js";

const router = express.Router();

router.route("/sign-up").post(signup)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/high-score").put(update)

export default router;