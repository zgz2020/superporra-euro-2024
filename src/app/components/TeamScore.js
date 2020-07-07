import React from 'react'
import { connect } from 'react-redux'
import { goalsMenuOptions } from '../../utils/predictions'

const TeamScore = ( { predictionType, userID, mode, matchType, matchID, team, changeHandler, userPrediction, newPrediction } ) => {

    let teamScorePrediction = predictionType === "new" ? newPrediction : userPrediction 

    return (
        <div className="d-flex flex-row p-0">

            <div className="p-1">
                {team === "home" ? `${teamScorePrediction[`${matchType}Matches`][matchID][`${team}Team`]} ` : null}
            </div>

            {mode === "show" ?
                <div className="p-1">
                    {teamScorePrediction[`${matchType}Matches`][matchID][`${team}Goals`]}
                </div>
                :
                <div className="p-1">
                    <select onChange={e => changeHandler(predictionType, userID, matchID, `${team}Goals`, e)} value={teamScorePrediction[`${matchType}Matches`][matchID][`${team}Goals`]} >
                        <option key="default" value=" ">{" "}</option>
                        {goalsMenuOptions()}
                    </select>
                </div>
            }

            <div className="p-1">
                            {team === "away" ? ` ${teamScorePrediction[`${matchType}Matches`][matchID][`${team}Team`]}` : null}

            </div>

        </div> 
)}

const mapStateToProps = (state, ownProps) => {
    const { newPrediction } = state
    const { predictionType, mode, userID, matchType, matchID, team, changeHandler } = ownProps
    const userPrediction = state.predictions.byId[userID]
    return {
        predictionType,
        userID,
        mode,
        matchType,
        matchID,
        team,
        changeHandler,
        userPrediction,
        newPrediction
    }
}

export const ConnectedTeamScore = connect(mapStateToProps)(TeamScore)