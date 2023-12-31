import { defaultState, defaultStateDOS } from './defaultState';
import { connectDB } from './connect-db'

/* This code initializes the database with sample users.
 Note, it does not drop the database - this can be done manually. Having code in your application that could drop your whole DB is a fairly risky choice.*/
// (async function initializeDB(){
//     let db = await connectDB();
//     let user = await db.collection(`users`).findOne({id:"U1"});
//     if (!user) {
//         for (let collectionName in defaultState) {
//             let collection = db.collection(collectionName);
//             await collection.insertMany(defaultState[collectionName]);
//             console.log("Initiate DB: ", collectionName)
//         }
//     }
// })();

// (async function initializeDB(){
//     let db = await connectDB();
//     for (let collectionName in defaultStateDOS) {
//         let collection = db.collection(collectionName);
//         await collection.insertMany(defaultStateDOS[collectionName]);
//     }
// })();

// ----------------

// (async function initializeDB(){
//     let db = await connectDB();
//     let user = await db.collection(`users`).findOne({id:"U1"});
//     if (!user) { 
//         for (let collectionName in defaultStateDOS) {
//             let collection = db.collection(collectionName);
//             await collection.insertMany(defaultStateDOS[collectionName]);
//         }
//     }
// })();


(async function initializeDB(){
    let db = await connectDB();
    let result = await db.collection(`results`).findOne({id:"officialResults"});
    if (!result) { 
        for (let collectionName in defaultStateDOS) {
            let collection = db.collection(collectionName);
            await collection.insertMany(defaultStateDOS[collectionName]);
        }
    }
})();