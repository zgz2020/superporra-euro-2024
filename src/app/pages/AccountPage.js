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
    myBets,
    myBetsId,
    myPrivateLeagues,
    joiningCompetitionSuccess
}) => (
    <div>
        <ConnectedHeader title={translations.accountPage.title} />

        {session.id ?
            <div className="mb-5">
                {joiningCompetitionSuccess &&
                    <div className="text-center">
                        <p
                            className="text-success font-italic mt-2"
                            data-automation={"competition-joined"}
                        >
                            {translations.accountPage.joinedCompetitionSuccessfully}
                        </p>
                    </div>}

                <div className="card">
                    <div className="card-header">
                        {translations.accountPage.myBets}
                    </div>
                    <div className="card-body">
                        {myBets == 'NO BETS' ?
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

                {myBets != 'NO BETS' &&
                    <ConnectedPrivateLeagues predictionID={myBetsId} myPrivateLeagues={myPrivateLeagues} />}
            </div>
            :
            <div className="card mb-5">
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


const mapStateToProps = (state) => {
    let { session,
        newPrediction,
        predictions,
        predictionsFormNew,
        translations,
        joiningCompetitionSuccess
    } = state

    let myBetsId = session ? Object.keys(predictions.byId).find(prediction => predictions.byId[prediction].owner == session.id) : null
    let myBets = myBetsId ? predictions.byId[myBetsId] : 'NO BETS'
    let myPrivateLeagues = myBetsId && predictions.byId[myBetsId].privateLeague ? predictions.byId[myBetsId].privateLeague : []

    return {
        predictionsFormNew,
        newPrediction,
        translations,
        session,
        myBets,
        myBetsId,
        myPrivateLeagues,
        joiningCompetitionSuccess
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