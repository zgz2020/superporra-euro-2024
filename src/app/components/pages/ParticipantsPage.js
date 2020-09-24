import React from 'react'
import { connect } from 'react-redux' 
import { ConnectedHeader } from '../Header'
import { ConnectedParticipantsList } from '../ParticipantsList'
import { ConnectedPredictionsFormButton } from '../PredictionsFormButton'
import { ConnectedPredictionsForm } from '../PredictionsForm'
import { signIn } from '../../../Auth/Auth'

const ParticipantsPage = ({ 
    predictionsFormNew,
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
    </div>
)


const mapStateToProps = (state) => {
    const { predictionsFormNew, predictionsSubmitted, translations } = state
    return {
        predictionsFormNew,
        translations
    }
}

export const ConnectedParticipantsPage = connect(mapStateToProps)(ParticipantsPage)