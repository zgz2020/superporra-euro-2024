import React from 'react'
import { connect } from 'react-redux'

const ScoringRule = ({ rule, ruleIndex, translations }) => (
    <div key={rule} data-automation="scoring-rule-container" className="card mx-auto" >
        <div className="card-header">
            {`${ruleIndex}. ${rule.title}`}
            {!rule.points ? null :
                                rule.points[1] ? 
                                    ` - ${rule.points[0]} ${translations.common.or} ${rule.points[1]}` : ` - ${rule.points}` }
            {!rule.points ? null : ` ${translations.participantScores.points}`}
        </div>
        <div className="card-body">
            {rule.description}
            {rule.notes ?
                Object.keys(rule.notes).map(note => (
                    <div key={note} className="pl-5">
                        {`${translations.common.note} ${note}: `}
                        <div className="pl-4">
                            <em>{rule.notes[note]}</em>
                        </ div>
                    </div>
                ))
                : null
            }
        </div>
    </div>
)

const mapStateToProps = (state, ownProps) => {
    let { translations } = state
    let { rule, ruleIndex } = ownProps
    
    return { 
        rule,
        ruleIndex,
        translations
    }
}

export const ConnectedScoringRule = connect(mapStateToProps)(ScoringRule)