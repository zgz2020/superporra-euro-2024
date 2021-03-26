import React from 'react'
import { connect } from 'react-redux'
import { ConnectedHeader } from '../Header'
import { ConnectedHomepageIntro } from '../HomepageIntro'

const HomePage = ({ translations }) => (
    <div>
        <ConnectedHeader title={translations.homepage.title} />

        <div className="container">
            <div className="row no-gutters justify-content-center">
                <div className="col-md-6 col-lg-5 col-xl-4 mt-3 text-center">
                    <img src="../../../../images/homepage_intro.png" class="img-thumbnail" alt="homepage intro image"></img>
                </div>

                <div className="col-md-6 col-lg-5 col-xl-4 mt-3">
                    <ConnectedHomepageIntro />
                </div>
            </div>

        </div>


        <div className="card mx-auto m-5" style={{width: "16rem"}}>
            <div className="card-header text-center">
                {translations.placeholders.underConstruction}
            </div>
        </div>
    </div>
)

const mapStateToProps = (state) => {
    let { translations } = state

    return { translations }
}

export const ConnectedHomePage = connect(mapStateToProps)(HomePage)