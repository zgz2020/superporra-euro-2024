import React from 'react'
import { connect } from 'react-redux' 
import * as mutations from '../../store/mutations' 
import { ConnectedResults } from '../Results'
import { ConnectedHeader } from '../Header'
import { ConnectedPredictionsFormButton } from '../PredictionsFormButton'
import { ConnectedPredictionsForm } from '../PredictionsForm'
import { ConnectedParticipantsList } from '../ParticipantsList'
  

const AccountPage = ({ loggedUser, predictionsFormNew, showPredictionsFormNew, newPrediction, translations, predictions }) => {
    
    const myPredictions = Object.keys(predictions.byId).filter( prediction => 
        predictions.byId[prediction].owner === loggedUser.userID )

    return (
        <div>
            <ConnectedHeader title={translations.accountPage.title} />

            {loggedUser.userID ?
                <div>
                    <div className="card">
                        <div className="card-header">
                            {translations.accountPage.myBets}
                        </div>
                        <div className="card-body">
                            {myPredictions.length === 0 ? 
                                translations.accountPage.noBets 
                                : 
                                <ConnectedParticipantsList />
                            }
                        </div>
                    </div>

                    {predictionsFormNew ? 
                        <div className="mt-5">
                            <ConnectedPredictionsForm predictionType="new" predictionsOrResults={newPrediction} /> 
                        </div>
                        : 
                        <ConnectedPredictionsFormButton predictionType="new" clickHandler={showPredictionsFormNew} />
                    }
                </div>
                :
                <div className="card">
                    <div className="card-header">
                        {translations.accountPage.notSignedIn.title}
                    </div>
                    <div className="card-body">
                        {translations.accountPage.notSignedIn.description}
                    </div>
                </ div>
            }


            {/* {user ? 
                <div>
                    <ConnectedHeader title={`${translations.participantPredictionsPage.title}: ${user.username}`} />

                    {!predictionsFormExistent ?
                        <div>
                            <ConnectedPredictionsFormButton predictionType="existent" clickHandler={showPredictionsFormExistent} />

                            <ConnectedResults predictionType="existent" userID={user.id} />

                            <ConnectedPredictionsFormButton predictionType="existent" clickHandler={showPredictionsFormExistent} />
                        </div>
                        :
                        <ConnectedPredictionsForm predictionType="existent" userID={user.id}/> 
                    }
                </div>
                :
                <div>{translations.placeholders.loading}</div>
            } */}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { loggedUser, newPrediction, predictions, predictionsFormNew, translations } = state

    return {
        loggedUser,
        predictionsFormNew,
        newPrediction,
        translations,
        predictions
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

export const ConnectedAccountPage = connect(mapStateToProps, mapDispatchToProps)(AccountPage)