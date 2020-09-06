import React from 'react'
import { connect } from 'react-redux'
import { ConnectedHeader } from '../Header'

const HomePage = ({ translations }) => (
    <div>
        <ConnectedHeader title={translations.homepage.title} />

        <div className="card mx-auto" style={{width: "16rem"}}>
            <div className="card-header text-center">
                {translations.placeholders.underConstruction}
            </div>
        </div>
    </div>
)

const mapStateToProps = (state) => {
    console.log('Homepage - STATE: ', state)
    let { translations } = state

    return { translations }
}

export const ConnectedHomePage = connect(mapStateToProps)(HomePage)