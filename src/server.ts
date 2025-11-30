import express, { Request, Response } from "express";
import {Pool} from "pg";
const app = express()
const port = 5000;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
//parser
app.use(express.json());//express basically ekta middleware based framework
//form data k pete hole eki rokom json data pawar jonno j middleware use korrlam..thik eki vabe nicher moto kore

// app.use(express.urlencoded());//eta use korte hoy

//data k save kore rakhar jonno Postgres k connect korbo..etar jonno npm pg package dorkar hobe
//data k dekhate hole locally na rekhe cloud e rakhte hobe..tahole seta sobar jonno accessable hobe..etar jonno neon db use korbo
//sekhane project create korar por pull create korte hobe..
//database pull ki??
//database pull is a connection pull..amra jokhon data base e kono kichu insert kori tokhon postgres e kono connection pull na thakle ekta kore connection req toiri kore then oi query ta run korbe..eta moteo efficient na..rather eta slow ekta process..tai amra jodi ekta connection pull toiri kore rakhi jekhane a few connection thakbe..ei connection guloo connection notun kore toiri na kore connection reuse korte help korbe..evabe efficient vabe kora jay

app.get('/', (req:Request, res:Response) => {
  res.send('Hello Next level developers!')
});
//ekhane root route e post method e hit korle ei route ei hit korbe..post request korte amar postman lagbe..
app.post("/",(req:Request, res:Response)=>{
  console.log(req.body);

  res.status(201).json({
    success: true,
    message: "API is working",
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})//Example app listening on port 5000
