import React from 'react'
import { connect } from 'react-redux'
import * as mutations from '../store/mutations'
import { goalsMenuOptions } from '../../utils/predictions'

const editFontSize = (mode) => mode === "show" ? {fontSize: "1rem"} : {fontSize: "0.9rem"}

const TeamScore = ( { 
    predictionsOrResults, 
    predictionType, 
    predictionID, 
    mode, 
    stage, 
    matchID, 
    team, 
    // changeHandler,
    setGoalsHandler
} ) => (
    <div className="d-flex flex-row p-0">
        {team === "home" ? 
            <div className="p-1" data-automation="score-team" style={ editFontSize(mode)}>
                {predictionsOrResults[stage][matchID][`${team}Team`]}
            </div>
            :
            null
        }

        <div className="p-1" data-automation="score-goals">
            {mode === "show" ?
                <div>
                    {predictionsOrResults[stage][matchID][`${team}Goals`]}
                </div>
                :
                // <select onChange={e => changeHandler(predictionType, predictionID, matchID, `${team}Goals`, e)} value={predictionsOrResults[stage][matchID][`${team}Goals`]} style={ editFontSize(mode)} >
                //     <option key="default" value=" ">{" "}</option>
                //     {goalsMenuOptions()}
                // </select>
                <select onChange={e => setGoalsHandler(predictionType, predictionID, matchID, `${team}Goals`, e)} value={predictionsOrResults[stage][matchID][`${team}Goals`]} style={ editFontSize(mode)} >
                    <option key="default" value=" ">{" "}</option>
                    {goalsMenuOptions()}
                </select>
            
            }
        </div>

        {team === "away" ? 
            <div className="p-1" data-automation="score-team" style={ editFontSize(mode)}>
                {predictionsOrResults[stage][matchID][`${team}Team`]}
            </div>
            : 
            null
        }
    </div> 
)

const mapStateToProps = (state, ownProps) => {
    const { predictionType, mode, predictionID, stage, matchID, team, predictionsOrResults } = ownProps  // changeHandler

    return {
        predictionType,
        predictionID,
        mode,
        stage,
        matchID,
        team,
        // changeHandler,
        predictionsOrResults
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { stage } = ownProps

    return {
        setGoalsHandler(predictionType, predictionID, matchKey, team, event){

            return dispatch(mutations.setGoalsAll(predictionType, predictionID, stage, matchKey, team, event.target.value))


            // if (predictionType === 'new') 
            //     // return dispatch(mutations.setGoalsNewPredictionLeague(matchKey, team, event.target.value))
            //     return dispatch(mutations.setGoalsAll('new', stage, matchKey, team, event.target.value))
            // if (predictionType === 'existent' || 'results') 
            //     return dispatch(mutations.setGoalsLeague(predictionID, matchKey, team, event.target.value))
        }
    }
}

export const ConnectedTeamScore = connect(mapStateToProps, mapDispatchToProps)(TeamScore)