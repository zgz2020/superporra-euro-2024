import React from 'react'
import { connect } from 'react-redux'
import * as mutations from '../store/mutations'
import { ConnectedMyPrivateLeagues } from './MyPrivateLeagues'

const PrivateLeagues = ({ translations, myPredictions, privateLeagues, myPredictionsNames, joinHandler, createHandler }) => (
    <div className="card my-5">
        <div className="card-header">
            {translations.leaderboard.privateLeagues}
        </div>
        <div className="card-body">
            <div className="container col-sm-7 col-md-7 col-lg-5 col-xl-4 mt-3">
                <div className="row justify-content-center">
                    <div className="text-center">
                        {translations.accountPage.privateLeagueIntro}
                    </div>

                    <ConnectedMyPrivateLeagues myPredictions={myPredictions}/>

                    <div className="card tab-card my-3">
                        <div className="card-header tab-card-header">
                            <ul className="nav nav-tabs card-header-tabs" id="privateLeaguesTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="join-tab" data-toggle="tab" href="#join-panel" role="tab" aria-controls="Join-panel" aria-selected="true">
                                        {translations.accountPage.joinLeague}
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="create-tab" data-toggle="tab" href="#create-panel" role="tab" aria-controls="Create-panel" aria-selected="false">
                                        {translations.accountPage.createLeague}
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="quit-tab" data-toggle="tab" href="#quit-panel" role="tab" aria-controls="Quit-panel" aria-selected="false">
                                        {translations.accountPage.quitLeague}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="tab-content" id="privateLeaguesTabContent">
                            <div className="tab-pane fade show active p-3" id="join-panel" role="tabpanel" aria-labelledby="join-tab">
                                <form onSubmit={joinHandler} className="mt-2">
                                    <select defaultValue="default" name="name" className="mb-3">
                                        <option key="default" value={translations.accountPage.selectName}>{translations.accountPage.selectName}</option>
                                        {myPredictionsNames.map(league => (
                                            <option key={league} value={league}>{league}</option>
                                        ))}
                                    </select>  
                                    <br />
                                    <select defaultValue="default" name="league" className="mb-3">
                                        <option key="default" value={translations.accountPage.selectLeague}>{translations.accountPage.selectLeague}</option>
                                        {privateLeagues.map(league => (
                                            <option key={league} value={league}>{league}</option>
                                        ))}
                                    </select>  

                                    <button type="submit" className="form-control mt-2 btn btn-primary">
                                        {translations.accountPage.submit}
                                    </ button>
                                </form>
                            </div>
                            <div className="tab-pane fade p-3" id="create-panel" role="tabpanel" aria-labelledby="create-tab">
                                <form onSubmit={createHandler}>
                                    {translations.accountPage.createLeaguePlaceholder}{":"}
                                    <input
                                        type="text" 
                                        name="leagueName"
                                        className="form-control my-2" 
                                        data-automation="league-name-input"
                                    >
                                    </input>

                                    {/* 
                                    {noEmailMessage &&  
                                        <p 
                                            className="text-danger font-italic mt-2"
                                            data-automation={`no-email-message-${type}`}
                                        >
                                            {translations.signInPage.noEmail}
                                        </p>
                                    } */}
                                    {/* <select defaultValue="default" name="name" className="mb-3">
                                        <option key="default" value={translations.accountPage.selectName}>{translations.accountPage.selectName}</option>
                                        {myPredictionsNames.map(league => (
                                            <option key={league} value={league}>{league}</option>
                                        ))}
                                    </select>  
                                    <br />
                                    <select defaultValue="default" name="league" className="mb-3">
                                        <option key="default" value={translations.accountPage.selectLeague}>{translations.accountPage.selectLeague}</option>
                                        {privateLeagues.map(league => (
                                            <option key={league} value={league}>{league}</option>
                                        ))}
                                    </select>   */}

                                    <button type="submit" className="form-control mt-2 btn btn-primary">
                                        {translations.accountPage.submit}
                                    </ button>
                                </form>
                                {/* <select onChange={showPrivateLeagueRankings} value={privateLeagueRankings} className="mb-3">
                                    <option key="default" value=" ">{"Select a private league"}</option>
                                    {privateLeagues.map(league => (
                                        <option key={league} value={league}>{league}</option>
                                    ))}
                                </select>  

                                {privateLeagueRankings && privateLeagueRankings != "--" && 
                                    <ConnectedParticipantsList filteredPredictions={privateLeaguePredictions(predictions, privateLeagueRankings)} />
                                }     */}
                            </div>
                        </div>      
                    </div>





                </div>
            </div>

        </div> 
    </div>
)

const mapStateToProps = (state, ownProps) => {
    let { translations, privateLeagues } = state
    let { myPredictions } = ownProps
    let myPredictionsNames = Object.keys(myPredictions).map(prediction => myPredictions[prediction].username)
    console.log('zzz - myPredictions: ', myPredictions)
    console.log('zzz - myPredictionsNames: ', myPredictionsNames)

    return { 
        translations,
        myPredictions,
        privateLeagues,
        myPredictionsNames
    }
}

const mapDispatchToProps = (dispatch) => {
    let name = (e) => e.target['name'].value
    let league = (e) => e.target['league'].value
    let leagueName = (e) => e.target['leagueName'].value

    return {
        joinHandler(e) {
            e.preventDefault()
            dispatch(mutations.requestUpdatePredictionPrivateLeague(name(e), league(e)))
        },
        createHandler(e) {
            e.preventDefault()
            // TODO
            console.log("CREATE LEAGUE!! - ", leagueName(e))
            dispatch(mutations.createPrivateLeague(leagueName(e)))
        }
    }
}
export const ConnectedPrivateLeagues = connect(mapStateToProps, mapDispatchToProps)(PrivateLeagues)