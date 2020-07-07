import React from 'react'
import { connect } from 'react-redux' 
import * as mutations from '../../store/mutations'
import { ConnectedHeader } from '../Header'
import { ConnectedParticipantsList } from '../ParticipantsList'
import { ConnectedPredictionsFormButton } from '../PredictionsFormButton'
import { ConnectedPredictionsForm } from '../PredictionsForm'

const ParticipantsPage = ({ predictionsFormNew, showPredictionsFormNew, predictionsSubmitted }) => (
    <div>
        <h2 className="jumbotron">
            <ConnectedHeader title="Participantes de la superporra"/>
        </h2>

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
                <div className="card-body text-center">
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