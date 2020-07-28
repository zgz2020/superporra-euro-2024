import React from 'react'
import { connect }  from 'react-redux'
import { ConnectedStageScore } from './StageScore'
import { ConnectedGeneralPredictionScore } from './GeneralPredictionScore'

const ParticipantScoreDetailed = ({ userPredictions, results }) => (
    <div>
        <ConnectedStageScore stage="leagueMatches" userPredictions={userPredictions} results={results} />
        <ConnectedStageScore stage="r16Matches" userPredictions={userPredictions} results={results} />
        <ConnectedStageScore stage="quarterFinalMatches" userPredictions={userPredictions} results={results} />
        <ConnectedStageScore stage="semiFinalMatches" userPredictions={userPredictions} results={results} />
        <ConnectedStageScore stage="finalMatches" userPredictions={userPredictions} results={results} />
        <ConnectedGeneralPredictionScore title="Ganador" predictionName="winner" userPredictions={userPredictions} results={results} />
        <ConnectedGeneralPredictionScore title="Equipo(s) máximo goleador" predictionName="topScorer" userPredictions={userPredictions} results={results} />
        <ConnectedGeneralPredictionScore title="Equipo(s) menos goleado" predictionName="leastConceded" userPredictions={userPredictions} results={results} />
    </div>
)

const mapStateToProps = (state, ownProps) => {
    let { predictions } = state
    let { userID } = ownProps 

    let results = predictions.byId["U1"]
    let userPredictions = predictions.byId[userID]

    return {
        userPredictions,
        results
    }
}

export const ConnectedParticipantScoreDetailed = connect(mapStateToProps)(ParticipantScoreDetailed)
