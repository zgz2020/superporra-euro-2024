import React from 'react'
import { connect } from 'react-redux'
import { ConnectedHeader } from '../Header'
import { ConnectedStagePoints } from '../StagePoints'
import { ConnectedGeneralPredictionScore } from '../GeneralPredictionScore'

const ParticipantScoreDetailedPage = (ownProps) => (
    <div>
        {ownProps.user ?
            <div>
                <ConnectedHeader title={`${ownProps.translations.participantScoreDetailedPage.title}: ${ownProps.user.username}`} /> 

                <ConnectedStagePoints {...ownProps} stage="leagueMatches" matchType="league" />

                <ConnectedStagePoints {...ownProps} stage="r16Matches" matchType="r16" />

                <ConnectedStagePoints {...ownProps} stage="quarterFinalMatches" matchType="quarterFinal" />

                <ConnectedStagePoints {...ownProps} stage="semiFinalMatches" matchType="semiFinal" />

                <ConnectedStagePoints {...ownProps} stage="finalMatches" matchType="final" />

                <ConnectedGeneralPredictionScore {...ownProps} title={ownProps.translations.predictionsForm.euroWinner} predictionName="winner" />
                <ConnectedGeneralPredictionScore {...ownProps} title={ownProps.translations.predictionsForm.topScorer} predictionName="topScorer" />
                <ConnectedGeneralPredictionScore {...ownProps} title={ownProps.translations.predictionsForm.leastConceded} predictionName="leastConceded" />
            </div>
            :
            <div>{ownProps.translations.placeholders.loading}</div>
        }
    </div>
)

const mapSatateToProps = (state, ownProps) => {
    let { translations, predictions } = state 
    let userID = ownProps.match.params.id
    let user = state.users.byId[userID]
    let userPredictions = predictions.byId[userID]
    let results = predictions.byId["U1"]

    return {
        ...ownProps,
        user,
        userID,
        userPredictions,
        results,
        translations
    }
}

export const ConnectedParticipantScoreDetailedPage = connect(mapSatateToProps)(ParticipantScoreDetailedPage)
