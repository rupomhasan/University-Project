import dotenv from "dotenv";
import path from 'path'

const port = 3000

dotenv.config({ path: path.join((process.cwd(), ".env")) });


export default {
    port: process.env.PORT,
    database_Url: process.env.DATABASE_URL
}