import React from 'react'
import { connect } from 'react-redux'
import { ConnectedRulesScoringItem } from './RulesScoringItem'

const RulesScoringCategory = ({ translations }) => ( 
    <div id="accordion-scoring-rules" className="mb-5">

        {Object.keys(translations.scoringRules.rules).map(rule => (
            <div key={rule}>
                <ConnectedRulesScoringItem ruleIndex={rule} />
            </div>
        ))}

    </div>
)

const mapStateToProps = (state) => {
    let { translations } = state

    return { translations }
}

export const ConnectedRulesScoringCategory = connect(mapStateToProps)(RulesScoringCategory)