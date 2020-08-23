import React from 'react'
import { connect } from 'react-redux'
import { getEuroWinnerPoints, getTeamGlobalGoalsPoints } from '../../utils/leaderboard'
import { capitaliseFirstLetter } from '../../utils/common'

const goalsTransKey = predictionName => predictionName === 'topScorer' ? 'goalsScored' : 'goalsConceded'


const GeneralPredictionScore = ( { title, predictionName, userPredictions, results, translations } ) => (
    <div className="card" data-automation="general-prediction">
        <div className="card-header">
            {title}
        </div>

        <div className="card-body">


            <div className="container">  
                <div className="row justify-content-center">  

                    <div className="text-center col-md-8 col-lg-7 col-xl-6">

                        <div className="card p-2">
                            
                            {predictionName === "winner" ? 
                                <strong>{userPredictions[predictionName]}</strong>
                                : 
                                (<div>
                                    <div>
                                        <strong>
                                            {userPredictions[predictionName] === '???' ? 
                                                '???'    
                                                : 
                                                userPredictions[predictionName].map((item, index) => 
                                                index === 0 ? item.team : `, ${item.team}`)}
                                        </strong>
                                    </div>
                                    <div>
                                        {translations.participantScores[goalsTransKey(predictionName)]}
                                        {': '}
                                        {userPredictions[predictionName][0].goals}
                                    </div>
                                </div>)
                            }
                            
                        </div>

                        <div className="card p-2">
                            {translations.participantScores.result}{': '}
                            {predictionName === "winner" ? 
                                    results.winner 
                                    : 
                                    (<div>
                                        <div>
                                            {results[predictionName] === '???' ? 
                                            '???' 
                                            :
                                            results[predictionName].map((item, index) => 
                                                index === 0 ? item.team : `, ${item.team}`)}
                                        </div>
                                        <div>
                                            {translations.participantScores[goalsTransKey(predictionName)]}
                                            {': '}
                                            {results[predictionName][0].goals}
                                        </div>
                                    </div>)
                                }
                        </div>

                        <div className="card p-2">
                            <strong>
                                {capitaliseFirstLetter(translations.participantScores.points)}{': '}
                                {predictionName === "winner" ? 
                                        getEuroWinnerPoints(userPredictions, results)
                                        : null}
                                {predictionName === "topScorer" || predictionName === "leastConceded" ? 
                                        getTeamGlobalGoalsPoints(userPredictions, results, predictionName)
                                        : null}
                            </ strong>
                        </div>

                    </div>

                </div>
            </div>
            
        </div>

    </div>
)

const mapStateToProps = (state, ownProps) => {
    const { title, predictionName, userPredictions, results, translations } = ownProps

    return {
        title,
        predictionName, // NOTE: 'predictionName' accepted values: "winner" / "topScorer" / "leastConceded" 
        userPredictions,
        results,
        translations
    }
}

export const ConnectedGeneralPredictionScore = connect(mapStateToProps)(GeneralPredictionScore)