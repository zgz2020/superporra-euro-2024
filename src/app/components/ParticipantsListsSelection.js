import React from 'react'
import { connect } from 'react-redux'
import * as mutations from '../store/mutations'
import { ConnectedParticipantsList } from './ParticipantsList'

/*
+++++++ TO DO ++++++++++
1. Create database entry: privateLeagues
    - This will be an array of strings. For example: ['Londoners', 'miEmpresa']
2. For now, populate manually in MongoAtlas.
    - TO DO -> Add 'Create Private League' CTA and functionality, maybe in 'My account' and 'Leaderboards'
3. Create 'privateLeague' variable; array of values extracted from database
4. Use 'privateLeague' variable to populate SELECT element.
5. Add 'onChange' attribute to SELECT element; onChange -> Display leaderboard of selected private league 
    -> Leaderboard will take SELECT value to populate private league leaderboard and leaderboard headeer
*/

const privateLeaguePredictions = (predictions, privateLeague) => Object.keys(predictions.byId).filter(prediction => 
    predictions.byId[prediction].privateLeague === privateLeague)
    .reduce((privateLeaguePredictionsList, privateLeague) => {
        privateLeaguePredictionsList[privateLeague] = predictions.byId[privateLeague]
        return privateLeaguePredictionsList
    }, {})

const ParticipantsListsSelection = ({ translations, privateLeagues, privateLeagueRankings, predictions, showPrivateLeagueRankings }) => (
    <div className="container mb-3 col-sm-7 col-md-7 col-lg-5 col-xl-4">
        <div className="row justify-content-center">

            <div className="card tab-card ">
                <div className="card-header tab-card-header">
                    <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="global-tab" data-toggle="tab" href="#global-panel" role="tab" aria-controls="Global-panel" aria-selected="true">
                            {translations.leaderboard.global}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="private-leagues-tab" data-toggle="tab" href="#private-leagues-panel" role="tab" aria-controls="Private-leagues-panel" aria-selected="false">
                            {translations.leaderboard.privateLeagues}
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active p-3" id="global-panel" role="tabpanel" aria-labelledby="global-tab">
                        <ConnectedParticipantsList />      
                    </div>
                    <div className="tab-pane fade p-3" id="private-leagues-panel" role="tabpanel" aria-labelledby="private-leagues-tab">
                        <select onChange={showPrivateLeagueRankings} value={privateLeagueRankings} className="mb-3">
                            <option key="default" value=" ">{"Select a private league"}</option>
                            {privateLeagues.map(league => (
                                <option key={league} value={league}>{league}</option>
                            ))}
                        </select>  

                        {privateLeagueRankings && privateLeagueRankings != " " && 
                            <ConnectedParticipantsList filteredPredictions={privateLeaguePredictions(predictions, privateLeagueRankings)} />
                        }    
                    </div>
                </div>      
            </div>
        </div>
    </div>
)

const mapStateToProps = (state) => {
    let { 
        translations,
        privateLeagues,
        privateLeagueRankings,
        predictions
    } = state
    return { 
        translations,
        privateLeagues,
        privateLeagueRankings,
        predictions
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showPrivateLeagueRankings(event) {
            dispatch(mutations.showPrivateLeagueRankings(event.target.value))
        }
    }
}

export const ConnectedParticipantsListsSelection = connect(mapStateToProps, mapDispatchToProps)(ParticipantsListsSelection)