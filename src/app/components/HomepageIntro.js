import React from 'react'
import { connect } from 'react-redux'

const HomepageIntro = ({ translatedHomepageIntro }) => (
    <div className="card">
        <div className="card-header p-4">
            {translatedHomepageIntro.title}
        </div>
        <div className="card-body px-4 pt-4">
            {/* {translatedHomepageIntro.body.first} */}
            <div className="pb-4">
                {translatedHomepageIntro.body.first}
            </div>
            <div>
                {translatedHomepageIntro.body.second}
            </div>
        </div>
        {/* <div className="card-body px-4">
            {translatedHomepageIntro.body.second}
        </div> */}
    </div>
)

const mapStateToProps = (state) => {
    let { translations } = state
    let translatedHomepageIntro = translations.homepage.intro

    return { translatedHomepageIntro }
}

export const ConnectedHomepageIntro = connect(mapStateToProps)(HomepageIntro)
