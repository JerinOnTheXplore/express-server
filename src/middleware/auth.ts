//higher order function(javascript er ekta concept)
//parameter hishebe ekta function ney o ekta function return kore..parameter jodi nao ney..ebong ekta function return kore tarpor o eta higher order function
//function kei return kora lagbe karon ei middleware er modhdhe req,res modify to korboi ..jokhon role ashbe tokhon role take input hishebe nite hobe..tai etar jonno auth er header ta check kora lagbe,req r res er modhdhe user ache kina seta check kora lagbe

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
//roles = ["admin", "user"]
const auth = (...roles:string[]) =>{
    return async (req: Request, res: Response, next: NextFunction) =>{
        try{
          const token = req.headers.authorization;
        if(!token) {
            return res.status(500).json({message: "You are not allowed!!"});
        }
        const decoded = jwt.verify(token, config.secret as string) as JwtPayload;
        console.log({decoded});
        req.user = decoded ;
        //["admin"]
        if(roles.length && !roles.includes(decoded.role as string)) {
            return res.status(500).json({
             error: "unauthorized!!!",
            })
        }
        next();
        //req.user er modhdhe decoded k keno set kora holo??
        //karon, req.user k amar ekhon service theke or controller theke , jekhan theke ichcha niye ashte pari..R compare korte pari j amader kache j user ta esheche..amra j input diyechi sei user er email, ar ja decode kore dilam token tar email similar kina..
        //j jsonWebtoken ta paisi setar type holo payload...
        //auth ta higher order function tai ei auth take call kore dite hobe..user.routes e
        //prothom bar jokhon token diye pathaisi tokhon token dichche..abar token chara pathale { authToken: undefined } dekhay
        } catch (err: any) {
           res.status(500).json({
              success: false,
              message: err.message,
           })
        }
        
    };
};

export default auth;