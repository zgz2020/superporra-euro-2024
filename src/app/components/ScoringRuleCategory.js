import React from 'react'
import { connect } from 'react-redux'
import { ConnectedScoringRule } from './ScoringRule'

const ScoringRuleCategory = ({ translatedRuleCategory }) => (
    <div key={translatedRuleCategory} data-automation="scoring-rule-container" className="card mx-auto" >
        <div className="card-header">
            {translatedRuleCategory.title}
        </div>
        <div className="card-body">
            {Object.keys(translatedRuleCategory.rules).map(rule => (
                <div key={rule}>
                    <ConnectedScoringRule rule={translatedRuleCategory.rules[rule]} ruleIndex={rule} />
                </div>
            ))}
        </div>
    </div>
)

const mapStateToProps = (state, ownProps) => {
    let { translations } = state
    let { ruleCategory } = ownProps
    let translatedRuleCategory = translations[ruleCategory]

    return { translatedRuleCategory }
}

export const ConnectedScoringRuleCategory = connect(mapStateToProps)(ScoringRuleCategory)