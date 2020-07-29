import React from 'react'
import { connect } from 'react-redux'
import { ConnectedScoringRule } from './ScoringRule'

const ScoringRuleCategory = ({ ruleCategory }) => (
    <div key={ruleCategory} data-automation="scoring-rule-container" className="card mx-auto" >
        <div className="card-header">
            {ruleCategory.title}
        </div>
        <div className="card-body">
            {Object.keys(ruleCategory.rules).map(rule => (
                <div key={rule}>
                    <ConnectedScoringRule rule={ruleCategory.rules[rule]} ruleIndex={rule} />
                </div>
            ))}
        </div>
    </div>
)

const mapStateToProps = (state, ownProps) => {
    let { ruleCategory } = ownProps
    return { ruleCategory }
}

export const ConnectedScoringRuleCategory = connect(mapStateToProps)(ScoringRuleCategory)