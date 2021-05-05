import React from 'react'
import { connect } from 'react-redux'
import { ConnectedHeader } from '../components/Header'
import { ConnectedHomepageSponsor } from '../components/HomepageSponsor'
import { ConnectedPrize } from '../components/Prize'

const PrizesPage = ({ translations }) => (
    <div className="mb-5">
        <ConnectedHeader title={translations.prizesPage.title} />
        <ConnectedHomepageSponsor />
        <div className="my-5"></div>
        <ConnectedPrize prizeType="winner" />
        <ConnectedPrize prizeType="consolation" />
    </div>
)

const mapStateToProps = (state) => {
    let { translations } = state

    return { translations }
}

export const ConnectedPrizesPage = connect(mapStateToProps)(PrizesPage)