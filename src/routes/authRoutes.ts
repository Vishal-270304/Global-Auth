import { Router } from "express";
import { deleteUser, signUp,signIn,updateUser } from "../controllers/authControllers";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.put("/update/:_id",updateUser);
router.delete("/delete/:_id",deleteUser);

export default router;