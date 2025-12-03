import dotenv from "dotenv";
import path from "path"

dotenv.config({path: path.join(process.cwd(), '.env')});//cwd=current working directory
 
const config = {
    DATABASE_URL: process.env.DATABASE_URL,
    port: process.env.PORT,
    secret: process.env.APP_SECRET
    
};

export default config;