import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

const createUser = async(req:Request, res:Response)=>{
  const {name, email} = req.body;
//try block e query handle korbo
  try {
    const result = await userServices.createUser(name,email);//ekhane name,email argument na dile pabena
    // console.log(result.rows[0]);
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
}

export const userControllers = {
    createUser,
};