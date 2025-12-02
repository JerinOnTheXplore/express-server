import  config  from "./config";
import express, { NextFunction, Request, Response } from "express";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
const app = express();
const port = config.port;
//parser
app.use(express.json());//express basically ekta middleware based framework


//initializing DB
initDB();

//form data k pete hole eki rokom json data pawar jonno j middleware use korrlam..thik eki vabe nicher moto kore

// app.use(express.urlencoded());//eta use korte hoy

//data k save kore rakhar jonno Postgres k connect korbo..etar jonno npm pg package dorkar hobe
//data k dekhate hole locally na rekhe cloud e rakhte hobe..tahole seta sobar jonno accessable hobe..etar jonno neon db use korbo
//sekhane project create korar por pull create korte hobe..
//database pull ki??
//database pull is a connection pull..amra jokhon data base e kono kichu insert kori tokhon postgres e kono connection pull na thakle ekta kore connection req toiri kore then oi query ta run korbe..eta moteo efficient na..rather eta slow ekta process..tai amra jodi ekta connection pull toiri kore rakhi jekhane a few connection thakbe..ei connection guloo connection notun kore toiri na kore connection reuse korte help korbe..evabe efficient vabe kora jay
//dhori , 2 ta table thakbe jekhane user table ar todos table thakbe..user er id ounjayi data to do te boshbe..

app.get('/',logger, (req:Request, res:Response) => {
  res.send('Hello Next level developers!')
});
//ekhane root route e post method e hit korle ei route ei hit korbe..post request korte amar postman lagbe..

app.use("/users", userRoutes);

//users CRUD

//postman theke jodi ekhon post data dekhte chai tahole tahole cannot post dekhabe..
//kintu http://localhost:5000/users ei route theke postman e hit korle setar console e {
//     "success": true,
//     "message": "API is working"
// }.............eta dekhay
//ekhonkaj hobe data k table er modhdhe rekhe dewa..

//To-Do's crud

app.post("/todos",async(req:Request, res: Response)=>{
  const {user_id, title} = req.body;

  try{
    const result = await pool.query(`INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`,[user_id, title])
    res.status(201).json({
      success: true,
      message: "Todo created",
      data: result.rows[0]
    });
  } catch (err:any){
      res.status(500).json({
        success: false,
        message: err.message,
      });
  }
})

app.get("/todos",async(req: Request, res: Response)=>{
  try{
    const result = await pool.query(`SELECT * FROM todos`);
    res.status(200).json({
      success:true,
      message: "Todos retrieved successfully",
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

app.use((req,res)=>{
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})//Example app listening on port 5000
