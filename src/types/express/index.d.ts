//eta type declaring file

import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
} //eta korate ki holo??

//global scope er modhdhe amader express er j namespace ache..jekhane amra req.body pai, req.params pai,sekhane ekhon req.user o pabo amra..