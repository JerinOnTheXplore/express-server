//first of all Express er router k nibo..eta 2 vabe kora jay

// import { Router } from "express";

// const router = Router();

import express, { Request, Response, Router } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";
import { userServices } from "./user.service";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";

const router = express.Router();
//app.use("/users", userRoutes);
//routes=>controller=>service
//controller shudhu matro req,res er kaj handle korbe..
//ar service holo business logic handle korbe..
router.post("/",userControllers.createUser);

router.get("/",logger,auth("admin"), userControllers.getUser);

router.get("/:id", auth("admin", "user"), userControllers.getSingleUser);

router.put("/:id", userControllers.updateUser);

router.delete("/:id", userControllers.deleteUser);

export const userRoutes = router;