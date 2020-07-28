import React from 'react'
import { connect } from 'react-redux'

const GeneralPrediction = ( { title, predictionName, predictionType, userPrediction, newPrediction } ) => {

    let prediction = predictionType === "new" ? newPrediction : userPrediction

    return (
        <div className="card" data-automation="general-prediction">
            <div className="card-header">
                {title}
            </div>

            {predictionName === "winner" || prediction[predictionName] === "???" ?
                    <div className="card-body text-center">
                        {prediction[predictionName]}
                    </div>
                    :
                    <div className="card-body text-center">
                        {Object.keys(prediction[predictionName]).map(team => (
                            <div key={team}>
                                {prediction[predictionName][team].team}
                                {" - "}
                                {prediction[predictionName][team].goals}
                                {prediction[predictionName][team].goals === 1 ? " goal" : " goals"}
                            </div>
                        ))}
                    </div>
            }
    
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { newPrediction } = state
    const { title, predictionName, predictionType, userID } = ownProps
    const userPrediction = state.predictions.byId[userID]
    return {
        title,
        predictionName, // NOTE: 'predictionName' accepted values: "winner" / "topScorer" / "leastConceded"
        predictionType, 
        userPrediction,
        newPrediction
    }
}

export const ConnectedGeneralPrediction = connect(mapStateToProps)(GeneralPrediction)