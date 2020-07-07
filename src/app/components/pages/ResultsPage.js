import React from 'react'
import { connect } from 'react-redux'
import * as mutations from '../../store/mutations' 
import { ConnectedResults } from '../Results'
import { ConnectedHeader } from '../Header'

import { ConnectedPredictionsForm } from '../PredictionsForm'
import { ConnectedPredictionsFormButton } from '../PredictionsFormButton'
 
const ResultsPage = ({ predictionsFormResults, showPredictionsFormResults }) => (
    <div>
        <h2 className="jumbotron">
            <ConnectedHeader title="Resultados oficiales"/>
        </h2>

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
    const { predictionsFormResults } = state
    return {
        predictionsFormResults
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