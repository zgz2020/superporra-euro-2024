import React from 'react'
import { connect } from 'react-redux'
import { getLeagueGroupTable } from '../../utils/predictions'
import { countryShortNames } from '../../utils/config'

const groupTable = ( { group, prediction, translations } ) => (
    <div>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>{translations.predictionsForm.team}</th>
                    <th>{translations.predictionsForm.pointsShort}</th>
                    <th>{translations.predictionsForm.matchesPlayedShort}</th>
                    <th>{translations.predictionsForm.goalsScoredShort}</th>
                    <th>{translations.predictionsForm.goalsConcededShort}</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(getLeagueGroupTable(prediction, group)).map(team => (
                    <tr key={team}>
                        <td>{countryShortNames[getLeagueGroupTable(prediction, group)[team].name]}</td>
                        <td>{getLeagueGroupTable(prediction, group)[team].points}</td>
                        <td>{getLeagueGroupTable(prediction, group)[team].gamesPlayed}</td>
                        <td>{getLeagueGroupTable(prediction, group)[team].goalsScored}</td>
                        <td>{getLeagueGroupTable(prediction, group)[team].goalsConceded}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)

const stateMapToProps = (state, ownProps) => {
    let { translations } = state
    let { group, prediction } = ownProps
    return {
        group,
        prediction,
        translations
    }
}

export const ConnectedGroupTable = connect(stateMapToProps)(groupTable)