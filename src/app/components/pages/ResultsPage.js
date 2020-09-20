import React from 'react'
import { connect } from 'react-redux'
import * as mutations from '../../store/mutations' 
import { ConnectedResults } from '../Results'
import { ConnectedHeader } from '../Header'
import { ConnectedPredictionsForm } from '../PredictionsForm'
import { ConnectedPredictionsFormButton } from '../PredictionsFormButton'
 
const ResultsPage = ({ loggedUserID, predictionsFormResults, showPredictionsFormResults, translations, results }) => (
    <div>
        <ConnectedHeader title={translations.resultsPage.title}/>

        {!predictionsFormResults ?
            <div>
                {loggedUserID === "8880442a3a44e2eeaa42b36557becaee" ?
                    <ConnectedPredictionsFormButton predictionType="results" clickHandler={showPredictionsFormResults} />
                    :
                    null
                }
                
                <ConnectedResults predictionType="results" />  

                {loggedUserID === "8880442a3a44e2eeaa42b36557becaee" ?
                    <ConnectedPredictionsFormButton predictionType="results" clickHandler={showPredictionsFormResults} />
                    :
                    null
                }            
            </div>
            :
            <ConnectedPredictionsForm predictionType="results" predictionsOrResults={results} predictionID="results" />
        }
    </div>
)

const mapStateToProps = (state) => {
    const { predictionsFormResults, translations, loggedUser, results } = state
    let loggedUserID = loggedUser?.userID ? loggedUser.userID : "loggedOut"

    return {
        loggedUserID,
        predictionsFormResults,
        translations,
        results
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showPredictionsFormResults() {
            dispatch(mutations.showPredictionsFormResults())
        }
    }
}

export const ConnectedResultsPage = connect(mapStateToProps,mapDispatchToProps)(ResultsPage)