import { MongoClient, ObjectId } from "mongodb"
import "dotenv/config"
import cors from "cors"
import express from "express"

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.MONGODB_URI)

export async function connectToMongoDB() {
  try {
    await client.connect()
    console.log("You successfully connected to MongoDB!")
    return client
  } catch (err) {
    console.error("MongoDB connection failed:", err)
    process.exit(1)
  }
}

const mongoClient = await connectToMongoDB()
const db = mongoClient.db("wanderlust")
const destinationCollection = db.collection("destination")

// Add a destination
app.post("/destinations", async (req, res) => {
  try {
    const result = await destinationCollection.insertOne(req.body)

    res.status(201).json({
      message: "Destination added successfully",
      insertedId: result.insertedId,
    })
  } catch (err) {
    console.error("Error adding destination:", err)
    res.status(500).json({
      message: "Failed to add destination",
    })
  }
})

// Get all destinations
app.get("/destinations", async (req, res) => {
  try {
    const result = await destinationCollection.find().toArray()
    res.json(result)
  } catch (err) {
    console.error("Error fetching destinations:", err)
    res.status(500).json({
      message: "Failed to fetch destinations",
    })
  }
})

// Get one destination
app.get("/destinations/:id", async (req, res) => {
  try {
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid destination ID",
      })
    }

    const destination = await destinationCollection.findOne({
      _id: new ObjectId(id),
    })

    if (!destination) {
      return res.status(404).json({
        message: "Destination not found",
      })
    }

    res.json(destination)
  } catch (err) {
    console.error("Error fetching destination:", err)
    res.status(500).json({
      message: "Failed to fetch destination",
    })
  }
})

// Update a destination
app.patch("/destination/:id", async (req, res) => {
  try {
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid destination ID",
      })
    }

    const updatedData = { ...req.body }

    // Do not allow changing MongoDB's document ID
    delete updatedData._id

    if (
      updatedData.price !== undefined &&
      updatedData.price !== ""
    ) {
      updatedData.price = Number(updatedData.price)

      if (
        !Number.isFinite(updatedData.price) ||
        updatedData.price < 0
      ) {
        return res.status(400).json({
          message: "Please enter a valid price",
        })
      }
    }

    const result = await destinationCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    )

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Destination not found",
      })
    }

    res.json({
      message: "Destination updated successfully",
      modifiedCount: result.modifiedCount,
    })
  } catch (err) {
    console.error("Error updating destination:", err)
    res.status(500).json({
      message: "Failed to update destination",
    })
  }
})

// Delete a destination
app.delete("/destinations/:id", async (req, res) => {
  try {
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid destination ID",
      })
    }

    const result = await destinationCollection.deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Destination not found",
      })
    }

    res.json({
      message: "Destination deleted successfully",
    })
  } catch (err) {
    console.error("Error deleting destination:", err)
    res.status(500).json({
      message: "Failed to delete destination",
    })
  }
})

// Home route
app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
