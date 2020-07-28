import React from 'react'
import { connect } from 'react-redux' 
import * as mutations from '../../store/mutations'
import { ConnectedHeader } from '../Header'
import { ConnectedParticipantsList } from '../ParticipantsList'
import { ConnectedPredictionsFormButton } from '../PredictionsFormButton'
import { ConnectedPredictionsForm } from '../PredictionsForm'

const ParticipantsPage = ({ predictionsFormNew, showPredictionsFormNew, predictionsSubmitted }) => (
    <div>
        <ConnectedHeader title="Participantes de la superporra" />

        {predictionsFormNew ? 
            <ConnectedPredictionsForm predictionType="new" userID="" /> 
            : 
            <div>
                <ConnectedParticipantsList />

                <ConnectedPredictionsFormButton predictionType="new" clickHandler={showPredictionsFormNew} />
            </div>
        }

        {predictionsSubmitted ? 
            <div className="card mx-auto">
                <div className="card-body text-center" data-automation="prediction-submitted-success">
                    Se han enviado tus predicciones!
                </div>
            </div> 
            : null
        }
    </div>
)

const mapStateToProps = (state) => {
    const { predictionsFormNew, predictionsSubmitted } = state
    return {
        predictionsFormNew,
        predictionsSubmitted
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showPredictionsFormNew() {
            dispatch(mutations.showPredictionsFormNew())
            dispatch(mutations.hidePredictionsSubmitted())
        }
    }
}

export const ConnectedParticipantsPage = connect(mapStateToProps, mapDispatchToProps)(ParticipantsPage)