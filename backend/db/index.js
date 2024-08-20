import mongoose from "mongoose"


 const connectDB =async ()=>{
    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
        console.log(`Database connected ${db.connections[0].host} at port ${db.connections[0].port}`)

        
    } catch (error) {
        console.error("DB connection error",error)
        
    }
}


export default connectDB