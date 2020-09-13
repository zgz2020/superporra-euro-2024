import React from 'react'
import { connect } from 'react-redux'
import { ConnectedEuroStage } from './EuroStage'
import { ConnectedGeneralPrediction } from './GeneralPrediction'

const Results = (ownProps) => (
    <div key="user" data-automation="results-container" className="card mx-auto">
        <ConnectedEuroStage { ...ownProps } mode="show" stageName={ownProps.translations.stages.groupStage} matchType="league" />

        <ConnectedEuroStage { ...ownProps } mode="show" stageName={ownProps.translations.stages.r16} matchType="r16" />

        <ConnectedEuroStage { ...ownProps } mode="show" stageName={ownProps.translations.stages.quarterFinals} matchType="quarterFinal" />

        <ConnectedEuroStage { ...ownProps } mode="show" stageName={ownProps.translations.stages.semiFinals} matchType="semiFinal" />

        <ConnectedEuroStage { ...ownProps } mode="show" stageName={ownProps.translations.stages.final} matchType="final" />

        <ConnectedGeneralPrediction { ...ownProps } title={ownProps.translations.predictionsForm.euroWinner} predictionName="winner" />

        <ConnectedGeneralPrediction { ...ownProps } title={ownProps.translations.predictionsForm.topScorer} predictionName="topScorer" />

        <ConnectedGeneralPrediction { ...ownProps } title={ownProps.translations.predictionsForm.leastConceded} predictionName="leastConceded" />
    </div>
)

const mapStateToProps = (state, ownProps) => {
    let { translations, newPrediction, results } = state
    let { userID, predictionType } = ownProps

    let predictionsOrResults = {}
    switch(predictionType) {
        case "new":   
            predictionsOrResults = newPrediction
        case "existent":   
            predictionsOrResults = state.predictions.byId[userID]
        case "results":   
            predictionsOrResults = results
    }

    return {
        ...ownProps,
        predictionsOrResults,
        translations
    }
}

export const ConnectedResults = connect(mapStateToProps)(Results)