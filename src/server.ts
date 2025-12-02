import  config  from "./config";
import express, { NextFunction, Request, Response } from "express";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";
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

//users CRUD
app.use("/users", userRoutes);

//todos CRUD
app.use("/todos",todoRoutes);

//auth routes
app.use("/auth", authRoutes);

//postman theke jodi ekhon post data dekhte chai tahole tahole cannot post dekhabe..
//kintu http://localhost:5000/users ei route theke postman e hit korle setar console e {
//     "success": true,
//     "message": "API is working"
// }.............eta dekhay
//ekhonkaj hobe data k table er modhdhe rekhe dewa..


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
