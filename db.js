import { MongoClient, ServerApiVersion } from 'mongodb';
import {config} from 'dotenv'
config();
const url = process.env.DB_URI;

const database =  async(operations, response) => {
	try {
		const client = await MongoClient.connect(url,{ 
			useNewUrlParser: true, 
			useUnifiedTopology: true, 
			serverApi: ServerApiVersion.v1 
		});
		const db = client.db("yelpCamp");
		console.log(operations)
		await operations(db);
		return client.close();
	}catch(error){
		console.log(error)
		return response.status(500).json({message: "Couldn't connect to Database", error}).end();
	}
}

export default database;

export function checkSession(user,res){
	if(user){
	 	database(async (db)=>{
			let count = await db.collection("users").countDocuments({username:user})
			return count == 1 ? true : false
		},res)
	}
	return false;
}