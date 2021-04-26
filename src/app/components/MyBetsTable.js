import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { participantTotalPoints } from '../../utils/leaderboard'

const MyBetsTable = ( { 
    mongoDataLoading, 
    myBets,
    results, 
    translations 
} ) => (

    <div className="container">
        <div className="row justify-content-center">

            {mongoDataLoading ?
                "Loading..."
                :
                <table className="table table-bordered col-sm-7 col-md-7 col-lg-5 col-xl-4" data-automation="leaderboard">
                    <thead>
                        <tr>
                            <th>{translations.leaderboard.name}</th>
                            <th>{translations.leaderboard.score}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr data-automation="my-bets-row">
                            <td>
                                <Link to={`/participants/${myBets.id}`}>
                                    {myBets.username}
                                </Link>
                            </td>
                            <td className="text-center">
                                <Link to={`/participants/score/${myBets.id}`}>
                                    {participantTotalPoints(myBets, results)}
                                </ Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            }
        </div>
    </div>
)


const mapStateToProps = (state, ownProps) => {
    let { mongoDataLoading, results, translations } = state
    let { myBets } = ownProps

    return {
        mongoDataLoading,
        myBets,
        results,
        translations
    }
}

export const ConnectedMyBetsTable = connect(mapStateToProps)(MyBetsTable)