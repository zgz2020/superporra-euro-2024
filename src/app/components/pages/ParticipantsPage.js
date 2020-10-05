import React from 'react'
import { connect } from 'react-redux' 
import { history } from '../../store/history'
import { ConnectedHeader } from '../Header'
import { ConnectedParticipantsList } from '../ParticipantsList'
import { ConnectedPredictionsFormButton } from '../PredictionsFormButton'
import { ConnectedPredictionsForm } from '../PredictionsForm'
import { translations } from '../../store/reducers/language'

    
const redirectToSignInPage = () => history.push('/sign-in') 
const redirectToAccountPage = () => history.push('/account')


const ParticipantsPage = ({ 
    predictionsFormNew,
    translations,
    noParticipants,
    authenticated
}) => (
    <div>
        <ConnectedHeader title={translations.participantsPage.title} />

        {predictionsFormNew ? 
            <ConnectedPredictionsForm predictionType="new" userID="" /> 
            : 
            <div>
                {noParticipants ?
                    <div className="card">
                        <div className="card-body p-5">
                            {translations.participantsPage.noParticipantsYet}
                        </div>
                    </div>
                    :
                    <ConnectedParticipantsList />
                }

                <ConnectedPredictionsFormButton predictionType="new" clickHandler={authenticated ? redirectToAccountPage : redirectToSignInPage} />
            </div>
        }
    </div>
)


const mapStateToProps = (state) => {
    const { predictionsFormNew, translations, session, predictions } = state
    let noParticipants = predictions.allIds.length === 0 ? true : false
    let authenticated = session.authenticated === 'AUTHENTICATED'

    return {
        predictionsFormNew,
        translations,
        noParticipants,
        authenticated
    }
}

export const ConnectedParticipantsPage = connect(mapStateToProps)(ParticipantsPage)