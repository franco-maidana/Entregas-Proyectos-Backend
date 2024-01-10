import { Router } from "express";

const userRouter = Router();

// definir los empoind (POST GET PUT DELETE )
userRouter.post("/", (req, res) => {});
userRouter.get("/", (req, res) => {});
userRouter.get("/:eip", (req, res) => {});
userRouter.put("/:eip", (req, res) => {});
userRouter.delete("/:eip", (req, res) => {});

export default userRouter;
