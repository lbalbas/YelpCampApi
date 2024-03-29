import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import apiRouter from "./routes/index.js"
import cookieParser from 'cookie-parser';

const app = express()
const db = process.env.DB_URI;
const PORT = process.env.PORT;

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true, 
 mongod: true}))
app.use(cors({credentials: true, origin: 'https://fanciful-snickerdoodle-e4b9a0.netlify.app'}))

app.use('/', apiRouter)

app.listen(PORT, ()=>console.log("Server running on port" + PORT))
