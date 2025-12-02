import { pool } from "../../config/db"
import bcrypt from "bcryptjs"
const loginUser = async (email: string, password: string)=>{
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`,[email]);
    if(result.rows.length === 0) {
        return null;
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
//protibar jeno login korte na hoy..ekta token use korei enter kora jay tai JWT use korbo..
    if(!match){
        return false;
    }
}