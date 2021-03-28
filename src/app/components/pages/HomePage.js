import React from 'react'
import { connect } from 'react-redux'
import { ConnectedHeader } from '../Header'
import { ConnectedHomepageIntro } from '../HomepageIntro'
import { ConnectedHomepageJoin } from '../HomepageJoin'

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