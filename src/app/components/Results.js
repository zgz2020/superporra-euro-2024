import React from 'react'
import { connect } from 'react-redux'
import { ConnectedEuroStage } from './EuroStage'
import { ConnectedGeneralPrediction } from './generalPrediction'

const Results = (ownProps) => (
    <div key="user" data-automation="results-container">
        <div className="card mx-auto" style={{width: "28rem"}}>

            <div className="card-body">

                <ConnectedEuroStage { ...ownProps } mode="show" stageName="Fase de grupos" matchType="league" />

                <ConnectedEuroStage { ...ownProps } mode="show" stageName="Dieciseisavos de final" matchType="r16" />

                <ConnectedEuroStage { ...ownProps } mode="show" stageName="Cuartos de final" matchType="quarterFinal" />

                <ConnectedEuroStage { ...ownProps } mode="show" stageName="Semifinales" matchType="semiFinal" />

                <ConnectedEuroStage { ...ownProps } mode="show" stageName="Final" matchType="final" />

                <ConnectedGeneralPrediction { ...ownProps } title="Campeón" predictionName="winner" />

                <ConnectedGeneralPrediction { ...ownProps } title="Equipo(s) máximo goleador" predictionName="topScorer" />

                <ConnectedGeneralPrediction { ...ownProps } title="Equipo(s) menos goleado" predictionName="leastConceded" />
            </div>

        </div>
    </div>
)

const mapStateToProps = (state, ownProps) => {
    let { userID } = ownProps
    let prediction = state.predictions.byId[userID]
    return {
        ...ownProps,
        prediction
    }
}

export const ConnectedResults = connect(mapStateToProps)(Results)