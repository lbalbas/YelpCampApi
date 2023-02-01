import express from 'express'
import database from '../db.js';
import checkSession from '../db.js';

const addCampgroundRoute = express.Router()

addCampgroundRoute.post('/', (req,res)=>{
  let camp = {
      name : req.body.name,
      price: req.body.price,
      image: req.body.image,
      desc: req.body.desc,
      submitter: req.cookies.session,
  };
  
  database(async (db) => {
    if(checkSession(req.cookies.session,res)){
      const query = await db.collection("campgrounds").insertOne(camp);
      return res.status(201).send();
    }
    return res.status(401);
  })
}) 
export default addCampgroundRoute;