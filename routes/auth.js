import express from 'express'
import database from '../db.js'
import md5 from 'md5';
import checkSession from '../db.js';
const authRoute = express.Router()

authRoute.get('/', async (req,res)=>{
    if(req.cookies.session != undefined || req.cookies.session != null){
        let authCheck = checkSession(req.cookies.session, res);
        if(authCheck)
            return res.status(200).json({status: 200, user: req.cookies.session,}).end()
    }else
        return res.status(401).json({msg: "Not logged in"})
})

authRoute.post('/login',(req,res) => login(req,res))

authRoute.post('/signup',(req,res)=>{
    const { username } = req.body;
    const password = md5(req.body.password);

    database(async (db) => {
        const query = {'username' : username};
        const count = await db.collection("users").countDocuments(query);
        if(count)
            return res.status(409).json({msg: "Username is already in use"})
        const cursor = await db.collection("users").insertOne({username: username, password: password});
        login(req, res);
    },res)
})

authRoute.get('/logout', (req,res) => {
    res.clearCookie("session");
    res.status(200).json({msg: "Logged Out"})
})

function login(req, res){
    database(async (db) => {
        const cursor = await db.collection("users").find({'username' : req.body.username});
        let user = await cursor.toArray();
        user = user[0];

        if(user && user.username == req.body.username && md5(req.body.password) == user.password){
           res.cookie('session',user.username, { maxAge: 604800000 , httpOnly: true, secure: true })
           return res.status(200).json({status: 200, msg: "Now Logged In", user: user.username}); 
        }
        
        return res.status(401).json({status: 401,msg: "Wrong Credentials"});
    },res)
}
export default authRoute;