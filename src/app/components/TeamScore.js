import React from 'react'
import { connect } from 'react-redux'
import { goalsMenuOptions } from '../../utils/predictions'

const editFontSize = (mode) => mode === "show" ? {fontSize: "1rem"} : {fontSize: "0.9rem"}

const TeamScore = ( { predictionType, userID, mode, matchType, matchID, team, changeHandler, userPredictions, newPrediction } ) => {

    let teamScorePrediction = predictionType === "new" ? newPrediction : userPredictions 

    return (
        <div className="d-flex flex-row p-0">
            {team === "home" ? 
                <div className="p-1" data-automation="score-team" style={ editFontSize(mode)}>
                    {teamScorePrediction[`${matchType}Matches`][matchID][`${team}Team`]}
                </div>
                :
                null
            }

            <div className="p-1" data-automation="score-goals">
                {mode === "show" ?
                    <div>
                        {teamScorePrediction[`${matchType}Matches`][matchID][`${team}Goals`]}
                    </div>
                    :
                    <select onChange={e => changeHandler(predictionType, userID, matchID, `${team}Goals`, e)} value={teamScorePrediction[`${matchType}Matches`][matchID][`${team}Goals`]} style={ editFontSize(mode)} >
                        <option key="default" value=" ">{" "}</option>
                        {goalsMenuOptions()}
                    </select>
                
                }
            </div>

            {team === "away" ? 
                <div className="p-1" data-automation="score-team" style={ editFontSize(mode)}>
                    {teamScorePrediction[`${matchType}Matches`][matchID][`${team}Team`]}
                </div>
                : 
                null
            }
        </div> 
)}

const mapStateToProps = (state, ownProps) => {
    const { newPrediction } = state
    const { predictionType, mode, userID, matchType, matchID, team, changeHandler } = ownProps
    const userPredictions = state.predictions.byId[userID]
    return {
        predictionType,
        userID,
        mode,
        matchType,
        matchID,
        team,
        changeHandler,
        userPredictions,
        newPrediction
    }
}

export const ConnectedTeamScore = connect(mapStateToProps)(TeamScore)