import path from 'path';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import './initialize-db';

import { connectDB } from './connect-db'
import { updatePredictionMatches } from './serverUtils'

// import { authenticationRoute } from './authenticate'
// import { addNewTask, updateTask } from './communicate-db';


let port = process.env.PORT || 7777
let app = express()


app.use(
    cors(),
    bodyParser.urlencoded({extended:true}),
    bodyParser.json()
)
app.listen(port,console.info("Server listening on port ", port))

app.post('/mongo/data', async (req, res) => {
    let db = await connectDB()
    let users = await db.collection('users').find().toArray()
    let predictions = await db.collection('predictions').find().toArray()

    let mongoState = { users, predictions }

    res.send({ mongoState })
})

// authenticationRoute(app);

if (process.env.NODE_ENV == `production`) {
    app.use(express.static(path.resolve(__dirname,'../../dist')));
    app.get('/*',(req,res)=>{
        res.sendFile(path.resolve('index.html'));
    });
}

// app.post('/task/new',async (req,res)=>{
//     // let task = req.body.task;
//     await addNewTask(req.body.task);
//     res.status(200).send();
// });



// app.post('/task/update',async (req,res)=>{
//     let db = await connectDB();
//     await updateTask(req.body.task);
//     res.status(200).send();
// });

// app.post('/comment/new',async (req,res)=>{
//     let comment = req.body.comment;
//     let db = await connectDB();
//     let collection = db.collection(`comments`);
//     await collection.insertOne(comment);
//     res.status(200).send();
// });

export const addNewPrediction = async prediction => {
    let db = await connectDB()
    let collection = db.collection('predictions')
    await collection.insertOne(prediction)
}

export const updatePredictionDOS = async prediction => {
    let { owner, winner, finalist, topScorer, leastConceded, leagueMatches, r16Matches, quarterFinalMatches, semiFinalMatches, finalMatches } = prediction

    let db =await connectDB()
    let collection = db.collection('predictions')

    if ( winner ) await collection.updateOne( { owner }, { $set: { winner } })

    if ( finalist ) await collection.updateOne( { owner }, { $set: { finalist } })

    if ( topScorer ) await collection.updateOne( { owner }, { $set: { topScorer } })

    if ( leastConceded ) await collection.updateOne( { owner }, { $set: { leastConceded } })
    
    if ( leagueMatches ) await collection.updateOne( 
        { owner }, 
        { $set: { leagueMatches, r16Matches, quarterFinalMatches, semiFinalMatches, finalMatches } }
    )

    if ( r16Matches ) await collection.updateOne( 
        { owner }, 
        { $set: { r16Matches, quarterFinalMatches, semiFinalMatches, finalMatches } }
    )

    if ( quarterFinalMatches ) await collection.updateOne( 
        { owner }, 
        { $set: { quarterFinalMatches, semiFinalMatches, finalMatches } }
    )

    if ( semiFinalMatches ) await collection.updateOne( 
        { owner }, 
        { $set: { semiFinalMatches, finalMatches } }
    )

    if ( finalMatches ) await collection.updateOne( { owner }, { $set: { finalMatches } }
    )
}

export const updatePrediction = async prediction => {
    let { owner, winner, finalist, topScorer, leastConceded, leagueMatches, r16Matches, quarterFinalMatches, semiFinalMatches, finalMatches } = prediction

    let db = await connectDB()
    let collection = db.collection('predictions')

    if ( winner ) await collection.updateOne( { owner }, { $set: { winner } })

    if ( finalist ) await collection.updateOne( { owner }, { $set: { finalist } })

    if ( topScorer ) await collection.updateOne( { owner }, { $set: { topScorer } })

    if ( leastConceded ) await collection.updateOne( { owner }, { $set: { leastConceded } })

    if ( leagueMatches ) updatePredictionMatches(collection, owner, prediction, "leagueMatches")        

    if ( r16Matches ) updatePredictionMatches(collection, owner, prediction, "r16Matches")        
    
    if ( quarterFinalMatches ) updatePredictionMatches(collection, owner, prediction, "quarterFinalMatches")

    if ( semiFinalMatches ) updatePredictionMatches(collection, owner, prediction, "semiFinalMatches")

    if ( finalMatches ) updatePredictionMatches(collection, owner, prediction, "finalMatches")
}

export const addNewUser = async user => {
    let db = await connectDB()
    let collection = db.collection('users')
    await collection.insertOne(user)
}

export const updateUser = async user => {
    let { id, username} = user

    let db = await connectDB()
    let collection = db.collection('users')
    await collection.updateOne( { id }, { $set: { username } })
}


app.post('/prediction/new', async (req, res) => {
    let prediction = req.body.prediction
    await addNewPrediction(prediction)
    res.status(200).send()
})

app.post('/prediction/update-dos', async (req, res) => {
    let prediction = req.body.prediction
    await updatePredictionDOS(prediction)
    res.status(200).send()
})

app.post('/prediction/update', async (req, res) => {
    let prediction = req.body.prediction
    await updatePrediction(prediction)
    res.status(200).send()
})

app.post('/user/new', async (req, res) => {
    let user = req.body.user
    await addNewUser(user)
    res.status(200).send()
})

app.post('/user/update', async (req, res) => {
    let user = req.body.user
    await updateUser(user)
    res.status(200).send()
})
