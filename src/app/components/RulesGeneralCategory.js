import React from 'react'
import { connect } from 'react-redux'
import { ConnectedRulesGeneralItem } from './RulesGeneraItem'

const RulesGeneralCategory = ({ translations }) => (
    <div id="accordion-general-rules" className="mb-5">

        {Object.keys(translations.generalRules.rules).map(rule => (
            <div key={rule}>
                <ConnectedRulesGeneralItem ruleIndex={rule} />
            </div>
        ))}

    </div>
)

const mapStateToProps = (state) => {
    let { translations } = state

    return { translations }
}

export const ConnectedRulesGeneralCategory = connect(mapStateToProps)(RulesGeneralCategory)