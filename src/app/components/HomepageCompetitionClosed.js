import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const HomepageCompetitionClosed = ({ translations, myAccountTranslations }) => (
    <div className="card my-5" id="homepage-join">
        <div className="card-header bg-info text-white text-center">
            <h5 className="pt-2">
                {/* {myAccountTranslations.title} */}
                The competition is now closed
            </h5>
        </div>
        <div className="card-body text-center">
            <div>
                {myAccountTranslations.description1}
                <Link 
                    to={"/account"}
                    data-automation="account-link"
                >
                    {translations.navigation.account}
                </Link>
                {myAccountTranslations.description2}
            </div>
            <div>
                {myAccountTranslations.description1}
                <Link 
                    to={"/account"}
                    data-automation="account-link"
                >
                    {translations.navigation.account}
                </Link>
                {myAccountTranslations.description2}
            </div>
            
        </div>
        <div className="card-body text-center">
            {myAccountTranslations.description1}
            <Link 
                to={"/account"}
                data-automation="account-link"
            >
                {translations.navigation.account}
            </Link>
            {myAccountTranslations.description2}
        </div>
    </div>
)


const mapStateToProps = (state) => {
    let { translations } = state
    let myAccountTranslations = translations.homepage.myAccount

    return { translations, myAccountTranslations }
}

export const ConnectedHomepageCompetitionClosed = connect(mapStateToProps)(HomepageCompetitionClosed)