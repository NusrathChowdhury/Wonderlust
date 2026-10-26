

import { MongoClient } from 'mongodb';
import 'dotenv/config'
import cors from 'cors'
import express from 'express';
const app = express()
const port = 5000


app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const mongoClient=await connectToMongoDB()
const db=mongoClient.db('wanderlust')
const destinationCollection=db.collection('destination')

app.post('/add_destination',async(req,res)=>{
const data=req.body
const result=await destinationCollection.insertOne(data)

console.log(result)
res.send(result)
  console.log('data')
  res.send({message:'Api is working..'})
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is running at ${port}`)
})