import React from 'react'
import { connect } from 'react-redux'
import { ConnectedEuroStage } from './EuroStage'

const Results = (ownProps) => (
    <div key="user">
        <div className="card mx-auto" style={{width: "28rem"}}>

            <div className="card-body">

                {"Ganador: "}{ownProps.prediction.winner}
                <br />
                {"Finalista: "}{ownProps.prediction.finalist}
                <br />
                {"Máximo goleador: "}{ownProps.prediction.topScorer}
                <br />
                {"Menos goleado: "}{ownProps.prediction.leastConceded}
                <br />
                <br />

                <ConnectedEuroStage { ...ownProps } mode="show" stageName="Fase de grupos" matchType="league" />

                <ConnectedEuroStage { ...ownProps } mode="show" stageName="Dieciseisavos de final" matchType="r16" />

                <ConnectedEuroStage { ...ownProps } mode="show" stageName="Cuartos de final" matchType="quarterFinal" />

                <ConnectedEuroStage { ...ownProps } mode="show" stageName="Semifinales" matchType="semiFinal" />

                <ConnectedEuroStage { ...ownProps } mode="show" stageName="Final" matchType="final" />

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