import React from 'react'
import { connect } from 'react-redux' 
import * as mutations from '../store/mutations' 
import { Link } from 'react-router-dom'
import { ConnectedHeader } from '../components/Header'
import { ConnectedPredictionsFormButton } from '../components/PredictionsFormButton'
import { ConnectedPredictionsForm } from '../components/PredictionsForm'
import { ConnectedPrivateLeagues } from '../components/PrivateLeagues'
import { ConnectedMyBetsTable } from '../components/MyBetsTable'
  

const AccountPage = ({ 
    session,
    predictionsFormNew, 
    showPredictionsFormNew, 
    newPrediction, 
    translations, 
    predictions,
    myBets,
    myBetsId,
    myPrivateLeagues
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
                            {Object.keys(myPredictions).length === 0 ?
                                translations.accountPage.noBets                                 
                                :
                                <ConnectedMyBetsTable myBets={myBets} />
                            }
                        </div>
                    </div>

                    {predictionsFormNew ? 
                        <div className="mt-5">
                            <ConnectedPredictionsForm predictionType="new" predictionsOrResults={newPrediction} /> 
                        </div>
                        : 
                        myBets == 'NO BETS' ? 
                            <ConnectedPredictionsFormButton predictionType="new" clickHandler={showPredictionsFormNew} />
                            :
                            null                            
                    }

                    {Object.keys(myPredictions).length !== 0 &&
                        <ConnectedPrivateLeagues predictionID={myBetsId} myPrivateLeagues={myPrivateLeagues} myPredictions={myPredictions} />}
                </div>
                :
                <div className="card">
                    <div className="card-header">
                        {translations.accountPage.notSignedIn.title}
                    </div>
                    <div className="card-body">
                        {translations.accountPage.notSignedIn.description}{" "}
                        <Link to={"/sign-in"} data-automation="sign-in-link">
                            {translations.signInPage.signIn}
                        </Link>
                    </div>
                </ div>
            }
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    let { session, newPrediction, predictions, predictionsFormNew, translations } = state

    let myBetsId = session ? Object.keys(predictions.byId).find(prediction => predictions.byId[prediction].owner == session.id) : null
    let myBets = myBetsId ? predictions.byId[myBetsId] : 'NO BETS'
    let myPrivateLeagues = myBetsId ? predictions.byId[myBetsId].privateLeague : 'NO LEAGUES'

    return {
        predictionsFormNew,
        newPrediction,
        translations,
        predictions,
        session,
        myBets,
        myBetsId,
        myPrivateLeagues
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