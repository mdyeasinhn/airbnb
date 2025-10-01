import dotenv from 'dotenv';
import path from 'path'
dotenv.config({path : path.join(process.cwd(),".env")});

export default {
    database_url : process.env.DATABASE_URL,
    port : process.env.PORT,
    bcrypt_salt_rounds: process.env.BYCRPT_SOLT_ROUNDS|| 10,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
     jwt_expires_in: process.env.JWT_EXPIRES_IN || "30d", // fallback
};