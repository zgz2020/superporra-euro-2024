import React from 'react'
import { connect } from 'react-redux'

const ScoringRule = ({ rule, ruleIndex }) => (
    <div key={rule} data-automation="scoring-rule-container" className="card mx-auto" >
        <div className="card-header">
            {`${ruleIndex}. ${rule.title} - `}
            {!rule.points ? null: 
                                rule.points[1] ? 
                                    `${rule.points[0]} or ${rule.points[1]}` : rule.points} 
            {' points'}
        </div>
        <div className="card-body">
            {rule.description}
            {rule.notes ?
                Object.keys(rule.notes).map(note => (
                    <div key={note} className="pl-5">
                        {`Note ${note}: `}
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
    let { rule, ruleIndex } = ownProps

    return { 
        rule,
        ruleIndex
    }
}

export const ConnectedScoringRule = connect(mapStateToProps)(ScoringRule)