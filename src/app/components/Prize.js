import React from 'react'
import { connect } from 'react-redux'

const Prize = ({ translatedPrize }) => (
    <div key={translatedPrize} data-automation="scoring-rule-container" className="card mx-auto mb-5" >
        <div className="card-header lead">
            {translatedPrize.title}
        </div>
        <div className="card-body lead">
            {translatedPrize.reward}
        </div>
    </div>
)

const mapStateToProps = (state, ownProps) => {
    let { translations } = state
    let { prizeType } = ownProps
    let translatedPrize = translations.prizesPage[prizeType]

    return { translatedPrize }
}

export const ConnectedPrize = connect(mapStateToProps)(Prize)