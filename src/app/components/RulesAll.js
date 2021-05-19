import React from 'react'
import { connect } from 'react-redux'
import { ConnectedRulesGeneralCategory } from './RulesGeneralCategory'
import { ConnectedRulesScoringCategory } from './RulesScoringCategory'

const rulesAccordionItem = (rulesCategory, translations) => ( // general | scoring
    <div className="card">
            <div className="card-header bg-dark" id={`${rulesCategory}-rules`}>
                <h5 className="mb-0">
                    <button 
                        className="btn btn-link btn-lg text-white" 
                        data-toggle="collapse" 
                        data-target={`#${rulesCategory}Rules`} 
                        aria-expanded="true" 
                        aria-controls={`${rulesCategory}Rules`}
                    >
                        {translations[`${rulesCategory}Rules`].title}
                    </button>
                </h5>
            </div>

            <div 
                id={`${rulesCategory}Rules`}
                className="collapse show"
                aria-labelledby={`${rulesCategory}-rules`}
                data-parent="#accordion-rules-all"
            >
                <div className="card-body">
                    {rulesCategory == 'general' ?
                        <ConnectedRulesGeneralCategory />
                        :
                        <ConnectedRulesScoringCategory />
                    }
                    
                </div>
            </div>
        </div>
)


const RulesAll = ({ translations }) => (
    <div id="accordion-rules-all" className="mb-5">
        {rulesAccordionItem('general', translations)}
        {rulesAccordionItem('scoring', translations)}
    </div>
)

const mapStateToProps = (state) => {
    let { translations } = state

    return { translations }
}

export const ConnectedRulesAll = connect(mapStateToProps)(RulesAll)