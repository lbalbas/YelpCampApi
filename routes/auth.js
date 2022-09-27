import express from 'express'
import database from '../db.js'
import md5 from 'md5';
import checkSession from '../db.js';
const authRoute = express.Router()

authRoute.get('/', (req,res)=>{
    let authCheck = checkSession(req.cookies.session, res);
    if(authCheck)
        return res.status(200).end()
})

authRoute.post('/login',async (req,res) => login(req,res))

authRoute.post('/signup',(req,res)=>{
    const { username } = req.body;
    const password = md5(req.body.password);

    database(async (db) => {
        const query = {'username' : username};
        const count = await db.collection("users").countDocuments(query);
        if(count)
            return res.status(409).json({message: "User already exists"})
        const cursor = await db.collection("users").insertOne({username: username, password: password});
        login(req, res);
    },res)
})

function login(req, res){
    database(async (db) => {
        const cursor = await db.collection("users").find({'username' : req.body.username});
        let user = await cursor.toArray();
        user = user[0];

        if(user.username == req.body.username && md5(req.body.password) == user.password){
           res.cookie('session',user.username, { maxAge: 604800, httpOnly: true, secure: true })
           return res.status(200).json({status: 200, msg: "Now Logged In", user: user.username}); 
        }
        return res.status(401).json({status: 401,msg: "Wrong Credentials"});
    },res)
}
export default authRoute;