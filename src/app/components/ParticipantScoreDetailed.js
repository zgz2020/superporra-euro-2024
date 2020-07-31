import React from 'react'
import { connect }  from 'react-redux'
import { ConnectedStageScore } from './StageScore'
import { ConnectedGeneralPredictionScore } from './GeneralPredictionScore'

const ParticipantScoreDetailed = ({ userPredictions, results, translations }) => (
    <div>
        <ConnectedStageScore stage="leagueMatches" userPredictions={userPredictions} results={results} />
        <ConnectedStageScore stage="r16Matches" userPredictions={userPredictions} results={results} />
        <ConnectedStageScore stage="quarterFinalMatches" userPredictions={userPredictions} results={results} />
        <ConnectedStageScore stage="semiFinalMatches" userPredictions={userPredictions} results={results} />
        <ConnectedStageScore stage="finalMatches" userPredictions={userPredictions} results={results} />
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
