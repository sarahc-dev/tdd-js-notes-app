import express from "express";
import testingController from "../controllers/testingController";

const router = express.Router();

router.post("/deleteAll", testingController.resetTodos);

export default router;
