import React from 'react'
import { connect } from 'react-redux'

const privateLeagueStep = (stepNumber, translations) => (
    <div className="card">
        <div className="card-header">
            {`${translations.body.step} ${stepNumber}`}
        </div>
        <div className="card-body lead">
            {stepNumber == "1" ? 
                <a 
                    href="#homepage-join"
                    data-automation="homepage-join-link"
                >
                    {translations.body[stepNumber]}
                </a>
                :
                translations.body[stepNumber]
            }
        </div>
    </div>
)

const HomepagePrivateLeagues = ({ translatedHomepagePrivateLeagues }) => (
    <div className="card my-5">
        <div className="card-header bg-warning text-dark text-center">
            <h5 className="pt-2">
                {translatedHomepagePrivateLeagues.title}
            </h5>
        </div>
        <div className="card-body text-center">
            <div className="row justify-content-md-center">
                <div className="col-md-8 col-lg-7 col-xl-6">
                    {privateLeagueStep("1", translatedHomepagePrivateLeagues)}
                    {privateLeagueStep("2", translatedHomepagePrivateLeagues)}
                    {privateLeagueStep("3", translatedHomepagePrivateLeagues)}
                </div>
            </div>
        </div>
    </div>
)


const mapStateToProps = (state) => {
    let { translations } = state
    let translatedHomepagePrivateLeagues = translations.homepage.privateLeagues

    return { translatedHomepagePrivateLeagues }
}

export const ConnectedHomepagePrivateLeagues = connect(mapStateToProps)(HomepagePrivateLeagues)