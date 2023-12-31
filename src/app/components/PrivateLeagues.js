import React from 'react'
import { connect } from 'react-redux'
import * as mutations from '../store/mutations'
import { ConnectedMyPrivateLeagues } from './MyPrivateLeagues'

const PrivateLeagues = ({ 
    translations,
    myPrivateLeagues,
    notJoinedLeagues,
    joinHandler,
    createHandler,
    quitHandler,
    joinLeagueError,
    joinLeagueSuccess,
    leagueNameValidation,
    createLeagueSuccess,
    leagueNameTaken,
    quitLeagueError,
    quitLeagueSuccess
}) => (
    <div className="card my-5">
        <div className="card-header">
            {translations.accountPage.myChampionships}
        </div>
        <div className="card-body">
            <div className="container col-sm-7 col-md-7 col-lg-5 col-xl-4 mt-3">
                <div className="row justify-content-center">
                    <ConnectedMyPrivateLeagues myPrivateLeagues={myPrivateLeagues} />

                    <div className="text-center lead mb-2">
                        {translations.accountPage.privateLeagueIntro}
                    </div>

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
                                <p className="lead">
                                    {translations.accountPage.joinLeagueIntro}
                                </p>
                                <p className="text-muted">
                                    {translations.accountPage.joinLeagueCreate}
                                </p>
                                <form onSubmit={joinHandler} className="mt-2">
                                    <select 
                                        defaultValue="default"
                                        name="league-join"
                                        className="mb-3"
                                        data-automation="league-name-select"
                                    >
                                        <option key="default" value={translations.accountPage.selectLeague}>{translations.accountPage.selectLeague}</option>
                                        {notJoinedLeagues.map(league => (
                                            <option key={league} value={league}>{league}</option>
                                        ))}
                                    </select>  

                                    {joinLeagueSuccess &&  
                                        <p 
                                            className="text-success font-italic mt-2"
                                            data-automation={'join-league-success'}
                                        >
                                            {translations.accountPage.success}
                                        </p>
                                    }

                                    {joinLeagueError &&  
                                        <p 
                                            className="text-danger font-italic mt-2"
                                            data-automation={'join-league-error'}
                                        >
                                            {translations.accountPage.joinLeagueError}
                                        </p>
                                    }

                                    <button 
                                        type="submit" 
                                        className="form-control mt-2 btn btn-primary"
                                        data-automation="join-submit-cta"
                                    >
                                        {translations.accountPage.submit}
                                    </ button>
                                </form>
                            </div>
                            <div className="tab-pane fade p-3" id="create-panel" role="tabpanel" aria-labelledby="create-tab">
                                <p className="lead">
                                    {translations.accountPage.createLeagueIntro}
                                </p>
                                <form onSubmit={createHandler}>
                                    {translations.accountPage.createLeagueLabel}{":"}
                                    <input
                                        type="text" 
                                        name="leagueName"
                                        onChange={leagueNameValidation}
                                        className="form-control my-2" 
                                        data-automation="league-name-input"
                                    >
                                    </input>

                                    {createLeagueSuccess &&  
                                        <p 
                                            className="text-success font-italic mt-2"
                                            data-automation='create-league-success'
                                        >
                                            {translations.accountPage.success}
                                        </p>
                                    }

                                    {leagueNameTaken &&  
                                        <p 
                                            className="text-danger font-italic mt-2"
                                            data-automation='league-name-taken'
                                        >
                                            {translations.accountPage.leagueNameTaken}
                                        </p>
                                    }

                                    <button 
                                        type="submit" 
                                        className="form-control mt-2 btn btn-primary" 
                                        disabled={leagueNameTaken}
                                        data-automation="create-submit-cta"
                                    >
                                        {translations.accountPage.submit}
                                    </ button>
                                </form>
                            </div>
                            <div className="tab-pane fade p-3" id="quit-panel" role="tabpanel" aria-labelledby="quit-tab">
                                <p className="lead">
                                    {translations.accountPage.quitLeagueIntro}
                                </p>

                                {myPrivateLeagues.length == 0 ?
                                    <div className="border text-center p-2" data-automation="quit-no-leagues">
                                        {translations.accountPage.noPrivateLeagues}
                                    </div>
                                    :
                                    <form onSubmit={quitHandler}>
                                        <select defaultValue="default" name="league-quit" className="mb-3">
                                            <option key="default" value={translations.accountPage.selectLeague}>{translations.accountPage.selectLeague}</option>
                                            {myPrivateLeagues.map(name => (
                                                <option key={name} value={name}>{name}</option>
                                            ))}
                                        </select>

                                        {quitLeagueSuccess &&  
                                            <p 
                                                className="text-success font-italic mt-2"
                                                data-automation={'quit-league-success'}
                                            >
                                                {translations.accountPage.success}
                                            </p>
                                        }

                                        {quitLeagueError &&  
                                            <p 
                                                className="text-danger font-italic mt-2"
                                                data-automation={'quit-league-error'}
                                            >
                                                {translations.accountPage.quitLeagueError}
                                            </p>
                                        }

                                        <button 
                                            type="submit" 
                                            className="form-control mt-2 btn btn-primary"
                                            data-automation="quit-submit-cta"
                                        >
                                            {translations.accountPage.submit}
                                        </ button>
                                    </form>
                                }
                            </div>


                        </div>      
                    </div>


                </div>
            </div>

        </div> 
    </div>
)

const mapStateToProps = (state, ownProps) => {
    let { 
        translations,
        privateLeagues,
        joinLeagueError,
        joinLeagueSuccess,
        createLeagueSuccess,
        leagueNameTaken,
        quitLeagueError,
        quitLeagueSuccess
    } = state
    let { myPrivateLeagues } = ownProps
    let notJoinedLeagues = privateLeagues && myPrivateLeagues ? privateLeagues.filter(league => !myPrivateLeagues.includes(league)) : []

    return { 
        translations,
        myPrivateLeagues,
        notJoinedLeagues,
        joinLeagueError,
        joinLeagueSuccess,
        createLeagueSuccess,
        leagueNameTaken,
        quitLeagueError,
        quitLeagueSuccess
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    let { predictionID, myPrivateLeagues } = ownProps

    let leagueJoining = (e) => e.target['league-join'].value
    let leagueName = (e) => e.target['leagueName'].value
    let leagueQuiting = (e) => e.target['league-quit'].value

    let privateLeagueIndex = (league) => myPrivateLeagues.indexOf(league)

    return {
        joinHandler(e) {
            e.preventDefault()
            dispatch(mutations.requestUpdatePredictionPrivateLeague('join', predictionID, leagueJoining(e)))
        },
        createHandler(e) {
            e.preventDefault()
            dispatch(mutations.createPrivateLeague(leagueName(e)))
        },
        quitHandler(e) {
            e.preventDefault()
            dispatch(mutations.requestUpdatePredictionPrivateLeague('quit', predictionID, leagueQuiting(e), privateLeagueIndex(leagueQuiting(e))))
        },
        leagueNameValidation(e) {
            dispatch(mutations.leagueNameValidation(e.target.value))
        }
    }
}
export const ConnectedPrivateLeagues = connect(mapStateToProps, mapDispatchToProps)(PrivateLeagues)