import React from 'react'
import { connect } from 'react-redux'
import { ConnectedEuroStage } from './EuroStage'
import { ConnectedGeneralPrediction } from './GeneralPrediction'

const Results = (ownProps) => (
    <div key="user" data-automation="results-container" className="card mx-auto">
        <ConnectedEuroStage 
            { ...ownProps } 
            mode="show" 
            stageName={ownProps.translations.stages.groupStage} 
            matchType="league" 
            stage="leagueMatches"
        />

        <ConnectedEuroStage 
            { ...ownProps } 
            mode="show" 
            stageName={ownProps.translations.stages.r16} 
            matchType="r16" 
            stage="r16Matches"
        />

        <ConnectedEuroStage 
            { ...ownProps } 
            mode="show" 
            stageName={ownProps.translations.stages.quarterFinals} 
            matchType="quarterFinal" 
            stage="quarterFinalMatches"
        />

        <ConnectedEuroStage 
            { ...ownProps } 
            mode="show" 
            stageName={ownProps.translations.stages.semiFinals} 
            matchType="semiFinal"
            stage="semiFinalMatches"
        />

        <ConnectedEuroStage 
            { ...ownProps } 
            mode="show"
            stageName={ownProps.translations.stages.final}
            matchType="final"
            stage="finalMatches"
        />

        <ConnectedGeneralPrediction 
            { ...ownProps } 
            title={ownProps.translations.predictionsForm.euroWinner} 
            predictionName="winner"
        />

        <ConnectedGeneralPrediction 
            { ...ownProps } 
            title={ownProps.translations.predictionsForm.topScorer} 
            predictionName="topScorer"
        />

        <ConnectedGeneralPrediction 
            { ...ownProps }
            title={ownProps.translations.predictionsForm.leastConceded}
            predictionName="leastConceded"
        />
    </div>
)

const mapStateToProps = (state, ownProps) => {
    let { translations, newPrediction, predictions, results } = state
    let { predictionID, predictionType } = ownProps

    let predictionsOrResults = {}
    switch(predictionType) {
        case "new":   
            predictionsOrResults = newPrediction
            break
        case "existent":   
            predictionsOrResults = predictions.byId[predictionID]
            break
        case "results":   
            predictionsOrResults = results
            break
    }

    return {
        ...ownProps,
        predictionsOrResults,
        translations
    }
}

export const ConnectedResults = connect(mapStateToProps)(Results)