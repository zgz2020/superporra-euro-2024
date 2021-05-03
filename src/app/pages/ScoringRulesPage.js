import React from 'react'
import { connect } from 'react-redux'
import { ConnectedHeader } from '../components/Header'
import { ConnectedScoringRuleCategory } from '../components/ScoringRuleCategory'
import { ConnectedHomepageSponsor } from '../components/HomepageSponsor'

const ScoringRulesPage = ({ translations }) => (
    <div>
        <ConnectedHeader title={translations.scoringRulesPage.title} />
        <ConnectedHomepageSponsor />
        <div className="my-5"></div>
        <ConnectedScoringRuleCategory ruleCategory="teamRules" />
        <ConnectedScoringRuleCategory ruleCategory="individualsRules" />
    </div>
)

const mapStateToProps = (state) => {
    let { translations } = state

    return {
        translations
    }
}

export const ConnectedScoringRulesPage = connect(mapStateToProps)(ScoringRulesPage)