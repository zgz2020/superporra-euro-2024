import React from 'react'
import { connect } from 'react-redux' 
import * as mutations from '../../store/mutations' 
import { ConnectedHeader } from '../Header'
import { ConnectedPredictionsFormButton } from '../PredictionsFormButton'
import { ConnectedPredictionsForm } from '../PredictionsForm'
import { ConnectedParticipantsList } from '../ParticipantsList'
  

const AccountPage = ({ 
    session,
    predictionsFormNew, 
    showPredictionsFormNew, 
    newPrediction, 
    translations, 
    predictions 
}) => {
    
    const myPredictions = Object.keys(predictions.byId).filter(prediction => 
        predictions.byId[prediction].owner === session.id)
        .reduce((myPredictionsList, owner) => {
            myPredictionsList[owner] = predictions.byId[owner]
            return myPredictionsList
        }, {})
        
    return (
        <div>
            <ConnectedHeader title={translations.accountPage.title} />

            {session.id ?
                <div>
                    <div className="card">
                        <div className="card-header">
                            {translations.accountPage.myBets}
                        </div>
                        <div className="card-body">
                            {myPredictions.length === 0 ? 
                                translations.accountPage.noBets 
                                : 
                                <ConnectedParticipantsList myPredictions={myPredictions} />
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
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { session, newPrediction, predictions, predictionsFormNew, translations } = state

    return {
        predictionsFormNew,
        newPrediction,
        translations,
        predictions,
        session
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