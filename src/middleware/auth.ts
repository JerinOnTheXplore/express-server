//higher order function(javascript er ekta concept)
//parameter hishebe ekta function ney o ekta function return kore..parameter jodi nao ney..ebong ekta function return kore tarpor o eta higher order function
//function kei return kora lagbe karon ei middleware er modhdhe req,res modify to korboi ..jokhon role ashbe tokhon role take input hishebe nite hobe..tai etar jonno auth er header ta check kora lagbe,req r res er modhdhe user ache kina seta check kora lagbe

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const auth = () =>{
    return (req: Request, res: Response, next: NextFunction) =>{
        const token = req.headers.authorization;
        if(!token) {
            return res.status(500).json({message: "You are not allowed!!"});
        }
        const decoded = jwt.verify(token, config.secret as string);
        console.log({decoded});
        //auth ta higher order function tai ei auth take call kore dite hobe..user.routes e
        //prothom bar jokhon token diye pathaisi tokhon token dichche..abar token chara pathale { authToken: undefined } dekhay
        next();
    };
};

export default auth;