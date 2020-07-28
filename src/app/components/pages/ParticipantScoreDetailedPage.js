import React from 'react'
import { connect } from 'react-redux'
import { ConnectedHeader } from '../Header'
import { ConnectedResults } from '../Results'
import { ConnectedParticipantScoreDetailed } from '../ParticipantScoreDetailed'

const ParticipantScoreDetailedPage = ({ user }) => (
    <div>
        {user ?
            <div>
                <ConnectedHeader title={`Puntuaciones ${user.username}`} /> 

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 2 }}>
                    <div>
                        <h4>Predicciones</h4>
                        <ConnectedResults predictionType="existent" userID={user.id} />
                    </div>
                    <div>
                        <h4>Resultados oficiales</h4>
                        <ConnectedResults predictionType="results" userID="U1"  />
                    </div>
                    <div>
                        <h4>{`Puntos ${user.username}`}</h4>
                        <ConnectedParticipantScoreDetailed userID={user.id} />
                    </div>
                </div>

            </div>
            :
            <div>Cargando</div>
        }
    </div>
)

const mapSatateToProps = (state, ownProps) => {
    let userID = ownProps.match.params.id
    let user = state.users.byId[userID]
    return {
        user
    }
}

export const ConnectedParticipantScoreDetailedPage = connect(mapSatateToProps)(ParticipantScoreDetailedPage)
