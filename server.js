import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import apiRouter from "./routes/index.js"
import cookieParser from 'cookie-parser';

const app = express()
const db = process.env.DB_URI;

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true, 
 mongod: true}))
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

app.use('/', apiRouter)

app.listen(process.env.PORT  || 3000)
