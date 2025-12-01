//first of all Express er router k nibo..eta 2 vabe kora jay

// import { Router } from "express";

// const router = Router();

import express, { Request, Response, Router } from "express";
import { pool } from "../../config/db";

const router = express.Router();
//app.use("/users", userRoutes);
//routes=>controller=>service
router.post("/",async(req:Request, res:Response)=>{
  const {name, email} = req.body;
//try block e query handle korbo
  try {
    const result = await pool.query(
      `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`,
      [name, email]
    );
    console.log(result.rows[0]);
    return res.status(201).json({
      success:true,
      message: "User created successfully",
      data: result.rows[0]
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
});

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