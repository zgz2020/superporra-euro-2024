import { MongoClient } from 'mongodb'
import { DATABASE_URL } from '../../config'

// const url = process.env.MONGODB_URI || `mongodb://localhost:27017/superporrajuly`
// let db = null

// export async function connectDB(){
//     if (db) return db
//     let client = await MongoClient.connect(url, { useNewUrlParser: true })
//     db = client.db()
//     return db
// }


const url = DATABASE_URL // 'mongodb+srv://practiceUser:practicePassword@cluster0.tkptx.mongodb.net/test?retryWrites=true&w=majority'
let db = null

export async function connectDB(){
    if (db) return db
    let client = await MongoClient.connect(url, { useNewUrlParser: true,  useUnifiedTopology: true })
    db = client.db()
    return db
}