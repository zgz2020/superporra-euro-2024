import React from 'react'
import { connect } from 'react-redux'
import { goalsMenuOptions } from '../../utils/predictions'

const editFontSize = (mode) => mode === "show" ? {fontSize: "1rem"} : {fontSize: "0.9rem"}

const TeamScore = ( { predictionsOrResults, predictionType, userID, mode, matchType, matchID, team, changeHandler } ) => {

   // let teamScoreData = predictionType === "new" ? newPrediction : userPredictions 

    // let teamScoreData = {}
    // switch(predictionType) {
    //     case "new":   
    //         teamScoreData = newPrediction
    //     case "existent":   
    //         teamScoreData = userPredictions
    //     case "results":   
    //         teamScoreData = results
    // }
    // let teamScoreData = predictionType => {
    //     switch(predictionType) {
    //         case "new":
    //             return newPrediction
    //         case "existent":
    //             return userPredictions
    //         case "results":
    //             return results
    //     }
    // }
        

    return (
        <div className="d-flex flex-row p-0">
            {team === "home" ? 
                <div className="p-1" data-automation="score-team" style={ editFontSize(mode)}>
                    {/* {teamScoreData[`${matchType}Matches`][matchID][`${team}Team`]} */}
                    {predictionsOrResults[`${matchType}Matches`][matchID][`${team}Team`]}
                </div>
                :
                null
            }

            <div className="p-1" data-automation="score-goals">
                {mode === "show" ?
                    <div>
                        {/* {teamScoreData[`${matchType}Matches`][matchID][`${team}Goals`]} */}
                        {predictionsOrResults[`${matchType}Matches`][matchID][`${team}Goals`]}
                    </div>
                    :
                    // <select onChange={e => changeHandler(predictionType, userID, matchID, `${team}Goals`, e)} value={teamScoreData[`${matchType}Matches`][matchID][`${team}Goals`]} style={ editFontSize(mode)} >
                    <select onChange={e => changeHandler(predictionType, userID, matchID, `${team}Goals`, e)} value={predictionsOrResults[`${matchType}Matches`][matchID][`${team}Goals`]} style={ editFontSize(mode)} >
                        <option key="default" value=" ">{" "}</option>
                        {goalsMenuOptions()}
                    </select>
                
                }
            </div>

            {team === "away" ? 
                <div className="p-1" data-automation="score-team" style={ editFontSize(mode)}>
                    {/* {teamScoreData[`${matchType}Matches`][matchID][`${team}Team`]} */}
                    {predictionsOrResults[`${matchType}Matches`][matchID][`${team}Team`]}
                </div>
                : 
                null
            }
        </div> 
)}

const mapStateToProps = (state, ownProps) => {
    // const { newPrediction, results } = state
    const { predictionType, mode, userID, matchType, matchID, team, changeHandler, predictionsOrResults } = ownProps
    //const userPredictions = state.predictions.byId[userID]

    return {
        predictionType,
        userID,
        mode,
        matchType,
        matchID,
        team,
        changeHandler,
        // userPredictions,
        // newPrediction,
        // results,
        predictionsOrResults
    }
}

export const ConnectedTeamScore = connect(mapStateToProps)(TeamScore)