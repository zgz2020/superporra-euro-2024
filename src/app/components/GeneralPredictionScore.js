import React from 'react'
import { connect } from 'react-redux'
import { getEuroWinnerPoints, getTeamGlobalGoalsPoints } from '../../utils/leaderboard'

const GeneralPredictionScore = ( { title, predictionName, userPredictions, results } ) => (
    <div className="card" data-automation="general-prediction">
        <div className="card-header">
            {title}
        </div>

        {predictionName === "winner" ? 
                <div className="card-body text-center">
                    {getEuroWinnerPoints(userPredictions, results)}
                </div>
                : null}
        {predictionName === "topScorer" || predictionName === "leastConceded" ? 
                <div className="card-body text-center">
                    {getTeamGlobalGoalsPoints(userPredictions, results, predictionName)}
                </div>
                : null}
    </div>
)

const mapStateToProps = (state, ownProps) => {
    const { title, predictionName, userPredictions, results } = ownProps
    return {
        title,
        predictionName, // NOTE: 'predictionName' accepted values: "winner" / "topScorer" / "leastConceded" 
        userPredictions,
        results
    }
}

export const ConnectedGeneralPredictionScore = connect(mapStateToProps)(GeneralPredictionScore)