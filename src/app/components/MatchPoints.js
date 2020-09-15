import React from 'react'
import { connect } from 'react-redux'
import { ConnectedEuroMatch } from './EuroMatch'
import { 
    getMatchTeamGoalsPoints,
    getLeagueMatchWinnerPoints,
    getMatchGoalsBonusPoints,
    getLeagueMatchPoints,
    getKnockOutMatchPoints
} from '../../utils/leaderboard'
import { capitaliseFirstLetter } from '../../utils/common'

const collapseID = ownProps => `${ownProps.matchType}-${ownProps.matchID}`

const MatchPoints = (ownProps) => (
    <div className="text-center mb-2">

        <div className="card py-1">
            <div className="ml-1">
                <strong><ConnectedEuroMatch { ...ownProps } /></strong>
            </div>
        </div>

        <div className="container">

            <div className="row">
                <div className="col card py-1">
                    {`${ownProps.translations.participantScores.result}: ${ownProps.results[`${ownProps.matchType}Matches`][ownProps.matchID].homeGoals} - ${ownProps.results[`${ownProps.matchType}Matches`][ownProps.matchID].awayGoals}`}
                </div>

                <a className="col card py-1" data-toggle="collapse" href={`#${collapseID(ownProps)}`} role="button" aria-expanded="false" aria-controls={collapseID(ownProps)}>
                    {`${capitaliseFirstLetter(ownProps.translations.participantScores.points)}: 
                        ${ownProps.matchType === "league" ?
                            getLeagueMatchPoints(ownProps.userPredictions[`${ownProps.matchType}Matches`][ownProps.matchID], ownProps.results)
                            :
                            getKnockOutMatchPoints(`${ownProps.matchType}Matches`, ownProps.userPredictions[`${ownProps.matchType}Matches`][ownProps.matchID], ownProps.results)
                        }
                    `}
                </a>

            </div>

            <div className="collapse" id={collapseID(ownProps)}>
                
                <table className="table table-bordered table-sm text-center">
                    <thead>
                        <tr>
                            <th>{ownProps.translations.participantScores.homeGoalsShort}</th>
                            <th>{ownProps.translations.participantScores.awayGoalsShort}</th>
                            <th>{ownProps.matchType === "league" ? `${ownProps.translations.participantScores.matchWinnerShort}` : `${ownProps.translations.participantScores.goalsBonus}`}</th>
                            <th>{ownProps.translations.participantScores.total}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{getMatchTeamGoalsPoints(`${ownProps.matchType}Matches`, ownProps.userPredictions[`${ownProps.matchType}Matches`][ownProps.matchID], "home", ownProps.results)}</td>
                            <td>{getMatchTeamGoalsPoints(`${ownProps.matchType}Matches`, ownProps.userPredictions[`${ownProps.matchType}Matches`][ownProps.matchID], "away", ownProps.results)}</td>
                            <td>
                                {ownProps.matchType === "league" ? 
                                    getLeagueMatchWinnerPoints(ownProps.userPredictions[`${ownProps.matchType}Matches`][ownProps.matchID], ownProps.results)
                                    : 
                                    getMatchGoalsBonusPoints(`${ownProps.matchType}Matches`, ownProps.userPredictions[`${ownProps.matchType}Matches`][ownProps.matchID], ownProps.results)
                                }
                            </td>
                            <th>
                                {ownProps.matchType === "league" ?
                                    getLeagueMatchPoints(ownProps.userPredictions[`${ownProps.matchType}Matches`][ownProps.matchID], ownProps.results)
                                    :
                                    getKnockOutMatchPoints(`${ownProps.matchType}Matches`, ownProps.userPredictions[`${ownProps.matchType}Matches`][ownProps.matchID], ownProps.results)
                                }
                            </th>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>

    </div>
)

const mapStateToProps = (state, ownProps) => ownProps

export const ConnectedMatchPoints = connect(mapStateToProps)(MatchPoints)