import path from 'path';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import './initialize-db';

import { connectDB } from './connect-db'
import { updatePredictionMatches } from './serverUtils'


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
    let results = await db.collection('results').find().toArray()

    let mongoState = { users, predictions, results }

    res.send({ mongoState })
})

if (process.env.NODE_ENV == `production`) {
    app.use(express.static(path.resolve(__dirname,'../../dist')));
    app.get('/*',(req,res)=>{
        res.sendFile(path.resolve('index.html'));
    });
}


export const updateResults = async results => {

    let { id, winner, topScorer, leastConceded, leagueMatches, r16Matches, quarterFinalMatches, semiFinalMatches, finalMatches } = results

    let db =await connectDB()
    let collection = db.collection('results')

    if ( winner ) await collection.updateOne( { id }, { $set: { winner } })

    if ( topScorer ) await collection.updateOne( { id }, { $set: { topScorer } })

    if ( leastConceded ) await collection.updateOne( { id }, { $set: { leastConceded } })
    
    if ( leagueMatches ) await collection.updateOne( 
        { id }, 
        { $set: { leagueMatches, r16Matches, quarterFinalMatches, semiFinalMatches, finalMatches } }
    )

    if ( r16Matches ) await collection.updateOne( 
        { id }, 
        { $set: { r16Matches, quarterFinalMatches, semiFinalMatches, finalMatches } }
    )

    if ( quarterFinalMatches ) await collection.updateOne( 
        { id }, 
        { $set: { quarterFinalMatches, semiFinalMatches, finalMatches } }
    )

    if ( semiFinalMatches ) await collection.updateOne( 
        { id }, 
        { $set: { semiFinalMatches, finalMatches } }
    )

    if ( finalMatches ) await collection.updateOne( { id }, { $set: { finalMatches } }
    )
}

export const addNewPrediction = async prediction => {
    let db = await connectDB()
    let collection = db.collection('predictions')
    await collection.insertOne(prediction)
}

export const updatePredictionDOS = async prediction => {

    let { id, username, winner, topScorer, leastConceded, leagueMatches, r16Matches, quarterFinalMatches, semiFinalMatches, finalMatches } = prediction

    let db =await connectDB()
    let collection = db.collection('predictions')

    if ( username ) await collection.updateOne( { id }, { $set: { username} })

    if ( winner ) await collection.updateOne( { id }, { $set: { winner } })

    if ( topScorer ) await collection.updateOne( { id }, { $set: { topScorer } })

    if ( leastConceded ) await collection.updateOne( { id }, { $set: { leastConceded } })
    
    if ( leagueMatches ) await collection.updateOne( 
        { id }, 
        { $set: { leagueMatches, r16Matches, quarterFinalMatches, semiFinalMatches, finalMatches } }
    )

    if ( r16Matches ) await collection.updateOne( 
        { id }, 
        { $set: { r16Matches, quarterFinalMatches, semiFinalMatches, finalMatches } }
    )

    if ( quarterFinalMatches ) await collection.updateOne( 
        { id }, 
        { $set: { quarterFinalMatches, semiFinalMatches, finalMatches } }
    )

    if ( semiFinalMatches ) await collection.updateOne( 
        { id }, 
        { $set: { semiFinalMatches, finalMatches } }
    )

    if ( finalMatches ) await collection.updateOne( { id }, { $set: { finalMatches } }
    )
}

export const updatePrediction = async prediction => {
    let { id, username, winner, topScorer, leastConceded, leagueMatches, r16Matches, quarterFinalMatches, semiFinalMatches, finalMatches } = prediction

    let db = await connectDB()
    let collection = db.collection('predictions')

    if ( username ) await collection.updateOne( { id }, { $set: { username} })

    if ( winner ) await collection.updateOne( { id }, { $set: { winner } })

    if ( topScorer ) await collection.updateOne( { id }, { $set: { topScorer } })

    if ( leastConceded ) await collection.updateOne( { id }, { $set: { leastConceded } })

    if ( leagueMatches ) updatePredictionMatches(collection, id, prediction, "leagueMatches")        

    if ( r16Matches ) updatePredictionMatches(collection, id, prediction, "r16Matches")        
    
    if ( quarterFinalMatches ) updatePredictionMatches(collection, id, prediction, "quarterFinalMatches")

    if ( semiFinalMatches ) updatePredictionMatches(collection, id, prediction, "semiFinalMatches")

    if ( finalMatches ) updatePredictionMatches(collection, id, prediction, "finalMatches")
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


app.post('/results/update', async (req, res) => {
    let results = req.body.results
    await updateResults(results)
    res.status(200).send()
})

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
