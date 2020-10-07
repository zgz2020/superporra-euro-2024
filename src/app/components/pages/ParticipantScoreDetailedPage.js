import React from 'react'
import { connect } from 'react-redux'
import { ConnectedHeader } from '../Header'
import { ConnectedStagePoints } from '../StagePoints'
import { ConnectedGeneralPredictionScore } from '../GeneralPredictionScore'

const ParticipantScoreDetailedPage = (ownProps) => (
    <div>
        {ownProps.userPredictions ?
            <div>
                <ConnectedHeader title={`${ownProps.translations.participantScoreDetailedPage.title}: ${ownProps.userPredictions.username}`} /> 

                <ConnectedStagePoints 
                    {...ownProps} 
                    stage="leagueMatches" 
                    matchType="league" 
                    predictionsOrResults={ownProps.userPredictions} 
                />

                <ConnectedStagePoints 
                    {...ownProps} 
                    stage="r16Matches" 
                    matchType="r16" 
                    predictionsOrResults={ownProps.userPredictions} 
                />

                <ConnectedStagePoints 
                    {...ownProps} 
                    stage="quarterFinalMatches" 
                    matchType="quarterFinal" 
                    predictionsOrResults={ownProps.userPredictions} 
                />

                <ConnectedStagePoints 
                    {...ownProps} 
                    stage="semiFinalMatches" 
                    matchType="semiFinal" 
                    predictionsOrResults={ownProps.userPredictions} 
                />

                <ConnectedStagePoints 
                    {...ownProps} stage="finalMatches" 
                    matchType="final" 
                    predictionsOrResults={ownProps.userPredictions} 
                /> 

                <ConnectedGeneralPredictionScore 
                    {...ownProps} 
                    title={ownProps.translations.predictionsForm.euroWinner} 
                    predictionName="winner" 
                />

                <ConnectedGeneralPredictionScore 
                    {...ownProps} 
                    title={ownProps.translations.predictionsForm.topScorer} 
                    predictionName="topScorer" 
                />

                <ConnectedGeneralPredictionScore 
                    {...ownProps} 
                    title={ownProps.translations.predictionsForm.leastConceded} 
                    predictionName="leastConceded" 
                />
            </div>
            :
            <div>{ownProps.translations.placeholders.loading}</div>
        }
    </div>
)

const mapSatateToProps = (state, ownProps) => {
    let { translations, predictions, results } = state 
    let predictionID = ownProps.match.params.id
    let userPredictions = predictions.byId[predictionID]

    return {
        ...ownProps,
        predictionID,
        userPredictions,
        results,
        translations
    }
}

export const ConnectedParticipantScoreDetailedPage = connect(mapSatateToProps)(ParticipantScoreDetailedPage)
