import React from 'react'
import { connect } from 'react-redux'
import * as mutations from '../../store/mutations' 
import { ConnectedResults } from '../Results'
import { ConnectedHeader } from '../Header'

import { ConnectedPredictionsForm } from '../PredictionsForm'
import { ConnectedPredictionsFormButton } from '../PredictionsFormButton'
 
const ResultsPage = ({ predictionsFormResults, showPredictionsFormResults, translations }) => (
    <div>
        <ConnectedHeader title={translations.resultsPage.title}/>

        {!predictionsFormResults ?
            <div>
                <ConnectedPredictionsFormButton predictionType="results" clickHandler={showPredictionsFormResults} />

                <ConnectedResults predictionType="results" userID="U1"  />

                <ConnectedPredictionsFormButton predictionType="results" clickHandler={showPredictionsFormResults} />
            </div>
            :
            <ConnectedPredictionsForm predictionType="results" userID="U1" />
        }
    </div>
)

const mapStateToProps = (state) => {
    const { predictionsFormResults, translations } = state
    return {
        predictionsFormResults,
        translations
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