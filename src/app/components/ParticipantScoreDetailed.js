import React from 'react'
import { connect }  from 'react-redux'
import { ConnectedStagePoints } from './StagePoints'
import { ConnectedGeneralPredictionScore } from './GeneralPredictionScore'

const ParticipantScoreDetailed = ({ userPredictions, results, translations }) => (
    <div>
        <ConnectedStagePoints stage="leagueMatches" userPredictions={userPredictions} results={results} />
        <ConnectedStagePoints stage="r16Matches" userPredictions={userPredictions} results={results} />
        <ConnectedStagePoints stage="quarterFinalMatches" userPredictions={userPredictions} results={results} />
        <ConnectedStagePoints stage="semiFinalMatches" userPredictions={userPredictions} results={results} />
        <ConnectedStagePoints stage="finalMatches" userPredictions={userPredictions} results={results} />
        <ConnectedGeneralPredictionScore title={translations.predictionsForm.euroWinner} predictionName="winner" userPredictions={userPredictions} results={results} />
        <ConnectedGeneralPredictionScore title={translations.predictionsForm.topScorer} predictionName="topScorer" userPredictions={userPredictions} results={results} />
        <ConnectedGeneralPredictionScore title={translations.predictionsForm.leastConceded} predictionName="leastConceded" userPredictions={userPredictions} results={results} />
    </div>
)

const mapStateToProps = (state, ownProps) => {
    let { predictions, translations } = state
    let { userID } = ownProps 

    let results = predictions.byId["U1"]
    let userPredictions = predictions.byId[userID]

    return {
        userPredictions,
        results,
        translations
    }
}

export const ConnectedParticipantScoreDetailed = connect(mapStateToProps)(ParticipantScoreDetailed)
