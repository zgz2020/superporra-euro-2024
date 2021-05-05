import { MongoClient } from 'mongodb'

// const url = process.env.MONGODB_URI || `mongodb://localhost:27017/superporrajuly`
// let db = null

// export async function connectDB(){
//     if (db) return db
//     let client = await MongoClient.connect(url, { useNewUrlParser: true })
//     db = client.db()
//     return db
// }


const url = 'mongodb+srv://practiceUser:practicePassword@cluster0.tkptx.mongodb.net/production?retryWrites=true&w=majority'
let db = null

export async function connectDB(){
    if (db) return db
    let client = await MongoClient.connect(url, { useNewUrlParser: true,  useUnifiedTopology: true })
    db = client.db()
    return db
}