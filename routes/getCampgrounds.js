import express from 'express'
import database from '../db.js';
import {ObjectID} from 'mongodb'
const getCampgroundsRoute = express.Router();

getCampgroundsRoute.get('/', (req, res)=>{
	database(async (db) => {
		var query = {};

		if(req.query.id){
			query = {"_id" : new ObjectID(req.query.id)};
		}
		const sort = { name: 1,};
	    const cursor = await db.collection("campgrounds").find(query).sort(sort);
		
		if(cursor){
			const campgrounds = await cursor.toArray();
			return res.status(200).json(campgrounds).end();
		}else{
			return res.status(404).json({msg: "Couldn't find any campgrounds"}).end();
		}
  	},res)	
})	

export default getCampgroundsRoute;