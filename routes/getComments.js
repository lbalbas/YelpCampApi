import express from 'express'
import database from '../db.js';
import checkSession from '../db.js';
const getCommentsRoute = express.Router();

getCommentsRoute.get('/', (req, res) => {
	database(async (db) => {
		var query = {};

		if(req.query.id){
			query = {"camp" : req.query.id};
		}

		const cursor = await db.collection("comments").find(query);
		
		if(cursor){
			const comments = await cursor.toArray();
			return res.status(200).json(comments).end();
		}else{
			return res.status(404).json({msg: "Couldn't find any comments"}).end();
		}
	},res)	
});


export default getCommentsRoute;