import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { participantTotalPoints } from '../../utils/leaderboard'

const ParticipantsList = ( { predictions, translations } ) => (
    <div className="container">
        <div className="row justify-content-center">
            <table className="table table-bordered col-sm-7 col-md-7 col-lg-5 col-xl-4" data-automation="leaderboard">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>{translations.leaderboard.name}</th>
                        <th>{translations.leaderboard.score}</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(predictions.byId).map((key, index) => {
                        if (key !== "U1") {
                            return (
                                <tr key={index} data-automation="leaderboard-row">
                                    <td>{index}</td>
                                    <td>
                                        <Link to={`/participants/${key}`}>
                                            {predictions.byId[key].username}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/participants/score/${key}`}>
                                            {participantTotalPoints(predictions.byId[key], predictions.byId["U1"])}
                                        </ Link>
                                    </td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>
        </div>
    </div>
)

const mapStateToProps = (state) => {
    let { predictions, translations } = state
    return {
        predictions,
        translations
    }
}

export const ConnectedParticipantsList = connect(mapStateToProps)(ParticipantsList)