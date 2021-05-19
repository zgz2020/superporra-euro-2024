import React from 'react'
import { connect } from 'react-redux'
import { sponsorName, sponsorLink } from '../../utils/sponsor'

const RulesGeneralItem = ({ ruleIndex, ruleTranslations }) => (

    <div className="card" id={`general-rule-${ruleIndex}`}>

        <div className="card-header" id={`general-rule-${ruleIndex}`}>
            <h5 className="mb-0">
                <button 
                    className="btn btn-link" 
                    data-toggle="collapse" 
                    data-target={`#generalRule${ruleIndex}`}
                    aria-expanded="true" 
                    aria-controls={`generalRule${ruleIndex}`}
                >
                    {`${ruleIndex}. ${ruleTranslations.title}`}
                </button>
            </h5>
        </div>

        <div 
            id={`generalRule${ruleIndex}`}
            className={`collapse ${ruleIndex == 1 ? 'show' : ""}`} //"collapse"
            aria-labelledby={`general-rule-${ruleIndex}`}
            data-parent="#accordion-general-rules"
        >
            <div className="card-body">
                {ruleTranslations.description}
                {["1", "3"].includes(ruleIndex) ? 
                    <a href={sponsorLink} target="_blank">{sponsorName}</a>
                    :
                    null
                }
            </div>
        </div>
        
    </div>

)

const mapStateToProps = (state, ownProps) => {
    let { translations } = state
    let { ruleIndex } = ownProps
    let ruleTranslations = translations.generalRules.rules[ruleIndex]

    return { 
        ruleIndex,
        ruleTranslations
    }
}

export const ConnectedRulesGeneralItem = connect(mapStateToProps)(RulesGeneralItem)