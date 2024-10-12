import 'dotenv/config'
import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI || ''

export const connectToDb = async () =>{
    try {
        
        const connection = await mongoose.connect(MONGO_URI)
        console.log(`MongoDB connected: ${connection.connection.host}`)
        return connection

    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error}`)
        process.exit(1)
    }
}