import dotenv from "dotenv";
import path from "path"
dotenv.config({path: path.join(process.cwd(), '.env')});//cwd=current working directory
import express, { Request, Response } from "express";
import {Pool} from "pg";
const app = express()
const port = 5000;
//parser
app.use(express.json());//express basically ekta middleware based framework

//DB
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
// user table
const initDB = async() => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    age INT,
    phone VARCHAR(15),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
    `);

    //todo table
    await pool.query(`
     CREATE TABLE IF NOT EXISTS todos(
     id SERIAL PRIMARY KEY,
     user_id INT REFERENCES users(id) ON DELETE CASCADE,
     title VARCHAR(200) NOT NULL,
     description TEXT,
     completed BOOLEAN DEFAULT false,
     due_date DATE,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
     ) 
    `);
};

initDB();
//form data k pete hole eki rokom json data pawar jonno j middleware use korrlam..thik eki vabe nicher moto kore

// app.use(express.urlencoded());//eta use korte hoy

//data k save kore rakhar jonno Postgres k connect korbo..etar jonno npm pg package dorkar hobe
//data k dekhate hole locally na rekhe cloud e rakhte hobe..tahole seta sobar jonno accessable hobe..etar jonno neon db use korbo
//sekhane project create korar por pull create korte hobe..
//database pull ki??
//database pull is a connection pull..amra jokhon data base e kono kichu insert kori tokhon postgres e kono connection pull na thakle ekta kore connection req toiri kore then oi query ta run korbe..eta moteo efficient na..rather eta slow ekta process..tai amra jodi ekta connection pull toiri kore rakhi jekhane a few connection thakbe..ei connection guloo connection notun kore toiri na kore connection reuse korte help korbe..evabe efficient vabe kora jay
//dhori , 2 ta table thakbe jekhane user table ar todos table thakbe..user er id ounjayi data to do te boshbe..

app.get('/', (req:Request, res:Response) => {
  res.send('Hello Next level developers!')
});
//ekhane root route e post method e hit korle ei route ei hit korbe..post request korte amar postman lagbe..
app.post("/users", async(req:Request, res:Response)=>{
  // console.log(req.body);
  //req jehetu sofol ba failed hote pare tai try/catch use korbo..r async use korbo..
  const {name, email} = req.body;
//try block e query handle korbo
  try {
    const result = await pool.query(
      `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`,
      [name, email]
    );//ebar eta dekhabe 
    //  {
    // "message": "data inserted"
    //  }
    // console.log(result.rows[0]);
    return res.status(201).json({
      success:true,
      message: "User created successfully",
      data: result.rows[0]
    })/*
    evabe korle emon data soho postmen e ashe
    {
    "success": true,
    "message": "User created successfully",
    "data": {
        "id": 8,
        "name": "Miki the cute billi",
        "email": "mikkii@gmail.com",
        "age": null,
        "phone": null,
        "address": null,
        "created_at": "2025-11-30T13:14:26.659Z",
        "updated_at": "2025-11-30T13:14:26.659Z"
    }
}
    */
    // Ek route theke duibar response send kora allowed na...
    //Ei jonno Node bole .. Headers already sent!
    // res.send({message: "data inserted"})
//postman thke send korle data automatically neon db te table format e row te dekhabe
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }


  res.status(201).json({
    success: true,
    message: "API is working",
  })
});

//postman theke jodi ekhon post data dekhte chai tahole tahole cannot post dekhabe..
//kintu http://localhost:5000/users ei route theke postman e hit korle setar console e {
//     "success": true,
//     "message": "API is working"
// }.............eta dekhay
//ekhonkaj hobe data k table er modhdhe rekhe dewa..

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})//Example app listening on port 5000
