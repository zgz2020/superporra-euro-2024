import React from 'react'
import { connect } from 'react-redux'
import { getLeagueGroupTable } from '../../utils/predictions'
import { countryShortNames } from '../../utils/config'

const groupTable = ( { group, prediction } ) => (
    <div>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>EQUIPO</th>
                    <th>PT</th>
                    <th>PJ</th>
                    <th>GF</th>
                    <th>GC</th>
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
    const { group, prediction } = ownProps
    return {
        group,
        prediction
    }
}

export const ConnectedGroupTable = connect(stateMapToProps)(groupTable)