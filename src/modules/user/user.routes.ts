//first of all Express er router k nibo..eta 2 vabe kora jay

// import { Router } from "express";

// const router = Router();

import express, { Request, Response, Router } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";

const router = express.Router();
//app.use("/users", userRoutes);
//routes=>controller=>service
//controller shudhu matro req,res er kaj handle korbe..
//ar service holo business logic handle korbe..
router.post("/",userControllers.createUser);

router.get("/",async(req: Request, res: Response)=>{
  try{
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).json({
      success:true,
      message: "Users retrieved successfully",
      data: result.rows
    })
  } catch(err: any){
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    })
  }
})

export const userRoutes = router;