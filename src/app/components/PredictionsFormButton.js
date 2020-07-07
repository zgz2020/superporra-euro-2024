import React from 'react'
import { connect } from 'react-redux'

const PredictionsFormButton = ({ predictionType, predictionsFormNew, predictionsFormExistent, predictionsFormResults, clickHandler }) => {
    
    let formTrigger = (predictionType) => {
        switch (predictionType) {
            case "new":
                return predictionsFormNew
            case "existent":
                return predictionsFormExistent
            case "results":
                return predictionsFormResults
        }
    }
    return (
        <div className="text-center py-3">
            {!formTrigger(predictionType) ?
                <button onClick={clickHandler} className="btn btn-primary" data-automation="update-button">
                    {predictionType === 'new' ? 'PARTICIPAR' : 'ACTUALIZAR'}
                </button>
                :
                null
            }
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { predictionsFormNew, predictionsFormExistent, predictionsFormResults } = state
    const { predictionType, clickHandler } = ownProps
    return {
        predictionsFormNew, 
        predictionsFormExistent, 
        predictionsFormResults,
        predictionType,
        clickHandler
    }
}

export const ConnectedPredictionsFormButton = connect(mapStateToProps)(PredictionsFormButton)