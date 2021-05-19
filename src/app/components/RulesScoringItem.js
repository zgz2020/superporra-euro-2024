import React from 'react'
import { connect } from 'react-redux'

const RulesScoringItem = ({ ruleIndex, ruleTranslations, translations }) => (

    <div className="card" id={`scoring-rule-${ruleIndex}`}>

        <div className="card-header" id={`scoring-rule-${ruleIndex}`}>
            <h5 className="mb-0">
                <button 
                    className="btn btn-link" 
                    data-toggle="collapse" 
                    data-target={`#scoringRule${ruleIndex}`}
                    aria-expanded="true" 
                    aria-controls={`scoringRule${ruleIndex}`}
                >
                    {`${ruleIndex}. ${ruleTranslations.title}`}
                    {!ruleTranslations.points ? 
                        null 
                        :
                        ruleTranslations.points[1] ? 
                            ` - ${ruleTranslations.points[0]} ${translations.common.or} ${ruleTranslations.points[1]}` 
                            : 
                            ` - ${ruleTranslations.points}` }
                    {!ruleTranslations.points ? 
                        null 
                        : 
                        ` ${translations.scoringRules.points}`}
                </button>
            </h5>
        </div>

        <div 
            id={`scoringRule${ruleIndex}`}
            className={`collapse ${ruleIndex == "a" ? 'show' : ""}`}
            aria-labelledby={`scoring-rule-${ruleIndex}`}
            data-parent="#accordion-scoring-rules"
        >
            <div className="card-body">
                {ruleTranslations.description}
                {ruleTranslations.notes ?
                    Object.keys(ruleTranslations.notes).map(note => (
                        <div key={note} className="pl-5">
                            {`${translations.common.note} ${note}: `}
                            <div className="pl-4">
                                <em>{ruleTranslations.notes[note]}</em>
                            </ div>
                        </div>
                    ))
                    : null
                }
            </div>
        </div>
        
    </div>

)

const mapStateToProps = (state, ownProps) => {
    let { translations } = state
    let { ruleIndex } = ownProps
    let ruleTranslations = translations.scoringRules.rules[ruleIndex]
    
    return { 
        ruleIndex,
        ruleTranslations,
        translations
    }
}

export const ConnectedRulesScoringItem = connect(mapStateToProps)(RulesScoringItem)