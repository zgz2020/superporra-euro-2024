import React from 'react'
import { connect } from 'react-redux'
import { ConnectedHeader } from '../components/Header'
import { ConnectedHomepageSponsor } from '../components/HomepageSponsor'
import { ConnectedRulesAll } from '../components/RulesAll'

const RulesPage = ({ translations }) => (
    <div className="mb-5">
        <ConnectedHeader title={translations.scoringRulesPage.title} />
        <ConnectedHomepageSponsor />
        <div className="my-5"></div>

        <ConnectedRulesAll />
    </div>
)

const mapStateToProps = (state) => {
    let { translations } = state

    return {
        translations
    }
}

export const ConnectedRulesPage = connect(mapStateToProps)(RulesPage)