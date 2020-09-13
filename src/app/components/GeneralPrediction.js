import React from 'react'
import { connect } from 'react-redux'

const GeneralPrediction = ({ 
    title,
    predictionName,
    predictionsOrResults,
    translations
}) => {

    return (
        <div className="card" data-automation="general-prediction">
            <div className="card-header">
                {title}
            </div>

            {predictionName === "winner" || predictionsOrResults[predictionName] === "???" ?
                    <div className="card-body text-center">
                        {predictionsOrResults[predictionName]}
                    </div>
                    :
                    <div className="card-body text-center">
                        {Object.keys(predictionsOrResults[predictionName]).map(team => (
                            <div key={team}>
                                {predictionsOrResults[predictionName][team].team}
                                {" - "}
                                {predictionsOrResults[predictionName][team].goals}
                                {predictionsOrResults[predictionName][team].goals === 1 ? 
                                    ` ${translations.predictionsForm.goal}` : ` ${translations.predictionsForm.goals}`}
                            </div>
                        ))}
                    </div>
            }
    
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { translations } = state
    const { title, predictionName, predictionType, predictionsOrResults } = ownProps
    return {
        title,
        predictionName, // NOTE: 'predictionName' accepted values: "winner" / "topScorer" / "leastConceded"
        predictionType,
        predictionsOrResults,
        translations
    }
}

export const ConnectedGeneralPrediction = connect(mapStateToProps)(GeneralPrediction)