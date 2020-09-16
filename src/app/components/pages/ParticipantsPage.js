import React from 'react'
import { connect } from 'react-redux' 
import { Redirect } from 'react-router'
import * as mutations from '../../store/mutations'
import { ConnectedHeader } from '../Header'
import { ConnectedParticipantsList } from '../ParticipantsList'
import { ConnectedPredictionsFormButton } from '../PredictionsFormButton'
import { ConnectedPredictionsForm } from '../PredictionsForm'
import { signIn } from '../../../Auth/Auth'

const ParticipantsPage = ({ 
    predictionsFormNew,
    predictionsSubmitted,
    translations
}) => (
    <div>
        <ConnectedHeader title={translations.participantsPage.title} />

        {predictionsFormNew ? 
            <ConnectedPredictionsForm predictionType="new" userID="" /> 
            : 
            <div>
                <ConnectedParticipantsList />

                <ConnectedPredictionsFormButton predictionType="new" clickHandler={signIn} />
            </div>
        }

        {predictionsSubmitted ? 
            <div className="card mx-auto">
                <div className="card-body text-center" data-automation="prediction-submitted-success">
                    {translations.common.predictionsSubmitted}
                </div>
            </div> 
            : null
        }
    </div>
)

const mapStateToProps = (state) => {
    const { predictionsFormNew, predictionsSubmitted, translations } = state
    return {
        predictionsFormNew,
        predictionsSubmitted,
        translations
    }
}

export const ConnectedParticipantsPage = connect(mapStateToProps)(ParticipantsPage)