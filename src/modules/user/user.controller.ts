import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async(req:Request, res:Response)=>{
//try block e query handle korbo
  try {
    const result = await userServices.createUser(req.body);//ekhane name,email argument na dile pabena
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
//***
// ekhon ekta jinsh ekhane notice korsi seta holo userService theke getUser,createUser egulo export kore seta controller e import kore abar call o kortesi..abar controller theke getUser,createUser egulo export kore seta userRoutes e import kortesi thik e ..but call kortesina..etar reason ta ki ??
//karon Express ekta middleware based framework..ekhane express amader controller e req accept korbe,ar response pathiye dibe..express ashole promise type er void..jodi resolved hoy tahole success: true er response pathabe..ar jodi reject hoy tahole success: false er response pathiye dibe..ar result e service er return kora value ta store korchi..ar router.ts e emon kichu call kortesi jeta promise void type..mane express ekhane return korena...but response send kore
 
const getUser = async(req: Request, res: Response)=>{
  try{
    const result = await userServices.getUser();//await jodi na dei promise resolved hobena..result.rows er niche warning dekhabe..abar abar await er o kono effect dekhte pabona jodi function ta call na kori.. 
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
}

const getSingleUser = async (req:Request, res:Response)=>{
  // console.log(req.params.id);
  try{
   const result =await userServices.getSingleUser(req.params.id as string);// ei kaj take bole type assertion
  if(result.rows.length === 0){
    res.status(404).json({
      success:false,
      message:"User not found",
    });
  }else{
    res.status(200).json({
      success:true,
      message:"User fetched successfully",
      data: result.rows[0],
    })
  }
  } catch(err:any) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

const updateUser = async (req:Request, res:Response)=>{
  // console.log(req.params.id);
  const {name,email} = req.body;
  try{
   const result = await userServices.updateUser(name,email,req.params.id!) ;
  if(result.rows.length === 0){
    res.status(404).json({
      success:false,
      message:"User not found",
    });
  }else{
    res.status(200).json({
      success:true,
      message:"User updated successfully",
      data: result.rows[0],
    })
  }
  } catch(err:any) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

const deleteUser = async (req:Request, res:Response)=>{
  // console.log(req.params.id);
  try{
   const result = await userServices.deleteUser(req.params.id!);
  //  console.log(result);
  if(result.rowCount === 0){
    res.status(404).json({
      success:false,
      message:"User not found",
    });
  }else{
    res.status(200).json({
      success:true,
      message:"User deleted successfully",
      data: result.rows,
    })
  }
  } catch(err:any) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

export const userControllers = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser,
};