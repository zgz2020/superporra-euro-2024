import React from 'react'
import { connect } from 'react-redux'
import { ConnectedHeader } from '../Header'
import { ConnectedScoringRuleCategory } from '../ScoringRuleCategory'

const ScoringRulesPage = ({ translations }) => (
    <div>
        <ConnectedHeader title={translations.scoringRulesPage.title} />
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