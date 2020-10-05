import React from 'react'
import { connect } from 'react-redux' 
import { history } from '../../store/history'
import { ConnectedHeader } from '../Header'
import { ConnectedParticipantsList } from '../ParticipantsList'
import { ConnectedPredictionsFormButton } from '../PredictionsFormButton'
import { ConnectedPredictionsForm } from '../PredictionsForm'


const redirectToSignInPage = () => history.push('/sign-in') 
const redirectToAccountPage = () => history.push('/account')

const ParticipantsPage = ({ 
    predictionsFormNew,
    translations,
    authenticated
}) => (
    <div>
        <ConnectedHeader title={translations.participantsPage.title} />

        {predictionsFormNew ? 
            <ConnectedPredictionsForm predictionType="new" userID="" /> 
            : 
            <div>
                <ConnectedParticipantsList />

                <ConnectedPredictionsFormButton predictionType="new" clickHandler={authenticated ? redirectToAccountPage : redirectToSignInPage} />
            </div>
        }
    </div>
)


const mapStateToProps = (state) => {
    const { predictionsFormNew, translations, session } = state
    let authenticated = session.authenticated === 'AUTHENTICATED'

    return {
        predictionsFormNew,
        translations,
        authenticated
    }
}

export const ConnectedParticipantsPage = connect(mapStateToProps)(ParticipantsPage)