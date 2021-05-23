import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const MyPrivateLeagues = ({ translations, myPrivateLeagues }) => (
    // myPrivateLeagues.length == 0 ?
    //     <div className="border p-3 mb-3 text-center" data-automation="no-private-leagues">
    //         {translations.accountPage.noPrivateLeagues}
    //     </div>
    //     :
    <table className="table table-bordered col-sm-7 col-md-7 col-lg-5 col-xl-4 mt-2 mb-4" data-automation="my-private-leagues">
        <thead>
            <tr>
                <th>{translations.accountPage.privateLeague}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <Link to={"/participants"} data-automation="participants-link">
                        {translations.leaderboard.global}
                    </Link> 
                </td>
            </tr>
            {myPrivateLeagues.map(league => (
                <tr key={league} data-automation="my-private-leagues-row">
                    <td>
                        <Link to={"/participants"} data-automation="participants-link">
                            {league}
                        </Link> 
                    </td>
                </tr>
            ))}
        </tbody>
    </table>                   
)

const mapStateToProps = (state, ownProps) => {
    let { translations } = state
    let { myPrivateLeagues } = ownProps

    return { 
        translations, 
        myPrivateLeagues 
    }
}

export const ConnectedMyPrivateLeagues = connect(mapStateToProps)(MyPrivateLeagues)