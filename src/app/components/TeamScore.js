import React from 'react'
import { connect } from 'react-redux'
import { goalsMenuOptions } from '../../utils/predictions'

const editFontSize = (mode) => mode === "show" ? {fontSize: "1rem"} : {fontSize: "0.9rem"}

const TeamScore = ( { 
    predictionsOrResults, 
    predictionType, 
    predictionID, 
    mode, 
    matchType, 
    matchID, 
    team, 
    changeHandler 
} ) => (
    <div className="d-flex flex-row p-0">
        {team === "home" ? 
            <div className="p-1" data-automation="score-team" style={ editFontSize(mode)}>
                {predictionsOrResults[`${matchType}Matches`][matchID][`${team}Team`]}
            </div>
            :
            null
        }

        <div className="p-1" data-automation="score-goals">
            {mode === "show" ?
                <div>
                    {predictionsOrResults[`${matchType}Matches`][matchID][`${team}Goals`]}
                </div>
                :
                <select onChange={e => changeHandler(predictionType, predictionID, matchID, `${team}Goals`, e)} value={predictionsOrResults[`${matchType}Matches`][matchID][`${team}Goals`]} style={ editFontSize(mode)} >
                    <option key="default" value=" ">{" "}</option>
                    {goalsMenuOptions()}
                </select>
            
            }
        </div>

        {team === "away" ? 
            <div className="p-1" data-automation="score-team" style={ editFontSize(mode)}>
                {predictionsOrResults[`${matchType}Matches`][matchID][`${team}Team`]}
            </div>
            : 
            null
        }
    </div> 
)

const mapStateToProps = (state, ownProps) => {
    const { predictionType, mode, predictionID, matchType, matchID, team, changeHandler, predictionsOrResults } = ownProps

    return {
        predictionType,
        predictionID,
        mode,
        matchType,
        matchID,
        team,
        changeHandler,
        predictionsOrResults
    }
}

export const ConnectedTeamScore = connect(mapStateToProps)(TeamScore)