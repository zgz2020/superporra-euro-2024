import React from 'react'
import { connect } from 'react-redux'
import { 
    matchStagesTitles,
    groupMatches,
    leagueGroups
} from '../../utils/config'
import { 
    getMatchTeamGoalsPoints,
    getLeagueMatchWinnerPoints,
    getLeagueMatchPoints,
    getMatchGoalsBonusPoints,
    getKnockOutMatchPoints,
    getGroupMatchPoints,
    getStageMatchPoints,
    stageQualifiedTeamsPoints,
    getR16BonusQualifiedTeams,
    getStageQualifiedTeams,
    qualifiedTeamsShortNames
} from '../../utils/leaderboard'

const tableMatches = (userPredictions, stage, group) => 
    stage === "leagueMatches" ? groupMatches(group, userPredictions) : userPredictions[stage]

const matchesTableScore = (translations, results, userPredictions, stage, group) => (
    <div key={stage === "leagueMatches" ? group : stage} className="pt-1">
        <table className="table table-bordered table-sm text-center">
            <thead>
                <tr>
                    <th>{stage === "leagueMatches" ? `${translations.participantScores.groupShort} ${group}` : ""}</th>
                    <th>{translations.participantScores.homeGoalsShort}</th>
                    <th>{translations.participantScores.awayGoalsShort}</th>
                    <th>{stage === "leagueMatches" ? `${translations.participantScores.matchWinnerShort}` : `${translations.participantScores.goalsBonus}`}</th>
                    <th>{translations.participantScores.total}</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(tableMatches(userPredictions, stage, group)).map((match, index) => (
                    <tr key={index}>
                        <th>{`${translations.participantScores.matchShort}${index+1}`}</th>
                        <td>{getMatchTeamGoalsPoints(stage, userPredictions[stage][match], "home", results)}</td>
                        <td>{getMatchTeamGoalsPoints(stage, userPredictions[stage][match], "away", results)}</td>
                        <td>
                            {stage === "leagueMatches" ? 
                                getLeagueMatchWinnerPoints(userPredictions[stage][match], results)
                                : 
                                getMatchGoalsBonusPoints(stage, userPredictions[stage][match], results)
                            }
                        </td>
                        <th>
                            { stage === "leagueMatches" ?
                                getLeagueMatchPoints(userPredictions[stage][match], results)
                                :
                                getKnockOutMatchPoints(stage, userPredictions[stage][match], results)
                            }
                        </th>
                    </tr>
                ))}
                {stage === "leagueMatches" || stage === "r16Matches" ?
                    <tr>
                        <th colSpan="4">
                            { stage === "leagueMatches" ? `${translations.participantScores.groupTotal} ${group}` : `${translations.participantScores.total}`}
                        </th>
                        <th colSpan="2">
                            { stage === "leagueMatches" ?
                                getGroupMatchPoints(group, userPredictions, results)
                                :
                                getStageMatchPoints(userPredictions, stage, results)
                            }
                        </th>
                    </tr>
                    :
                    null
                }  
                                       
            </tbody>
        </table>
    </div>
)

const stageQualifiedTeams = (translations, results, userPredictions, stage) => (
    <div>
        <strong>
            {`${translations.participantScores.qualifiedTeams}: ${stageQualifiedTeamsPoints(userPredictions, stage, results)} ${translations.participantScores.points}`}
        </strong>

        <div>
            <small>
                {stage === "r16Matches" ? `${translations.participantScores.withBonus}: ` : null}
                {getStageQualifiedTeams(userPredictions, stage, results).length < 1 && stage !== "r16Matches" ? 
                    <div className="pb-3"></div>
                    :
                    qualifiedTeamsShortNames(getStageQualifiedTeams(userPredictions, stage, results)).join(', ')
                }
            </small>
        </div>

        {stage === "r16Matches" ?
            <div className="pb-5">
                <small>
                    {`${translations.participantScores.noBonus}: `}
                    {qualifiedTeamsShortNames(getR16BonusQualifiedTeams(userPredictions, results)).join(', ')}
                </small>
            </div>
            :
            null
        }

    </div>
)


const StageScore = ({ stage, userPredictions, results, translations }) => (
    <div>
        <div className="card" data-automation="stage-score">

            <div className="card-header">
                {matchStagesTitles(translations)[stage]}
            </div>

            <div className="card-body">

                {stage === "leagueMatches" ?
                    Object.keys(leagueGroups).map(group => (
                        <div key={group} className="pb-5">
                            {matchesTableScore(translations, results, userPredictions, stage, group)}
                            <div className="pb-5"></div>
                            <div className="pb-5"></div>
                            <div className="pb-5"></div>
                            <div className="pb-4"></div>
                            <div className="pb-2"></div>
                            <div className="pb-1"></div>
                        </div>
                    ))
                    :
                    <div>
                        {matchesTableScore(translations, results, userPredictions, stage)}
                        {stageQualifiedTeams(translations, results, userPredictions, stage)}
                    </div>
                }

            </div>

        </div>
    </div>
)

const mapStateToProps = (state, ownProps) => {
    let { translations } = state
    let { stage, userPredictions, results } = ownProps

    return {
        translations,
        stage,
        userPredictions,
        results
    }
}

export const ConnectedStageScore = connect(mapStateToProps)(StageScore)