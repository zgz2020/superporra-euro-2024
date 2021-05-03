import React from 'react'
import { connect } from 'react-redux'
import * as mutations from '../store/mutations' 
import { ConnectedResults } from '../components/Results'
import { ConnectedHeader } from '../components/Header'
import { ConnectedPredictionsForm } from '../components/PredictionsForm'
import { ConnectedPredictionsFormButton } from '../components/PredictionsFormButton'
import { ConnectedHomepageSponsor } from '../components/HomepageSponsor'
 
const ResultsPage = ({ role, predictionsFormResults, showPredictionsFormResults, translations, results }) => (
    <div className="mb-5">
        <ConnectedHeader title={translations.resultsPage.title}/>

        <ConnectedHomepageSponsor />

        <div className="my-5"></div>
        
        {!predictionsFormResults ?
            <div>
                {role === 'admin' ? 
                    <ConnectedPredictionsFormButton predictionType="results" clickHandler={showPredictionsFormResults} />
                    :
                    null
                }
                
                <ConnectedResults predictionType="results" />  

                {role === 'admin' ? 
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
    const { predictionsFormResults, translations, results, session, users } = state
    let role = session?.id && users.byId[session.id] ? users.byId[session.id].role : "no role"

    return {
        role,
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