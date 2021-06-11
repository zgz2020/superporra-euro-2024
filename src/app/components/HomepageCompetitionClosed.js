import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const HomepageCompetitionClosed = ({ translations }) => (
    <div className="card my-5" id="homepage-join">
        <div className="card-header bg-info text-white text-center">
            <h5 className="pt-2">
                {translations.homepage.competitionClosed.title}
            </h5>
        </div>
        <div className="card-body text-center">
            <div className="border py-3 mb-3">
                {translations.homepage.myAccount.description1}
                <Link 
                    to={"/account"}
                    data-automation="account-link"
                >
                    {translations.navigation.account}
                </Link>
                {translations.homepage.myAccount.description2}
            </div>
            <div className="border py-3">
                {translations.homepage.myAccount.description1}
                <Link 
                    to={"/participants"}
                    data-automation="account-link"
                >
                    {translations.navigation.participants}
                </Link>
                {translations.homepage.competitionClosed.description2}
            </div>
        </div>
    </div>
)


const mapStateToProps = (state) => {
    let { translations } = state

    return { translations }
}

export const ConnectedHomepageCompetitionClosed = connect(mapStateToProps)(HomepageCompetitionClosed)