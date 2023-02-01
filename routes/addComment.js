import express from 'express'
import database from '../db.js';
import checkSession from '../db.js';

const addCommentRoute = express.Router()

addCommentRoute.post('/', (req,res)=>{
  if(checkSession(req.cookies.session)){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '/' + dd + '/' + mm;
    let comment = {
        comment : req.body.comment,
        camp: req.body.camp,
        submitter: req.cookies.session,
        date: today,
    };
    
    database(async (db) => {
      if(checkSession(req.cookies.session,res)){
        const query = await db.collection("comments").insertOne(comment);
        return res.status(201).send();
      }else{
        return res.status(401).json({msg: "Not logged in"});
      }
    },res)
  }  
}) 
export default addCommentRoute;