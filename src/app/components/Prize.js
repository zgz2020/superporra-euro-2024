import React from 'react'
import { connect } from 'react-redux'
import { sponsorName, sponsorLink } from '../../utils/sponsor'

const Prize = ({ translatedPrizes, prizeType }) => (
    <div key={prizeType} data-automation="prize-container" className="card mx-auto mb-5" >
        <div className={`card-header lead font-weight-bold ${prizeType == "winner" ? "bg-warning text-dark" : "bg-secondary text-white"}`}>
            {translatedPrizes[prizeType].title(translatedPrizes[prizeType].reward)}
        </div>
        <div className="card-body lead">
            {translatedPrizes.reward(translatedPrizes[prizeType].reward)}
            <a href={sponsorLink} target="_blank">{sponsorName}</a>
        </div>
    </div>
)

const mapStateToProps = (state, ownProps) => {
    let { translations } = state
    let { prizeType } = ownProps
    let translatedPrizes = translations.prizesPage

    return { translatedPrizes, prizeType }
}

export const ConnectedPrize = connect(mapStateToProps)(Prize)