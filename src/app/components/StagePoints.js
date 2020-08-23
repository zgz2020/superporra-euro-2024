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
import { ConnectedMatchPoints } from './MatchPoints'


const tableMatches = (userPredictions, stage, group) => 
    stage === "leagueMatches" ? groupMatches(group, userPredictions) : userPredictions[stage]

const stageQualifiedTeams = (translations, results, userPredictions, stage) => (
    <div className="card text-center mb-3 py-2">
        <strong>
            {`${translations.participantScores.qualifiedTeams}: ${stageQualifiedTeamsPoints(userPredictions, stage, results)} ${translations.participantScores.points}`}
        </strong>

        <div>
            {stage === "r16Matches" ? `${translations.participantScores.withBonus}: ` : null}
            {getStageQualifiedTeams(userPredictions, stage, results).length < 1 && stage !== "r16Matches" ? 
                <div className="pb-3"></div>
                :
                qualifiedTeamsShortNames(getStageQualifiedTeams(userPredictions, stage, results)).join(', ')
            }
        </div>

        {stage === "r16Matches" ?
            <div>
                {`${translations.participantScores.noBonus}: `}
                {qualifiedTeamsShortNames(getR16BonusQualifiedTeams(userPredictions, results)).join(', ')}
            </div>
            :
            null
        }

    </div>
)


const StagePoints = (ownProps) => (
    <div className="card" data-automation="stage-score">

        <div className="card-header">
            {matchStagesTitles(ownProps.translations)[ownProps.stage]}
        </div>

        <div className="card-body">
            {ownProps.stage === "leagueMatches" ?
                Object.keys(leagueGroups).map(group => (

                    <div className="container" key={group} >  
                        <div className="row no-gutters justify-content-center"> 
                            <div className="col-md-8 col-lg-7 col-xl-6 pb-3">
                                
                                <div className="mb-2">
                                    <strong>{`${ownProps.translations.predictionsForm.group} ${group}`}</strong>
                                </div>

                                {Object.keys(groupMatches(group, ownProps.userPredictions)).map(match => (
                                        <ConnectedMatchPoints key={match} {...ownProps} predictionType="existent" mode="show" matchID={match} />
                                ))}
                            </div>
                        </div>
                    </div>
                ))
                :
                <div className="container">  
                    <div className="row no-gutters justify-content-center"> 
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            {stageQualifiedTeams(ownProps.translations, ownProps.results, ownProps.userPredictions, ownProps.stage)}
                            {Object.keys(tableMatches(ownProps.userPredictions, ownProps.stage)).map(match => (
                                <ConnectedMatchPoints key={match} {...ownProps} predictionType="existent" mode="show" matchID={match}/>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>

    </div>
)

const mapStateToProps = (state, ownProps) => ownProps

export const ConnectedStagePoints = connect(mapStateToProps)(StagePoints)