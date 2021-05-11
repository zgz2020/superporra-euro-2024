import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const joinStep = (stepNumber, translations) => (
    <div className="card">
        <div className="card-header">
            {`${translations.body.step} ${stepNumber}`}
        </div>
        <div className="card-body lead">
            {stepNumber == "1" ? 
                <div>
                    {translations.body["1.1"]}
                    <Link 
                        to={"/join"}
                        data-automation="sign-up-link"
                    >
                        {translations.body["1.2"]}
                    </Link>
                </div>
                :
                translations.body[stepNumber]
            }
        </div>
    </div>
)

const HomepageJoin = ({ translatedHomepageJoin }) => (
    <div className="card my-5" id="homepage-join">
        <div className="card-header bg-info text-white text-center">
            <h5 className="pt-2">
                {translatedHomepageJoin.title}
            </h5>
        </div>
        <div className="card-body text-center">
            <div className="row justify-content-md-center">
                <div className="col-md-8 col-lg-7 col-xl-6">
                    {joinStep("1", translatedHomepageJoin)}
                    {joinStep("2", translatedHomepageJoin)}
                    {joinStep("3", translatedHomepageJoin)}
                </div>
            </div>
        </div>
    </div>
)


const mapStateToProps = (state) => {
    let { translations } = state
    let translatedHomepageJoin = translations.homepage.joinBanner

    return { translatedHomepageJoin }
}

export const ConnectedHomepageJoin = connect(mapStateToProps)(HomepageJoin)