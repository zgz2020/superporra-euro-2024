import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { participantTotalPoints } from '../../utils/leaderboard'

const ParticipantsList = ( { users, predictions } ) => (
    <div>
        <table className="table table-bordered" data-automation="leaderboard">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Puntuación</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(users.byId).map((key, index) => {
                    if (key !== "U1") {
                        return (
                            <tr key={index} data-automation="leaderboard-row">
                                <td>{index}</td>
                                <td>
                                    <Link to={`/participants/${key}`}>
                                        {users.byId[key].username}
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
)

const mapStateToProps = (state) => {
    let { users, predictions } = state
    return {
        users,
        predictions
    }
}

export const ConnectedParticipantsList = connect(mapStateToProps)(ParticipantsList)