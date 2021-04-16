import React from 'react'
import { connect } from 'react-redux'
import * as mutations from '../store/mutations'
import { ConnectedMyPrivateLeagues } from './MyPrivateLeagues'

const PrivateLeagues = ({ 
    translations,
    myPredictions,
    privateLeagues,
    myPredictionsNames,
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
            {translations.leaderboard.privateLeagues}
        </div>
        <div className="card-body">
            <div className="container col-sm-7 col-md-7 col-lg-5 col-xl-4 mt-3">
                <div className="row justify-content-center">
                    <div className="text-center lead mb-2">
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
                                <p className="lead">
                                    {translations.accountPage.joinLeagueIntro}
                                </p>
                                <p className="text-muted">
                                    {translations.accountPage.joinLeagueCreate}
                                </p>
                                <form onSubmit={joinHandler} className="mt-2">
                                    <select 
                                        defaultValue="default"
                                        name="name"
                                        className="my-3"
                                        data-automation="prediction-name-select"
                                    >
                                        <option key="default" value={translations.accountPage.selectName}>{translations.accountPage.selectName}</option>
                                        {myPredictionsNames.map(name => (
                                            <option key={name} value={name}>{name}</option>
                                        ))}
                                    </select>  
                                    <br />
                                    <select 
                                        defaultValue="default"
                                        name="league"
                                        className="mb-3"
                                        data-automation="league-name-select"
                                    >
                                        <option key="default" value={translations.accountPage.selectLeague}>{translations.accountPage.selectLeague}</option>
                                        {privateLeagues.map(league => (
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
                                <form onSubmit={quitHandler}>
                                    <select defaultValue="default" name="name-quit" className="mb-3">
                                        <option key="default" value={translations.accountPage.selectName}>{translations.accountPage.selectName}</option>
                                        {myPredictionsNames.map(name => (
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
    let { myPredictions } = ownProps
    let myPredictionsNames = Object.keys(myPredictions).map(prediction => myPredictions[prediction].username)

    return { 
        translations,
        myPredictions,
        privateLeagues,
        myPredictionsNames,
        joinLeagueError,
        joinLeagueSuccess,
        createLeagueSuccess,
        leagueNameTaken,
        quitLeagueError,
        quitLeagueSuccess
    }
}

const mapDispatchToProps = (dispatch) => {
    let name = (e) => e.target['name'].value
    let league = (e) => e.target['league'].value
    let leagueName = (e) => e.target['leagueName'].value
    let nameQuit = (e) => e.target['name-quit'].value

    return {
        joinHandler(e) {
            e.preventDefault()
            dispatch(mutations.requestUpdatePredictionPrivateLeague(name(e), league(e)))
        },
        createHandler(e) {
            e.preventDefault()
            dispatch(mutations.createPrivateLeague(leagueName(e)))
        },
        quitHandler(e) {
            e.preventDefault()
            dispatch(mutations.requestUpdatePredictionPrivateLeague(nameQuit(e), "--"))
        },
        leagueNameValidation(e) {
            dispatch(mutations.leagueNameValidation(e.target.value))
        }
    }
}
export const ConnectedPrivateLeagues = connect(mapStateToProps, mapDispatchToProps)(PrivateLeagues)