import React from 'react'
import { connect } from 'react-redux' 
import { ConnectedResults } from '../Results'
import { ConnectedHeader } from '../Header'

const PredictionsPage = ({ predictions, users }) => (
    <div>
        <h2 className="jumbotron">
            <ConnectedHeader title="Predicciones"/>
        </h2>
        {Object.keys(predictions.byId).map(key => {
            if (key !== "U1") {
                return (
                    <div key={key}>
                        <div className="card mx-auto" style={{width: "28rem"}}>
                            <div className="card-header">
                                {"Participante: "}{users.byId[key].username}
                            </div>
                        </div>
                        <ConnectedResults user={key}/>
                        <br />
                    </div>
                )
            }
        })}
    </div>
)

const mapStateToProps = (state) => {
    return { 
        predictions: state.predictions,
        users: state.users
    }
}

export const ConnectedPredictionsPage = connect(mapStateToProps)(PredictionsPage)