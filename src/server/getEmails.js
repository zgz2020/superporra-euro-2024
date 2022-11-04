import { MongoClient } from 'mongodb'
import { DATABASE_URL } from '../../config'

const url = DATABASE_URL // "mongodb+srv://juanjoAdmin:Lidon2020@cluster0.tkptx.mongodb.net/production?retryWrites=true&w=majority"
let db = null

async function connectDB(){
    if (db) return db
    let client = await MongoClient.connect(url, { useNewUrlParser: true,  useUnifiedTopology: true })
    db = client.db()
    return db
}


(async function getEmails(){
    let db = await connectDB();
    let users = await db.collection('users').find().toArray()

    let emails = users.map(user => user.id)

    console.log('++++ EMAILS: ' + emails)
})();