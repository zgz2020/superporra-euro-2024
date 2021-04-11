import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { participantTotalPoints } from '../../utils/leaderboard'

const ParticipantsList = ( { 
    mongoDataLoading, 
    predictions, 
    filteredPredictions,
    results, 
    translations 
} ) => {

    const predictionsList = filteredPredictions ? filteredPredictions : predictions.byId

    return (

        <div className="container">
            <div className="row justify-content-center">

                {mongoDataLoading ?
                    "Loading..."
                    :
                    <table className="table table-bordered col-sm-7 col-md-7 col-lg-5 col-xl-4" data-automation="leaderboard">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>{translations.leaderboard.name}</th>
                                <th>{translations.leaderboard.score}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(predictionsList).map((key, index) => (
                                <tr key={index+1} data-automation="leaderboard-row">
                                    <td>{index+1}</td>
                                    <td>
                                        <Link to={`/participants/${key}`}>
                                            {predictionsList[key].username}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/participants/score/${key}`}>
                                            {participantTotalPoints(predictionsList[key], results)}
                                        </ Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    let { mongoDataLoading, predictions, results, translations } = state
    let { filteredPredictions } = ownProps

    return {
        mongoDataLoading,
        predictions,
        filteredPredictions,
        results,
        translations
    }
}

export const ConnectedParticipantsList = connect(mapStateToProps)(ParticipantsList)