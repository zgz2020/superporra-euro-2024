import React from 'react'
import { connect } from 'react-redux'
import { ConnectedHeader } from '../Header'
import { ConnectedResults } from '../Results'
import { ConnectedParticipantScoreDetailed } from '../ParticipantScoreDetailed'

const ParticipantScoreDetailedPage = ({ user, translations }) => (
    <div>
        {user ?
            <div>
                <ConnectedHeader title={`${translations.participantScoreDetailedPage.title}: ${user.username}`} /> 

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 2 }}>
                    <div>
                        <h4>{translations.predictionsForm.predictions}</h4>
                        <ConnectedResults predictionType="existent" userID={user.id} />
                    </div>
                    <div>
                        <h4>{translations.resultsPage.title}</h4>
                        <ConnectedResults predictionType="results" userID="U1"  />
                    </div>
                    <div>
                        <h4>{`${translations.participantScoreDetailedPage.title}: ${user.username}`}</h4>
                        <ConnectedParticipantScoreDetailed userID={user.id} />
                    </div>
                </div>

            </div>
            :
            <div>{translations.placeholders.loading}</div>
        }
    </div>
)

const mapSatateToProps = (state, ownProps) => {
    let { translations } = state 
    let userID = ownProps.match.params.id
    let user = state.users.byId[userID]

    return {
        user,
        translations
    }
}

export const ConnectedParticipantScoreDetailedPage = connect(mapSatateToProps)(ParticipantScoreDetailedPage)
