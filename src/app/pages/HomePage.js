import React from 'react'
import { connect } from 'react-redux'
import { ConnectedHeader } from '../components/Header'
import { ConnectedHomepageIntro } from '../components/HomepageIntro'
import { ConnectedHomepageJoin } from '../components/HomepageJoin'

const HomePage = ({ translations }) => (
    <div>
        <ConnectedHeader title={translations.homepage.title} />

        <ConnectedHomepageJoin />

        {/* <ConnectedHomepageIntro /> */}
    </div>
)

const mapStateToProps = (state) => {
    let { translations } = state

    return { translations }
}

export const ConnectedHomePage = connect(mapStateToProps)(HomePage)