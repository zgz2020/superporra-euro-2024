import React from 'react'
import { connect } from 'react-redux' 
import * as mutations from '../../store/mutations' 
import { ConnectedResults } from '../Results'
import { ConnectedHeader } from '../Header'
import { ConnectedPredictionsFormButton } from '../PredictionsFormButton'
import { ConnectedPredictionsForm } from '../PredictionsForm'
 
const ParticipantPredictionsPage = ({
    predictionID,
    prediction,
    predictionOwner,
    predictionsFormExistent,
    showPredictionsFormExistent,
    translations
}) => (
    <div>
        {prediction ? 
            <div>
                <ConnectedHeader title={`${translations.participantPredictionsPage.title}: ${prediction.username}`} />

                {!predictionsFormExistent ?
                    <div>
                        {predictionOwner ? 
                            <ConnectedPredictionsFormButton predictionType="existent" clickHandler={showPredictionsFormExistent} />
                            :
                            null
                        }

                        <ConnectedResults predictionType="existent" predictionID={predictionID} />

                        {predictionOwner ? 
                            <ConnectedPredictionsFormButton predictionType="existent" clickHandler={showPredictionsFormExistent} />
                            :
                            null
                        }
                    </div>
                    :
                    <ConnectedPredictionsForm predictionType="existent" predictionsOrResults={prediction}/> 
                }
            </div>
            :
            <div>{translations.placeholders.loading}</div>
        }
    </div>
)

const mapStateToProps = (state, ownProps) => {
    const { predictionsFormExistent, translations, predictions, session } = state
    let predictionID = ownProps.match.params.id
    let prediction = predictions.byId[predictionID]
    let predictionOwner = prediction && session.id ? session.id === prediction.owner : false

    return { 
        predictionID,
        prediction,
        predictionOwner,
        predictionsFormExistent,
        translations
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showPredictionsFormExistent() {
            dispatch(mutations.showPredictionsFormExistent())
        }
    }
}

export const ConnectedParticipantPredictionsPage = connect(mapStateToProps, mapDispatchToProps)(ParticipantPredictionsPage)