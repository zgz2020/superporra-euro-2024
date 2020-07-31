import React from 'react'
import { connect } from 'react-redux' 
import * as mutations from '../../store/mutations' 
import { ConnectedResults } from '../Results'
import { ConnectedHeader } from '../Header'
import { ConnectedPredictionsFormButton } from '../PredictionsFormButton'
import { ConnectedPredictionsForm } from '../PredictionsForm'
 
const ParticipantPredictionsPage = ({
    user,
    predictionsFormExistent,
    showPredictionsFormExistent,
    translations
}) => (
    <div>
        {user ? 
            <div>
                <ConnectedHeader title={`${translations.participantPredictionsPage.title}: ${user.username}`} />

                {!predictionsFormExistent ?
                    <div>
                        <ConnectedPredictionsFormButton predictionType="existent" clickHandler={showPredictionsFormExistent} />

                        <ConnectedResults predictionType="existent" userID={user.id} />

                        <ConnectedPredictionsFormButton predictionType="existent" clickHandler={showPredictionsFormExistent} />
                    </div>
                    :
                    <ConnectedPredictionsForm predictionType="existent" userID={user.id}/> 
                }
            </div>
            :
            <div>{translations.placeholders.loading}</div>
        }
    </div>
)

const mapStateToProps = (state, ownProps) => {
    const { predictionsFormExistent, translations } = state
    let userID = ownProps.match.params.id
    let user = state.users.byId[userID]
    return { 
        user,
        predictionsFormExistent,
        translations
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showPredictionsFormExistent() {
            dispatch(mutations.showPredictionsFormExistent())
        }
    }
}

export const ConnectedParticipantPredictionsPage = connect(mapStateToProps, mapDispatchToProps)(ParticipantPredictionsPage)