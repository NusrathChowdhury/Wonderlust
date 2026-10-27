import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('You successfully connected to MongoDB!');
    return client;
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
}

const mongoClient = await connectToMongoDB();
const db = mongoClient.db('wanderlust');
const destinationCollection = db.collection('destination');

// Add a destination
app.post('/destinations', async (req, res) => {
  try {
    const data = req.body;
    const result = await destinationCollection.insertOne(data);
    res.status(201).send(result);
  } catch (err) {
    console.error('Error adding destination:', err);
    res.status(500).send({ message: 'Failed to add destination' });
  }
});

// Get all destinations
app.get('/destinations', async (req, res) => {
  try {
    const result = await destinationCollection.find().toArray();
    res.send(result);
  } catch (err) {
    console.error('Error fetching destinations:', err);
    res.status(500).send({ message: 'Failed to fetch destinations' });
  }
});

app.get('/destinations/:id',async(req,res)=>{
const {id}=req.params
console.log(id)
const result=await destinationCollection.findOne({_id:new ObjectId(id)})
res.send(result)
})

// Home route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
