import React from 'react'
import { connect } from 'react-redux' 
import { history } from '../store/history'
import { ConnectedHeader } from '../components/Header'
import { ConnectedParticipantsListsSelection } from '../components/ParticipantsListsSelection'
import { ConnectedPredictionsFormButton } from '../components/PredictionsFormButton'
import { ConnectedPredictionsForm } from '../components/PredictionsForm'
import { ConnectedHomepageSponsor } from '../components/HomepageSponsor'

const noParticipantsBlock = (translations) => (
    <div className="card">
        <div className="card-body p-5">
            {translations.participantsPage.noParticipantsYet}
        </div>
    </div>
)    

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

        <ConnectedHomepageSponsor />

        <div className="my-3"></div>

        {predictionsFormNew ? 
            <ConnectedPredictionsForm predictionType="new" userID="" /> 
            : 
            <div>
                {noParticipants ?
                    noParticipantsBlock(translations)
                    :
                    <div>
                        <ConnectedParticipantsListsSelection />
                    </div>
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