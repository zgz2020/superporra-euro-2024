import React from 'react'
import { connect } from 'react-redux' 
import { history } from '../store/history'
import { Link } from 'react-router-dom'
import { ConnectedHeader } from '../components/Header'
import { ConnectedParticipantsListsSelection } from '../components/ParticipantsListsSelection'
import { ConnectedPredictionsFormButton } from '../components/PredictionsFormButton'
import { ConnectedPredictionsForm } from '../components/PredictionsForm'
import { ConnectedHomepageSponsor } from '../components/HomepageSponsor'
import { ConnectedCommentsBox } from '../components/CommentsBox'

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
    <div className="mb-5">
        <ConnectedHeader title={translations.participantsPage.title} />

        <ConnectedHomepageSponsor />

        <div className="my-5"></div>

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

                {/* <div className="text-center py-3">
                    <Link 
                        to={"/join"}
                        data-automation="join-link"
                    >
                        <button className="btn btn-primary btn-lg">
                            {translations.navigation.join}
                        </button>
                    </Link>
                </div>   */}
            </div>
        }

        <div className="my-5"></div>
        
        <ConnectedCommentsBox />
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