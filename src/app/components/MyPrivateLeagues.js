import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const MyPrivateLeagues = ({ translations, myPredictions }) => (
    <table className="table table-bordered col-sm-7 col-md-7 col-lg-5 col-xl-4 mt-3" data-automation="my-private-leagues">
        <thead>
            <tr>
                <th>{translations.accountPage.privateLeague}</th>
                <th>{translations.accountPage.username}</th>
            </tr>
        </thead>
        <tbody>
            {Object.keys(myPredictions).map((key, index) => (
                <tr key={index+1} data-automation="my-private-leagues-row">
                    <td>
                        {myPredictions[key].privateLeague  && myPredictions[key].privateLeague != "--" ? 
                            <Link to={"/participants"} data-automation="participants-link">
                                {myPredictions[key].privateLeague}
                            </Link> 
                            : 
                            "--"
                        }
                    </td>
                    <td>
                        {myPredictions[key].username}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>                      
)

const mapStateToProps = (state, ownProps) => {
    let { translations } = state
    let { myPredictions } = ownProps

    return { translations, myPredictions }
}

export const ConnectedMyPrivateLeagues = connect(mapStateToProps)(MyPrivateLeagues)