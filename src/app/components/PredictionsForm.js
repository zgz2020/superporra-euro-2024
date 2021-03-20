import React from 'react'
import { connect } from 'react-redux'
import * as mutations from '../store/mutations' 
import { ConnectedEuroStage } from './EuroStage'
import { ConnectedGeneralPrediction } from './GeneralPrediction'


const PredictionsForm = ( { 
    newPrediction,
    newPredictionUsername,
    generatingRandomPredictions,
    predictionsOrResults,
    // predictions,
    users,
    nicknameTaken,
    predictionType,
    userID,
    predictionID,
    setUsernameHandler,
    // setPredictionFieldHandler,
    generateRandomPredictionsRequest,
    // setGoalsLeagueHandler,
    // setGoalsR16Handler,
    // setGoalsQuarterFinalHandler,
    // setGoalsSemiFinalHandler,
    // setGoalsFinalHandler,
    submitFormHandler,
    cancelPredictionForm,
    translations
} ) => { 

    const username = predictionType === 'new' ?
        newPredictionUsername
        :
        predictionType === 'existent' ?
            predictionsOrResults.username // predictions.byId[predictionID].username
            :
            null

    // const predictionDetails = (predictionType) => {
    //     if (predictionType === 'new') return { 
    //         // predictions: newPrediction,
    //         username: newPredictionUsername,
    //         predictionID: ""
    //     }
    //     if (predictionType === 'existent') return {  // === 'existent' || 'results')
    //         // predictions: predictions.byId[predictionID],
    //         username: predictions.byId[predictionID].username,
    //         predictionID: predictionID
    //     }
    //     return {}
    // }

    const formHeader = (predictionType) => {
        if (predictionType === 'new') return { 
            title: translations.predictionsForm.title.new,
            description: translations.predictionsForm.description.new
        }
        if (predictionType === 'existent') return {
            title: translations.predictionsForm.title.existent,
            description: translations.predictionsForm.description.existent
        }
        if (predictionType === 'results') return {
            title: translations.predictionsForm.title.results,
            description: translations.predictionsForm.description.results
        }
    }

    const submitButtonLabel = (predictionType) => {
        if (predictionType === 'new') return translations.common.submitPredictions
        if (predictionType === 'existent' || 'results') return translations.common.submitUpdates
    }

    const submitButton = (predictionType, nicknameTaken) => (
        <div className="text-center py-4">
            <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={nicknameTaken}
                data-automation="submit-button"
            >
                {submitButtonLabel(predictionType)}
            </button>
        </div>  
    )


    return (

        <div key="createPredictionsForm" className="card mx-auto"  data-automation="predictions-form">

            <div className="card-header">
                <h3 >{formHeader(predictionType).title}</h3>
                <h5>{formHeader(predictionType).description}</h5>
            </div>

            <form onSubmit={e => 
                submitFormHandler(
                    predictionType, 
                    userID, 
                    predictionsOrResults.id, // predictionID, // predictionDetails(predictionType).predictionID, 
                    username, // predictionDetails(predictionType).username, 
                    predictionsOrResults, 
                    translations, 
                    e
                )
            } >

                {submitButton(predictionType, nicknameTaken)}

                <div className="text-center pb-4">
                    <button 
                        type="button" 
                        onClick={e => cancelPredictionForm(predictionType, e)} 
                        className="btn btn-danger" 
                        data-automation="cancel-button"
                    >
                        {translations.common.cancel}
                    </button>
                </div> 

                <div> </div>
                
                {predictionType !== 'results' ? // predictionID !== "U1"
                    <div>
                        <div className="form-group pt-3 px-2 col-md-6 offset-md-3">
                            {`${translations.predictionsForm.username}: `}
                            <input 
                                type="text" 
                                onChange={e => setUsernameHandler(
                                    predictionType, 
                                    predictionsOrResults.id,
                                    e
                                )} 
                                value={username}
                                className="form-control" 
                                data-automation="username-input"
                            />

                            {nicknameTaken && 
                                <p
                                    className="text-danger font-italic mt-2"
                                    data-automation={`username-taken`}
                                >
                                    {translations.predictionsForm.usernameTakenError}
                                </p>
                            }
                        </div>

                        {!generatingRandomPredictions ?
                            <div className="text-center py-3">
                                <button 
                                    type="button" 
                                    onClick={e => generateRandomPredictionsRequest(
                                        predictionType, 
                                        predictionID, //predictionDetails(predictionType).predictionID, 
                                        e
                                    )} 
                                    className="btn btn-info"
                                    data-automation="random-predictions-button"
                                >
                                    {translations.common.generateRandomPredictions}
                                </button>
                            </div>  
                            :
                            <div className="text-center py-3">
                                <button className="btn btn-info" type="button" disabled>
                                    <span 
                                        className="spinner-border spinner-border-sm" 
                                        role="status" 
                                        aria-hidden="true"
                                    ></span>
                                    {`  ${translations.placeholders.loading}...`}
                                </button>
                            </div>
                        }       
                        
                        <h4 className="pt-2 pl-2">{translations.predictionsForm.predictions}</h4>
                    </div>
                    :
                    null
                }

                <ConnectedEuroStage 
                    predictionType={predictionType} 
                    mode="edit" 
                    predictionID={predictionID} //{predictionDetails(predictionType).predictionID} 
                    stageName={translations.stages.groupStage} 
                    // matchType="league" 
                    stage="leagueMatches"
                    // changeHandler={setGoalsLeagueHandler} 
                    predictionsOrResults={predictionsOrResults} //prediction={predictionsOrResults}
                />

                <ConnectedEuroStage 
                    predictionType={predictionType} 
                    mode="edit" 
                    predictionID={predictionID} //{predictionDetails(predictionType).predictionID} 
                    stageName={translations.stages.r16} 
                    // matchType="r16"
                    stage="r16Matches"
                    // changeHandler={setGoalsR16Handler} 
                    predictionsOrResults={predictionsOrResults} //prediction={predictionsOrResults}
                />

                <ConnectedEuroStage 
                    predictionType={predictionType} 
                    mode="edit" 
                    predictionID={predictionID} //{predictionDetails(predictionType).predictionID} 
                    stageName={translations.stages.quarterFinals} 
                    // matchType="quarterFinal" 
                    stage="quarterFinalMatches"
                    // changeHandler={setGoalsQuarterFinalHandler} 
                    predictionsOrResults={predictionsOrResults} //prediction={predictionsOrResults}
                />

                <ConnectedEuroStage 
                    predictionType={predictionType} 
                    mode="edit" 
                    predictionID={predictionID} //{predictionDetails(predictionType).predictionID} 
                    stageName={translations.stages.semiFinals} 
                    // matchType="semiFinal" 
                    stage="semiFinalMatches"
                    // changeHandler={setGoalsSemiFinalHandler} 
                    predictionsOrResults={predictionsOrResults} //prediction={predictionsOrResults}
                />

                <ConnectedEuroStage 
                    predictionType={predictionType} 
                    mode="edit" 
                    predictionID={predictionID} //{predictionDetails(predictionType).predictionID} 
                    stageName={translations.stages.final} 
                    // matchType="final" 
                    stage="finalMatches"
                    // changeHandler={setGoalsFinalHandler} 
                    predictionsOrResults={predictionsOrResults} //prediction={predictionsOrResults}
                />

                <ConnectedGeneralPrediction 
                    title={translations.predictionsForm.euroWinner} 
                    predictionName="winner" 
                    predictionType={predictionType} 
                    predictionID={predictionID} //{predictionDetails(predictionType).predictionID}
                    predictionsOrResults={predictionsOrResults} 
                />

                <ConnectedGeneralPrediction 
                    title={translations.predictionsForm.topScorer} 
                    predictionName="topScorer" 
                    predictionType={predictionType} 
                    predictionID={predictionID} //{predictionDetails(predictionType).predictionID} 
                    predictionsOrResults={predictionsOrResults}
                />

                <ConnectedGeneralPrediction 
                    title={translations.predictionsForm.leastConceded} 
                    predictionName="leastConceded" 
                    predictionType={predictionType} 
                    predictionID={predictionID}
                    predictionsOrResults={predictionsOrResults}
                />

                {submitButton(predictionType, nicknameTaken)}               
            </form>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { 
        newPrediction,
        newPredictionUsername,
        generatingRandomPredictions,
        predictions,
        users,
        nicknameTaken,
        translations,
        //loggedUser,
        session
    } = state
    const { predictionType, predictionID, predictionsOrResults } = ownProps

    const userID = session?.id ? session.id : null
    
    return {
        newPrediction,
        newPredictionUsername,
        generatingRandomPredictions,
        predictionsOrResults,
        predictions, 
        users,
        nicknameTaken,
        predictionType,
        userID,
        predictionID,
        translations
    }
}

const mapDispatchToProps = (dispatch) => {    
    return {
        setUsernameHandler(predictionType, predictionID, event){
            dispatch(mutations.usernameValidation(event.target.value))
            if (predictionType === 'new') 
                return dispatch(mutations.setUsernameNewPrediction(event.target.value))
            if (predictionType === 'existent')
                return dispatch(mutations.setUsernameExistentPrediction(predictionID, event.target.value))
        },
        generateRandomPredictionsRequest(predictionType, predictionID, event){
                dispatch(mutations.generateRandomPredictionsRequest(predictionType, predictionID))
        },
        submitFormHandler(predictionType, userID, predictionID, username, prediction, translations, event) {
            event.preventDefault()
            if(!username && predictionType !== 'results') // !usernam
                return alert(translations.predictionsForm.noUsernameAlert)
            else {
                if (predictionType === 'new') {
                    dispatch(mutations.requestPredictionCreation(userID, username, prediction))
                } 
                if (predictionType === 'existent') {
                    dispatch(mutations.hidePredictionsFormExistent())
                    dispatch(mutations.requestPredictionUpdate(predictionID, prediction, username))
                }  
                if (predictionType === 'results') {
                    dispatch(mutations.hidePredictionsFormResults())
                    dispatch(mutations.updateResults(prediction))
                }               
            }
        },
        cancelPredictionForm(predictionType, event) {
            if(predictionType === "new") {
                dispatch(mutations.hidePredictionsFormNew())
                dispatch(mutations.resetPredictionCreationForm())
            }
            if(predictionType === "existent") {
                dispatch(mutations.getMongoData())
                dispatch(mutations.hidePredictionsFormExistent())
            }
            if(predictionType === "results") {
                dispatch(mutations.getMongoData())
                dispatch(mutations.hidePredictionsFormResults())
            }
        }
    }
}

export const ConnectedPredictionsForm = connect(mapStateToProps, mapDispatchToProps)(PredictionsForm)