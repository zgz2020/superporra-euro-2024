import React from 'react'
import { connect } from 'react-redux'
import * as mutations from '../store/mutations' 
import { ConnectedEuroStage } from './EuroStage'
import { ConnectedGeneralPrediction } from './GeneralPrediction'


const PredictionsForm = ( { 
    newPrediction,
    newPredictionUsername,
    generatingRandomPredictions,
    predictions,
    users,
    predictionType,
    userID,
    setUsernameHandler,
    setPredictionFieldHandler,
    generateRandomPredictionsRequest,
    setGoalsLeagueHandler,
    setGoalsR16Handler,
    setGoalsQuarterFinalHandler,
    setGoalsSemiFinalHandler,
    setGoalsFinalHandler,
    submitFormHandler,
    cancelPredictionForm,
    translations
} ) => { 

    const predictionDetails = (predictionType) => {
        if (predictionType === 'new') return { 
            predictions: newPrediction,
            username: newPredictionUsername,
            userID: ""
        }
        if (predictionType === 'existent' || 'results') return {
            predictions: predictions.byId[userID],
            username: users.byId[userID].username,
            userID: userID
        }
    }

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

    const submitButton = (predictionType) => (
        <div className="text-center py-4">
            <button type="submit" className="btn btn-primary" data-automation="submit-button">{submitButtonLabel(predictionType)}</button>
        </div>  
    )


    return (

        <div key="createPredictionsForm" className="card mx-auto"  data-automation="predictions-form" style={{width: "22rem"}}>

            <div className="card-header">
                <h3 >{formHeader(predictionType).title}</h3>
                <h5>{formHeader(predictionType).description}</h5>
            </div>

            <form onSubmit={e => submitFormHandler(predictionType, predictionDetails(predictionType).userID, predictionDetails(predictionType).username, predictionDetails(predictionType).predictions, translations, e)} >

                {submitButton(predictionType)}

                <div className="text-center pb-4">
                    <button type="button" onClick={e => cancelPredictionForm(predictionType, e)} className="btn btn-danger" data-automation="cancel-button">{translations.common.cancel}</button>
                </div> 

                <div> </div>
                
                {userID !== "U1" ?
                    <div>
                        <div className="form-group pt-3 px-2">
                            {`${translations.predictionsForm.username}: `}
                            <input type="text" onChange={e => setUsernameHandler(predictionType, predictionDetails(predictionType).userID, e)} value={predictionDetails(predictionType).username} className="form-control" data-automation="username-input"/>
                        </div>
                        
                        {!generatingRandomPredictions ?
                            <div className="text-center py-3">
                                <button 
                                    type="button" 
                                    onClick={e => generateRandomPredictionsRequest(predictionType, predictionDetails(predictionType).userID, e)} 
                                    className="btn btn-info"
                                    data-automation="random-predictions-button"
                                >
                                    {translations.common.generateRandomPredictions}
                                </button>
                            </div>  
                            :
                            <div className="text-center py-3">
                                <button className="btn btn-info" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    {`  ${translations.placeholders.loading}...`}
                                </button>
                            </div>
                        }       
                        
                    <h4 className="pt-2 pl-2">{translations.predictionsForm.predictions}</h4>
                    </div>
                    :
                    null
                }

                <ConnectedEuroStage predictionType={predictionType} mode="edit" userID={predictionDetails(predictionType).userID} stageName={translations.stages.groupStage} matchType="league" changeHandler={setGoalsLeagueHandler} prediction={predictionDetails(predictionType).predictions}/>

                <ConnectedEuroStage predictionType={predictionType} mode="edit" userID={predictionDetails(predictionType).userID} stageName={translations.stages.r16} matchType="r16" changeHandler={setGoalsR16Handler} prediction={predictionDetails(predictionType).predictions}/>

                <ConnectedEuroStage predictionType={predictionType} mode="edit" userID={predictionDetails(predictionType).userID} stageName={translations.stages.quarterFinals} matchType="quarterFinal" changeHandler={setGoalsQuarterFinalHandler} prediction={predictionDetails(predictionType).predictions}/>

                <ConnectedEuroStage predictionType={predictionType} mode="edit" userID={predictionDetails(predictionType).userID} stageName={translations.stages.semiFinals} matchType="semiFinal" changeHandler={setGoalsSemiFinalHandler} prediction={predictionDetails(predictionType).predictions}/>

                <ConnectedEuroStage predictionType={predictionType} mode="edit" userID={predictionDetails(predictionType).userID} stageName={translations.stages.final} matchType="final" changeHandler={setGoalsFinalHandler} prediction={predictionDetails(predictionType).predictions}/>

                <ConnectedGeneralPrediction title={translations.predictionsForm.euroWinner} predictionName="winner" predictionType={predictionType} userID={predictionDetails(predictionType).userID} />

                <ConnectedGeneralPrediction title={translations.predictionsForm.topScorer} predictionName="topScorer" predictionType={predictionType} userID={predictionDetails(predictionType).userID} />

                <ConnectedGeneralPrediction title={translations.predictionsForm.leastConceded} predictionName="leastConceded" predictionType={predictionType} userID={predictionDetails(predictionType).userID} />

                {submitButton(predictionType)}               
            </form>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { newPrediction,
        newPredictionUsername,
        generatingRandomPredictions,
        predictions,
        users,
        translations
    } = state
    const { predictionType, userID } = ownProps

    return {
        newPrediction,
        newPredictionUsername,
        generatingRandomPredictions,
        predictions, 
        users,
        predictionType,
        userID,
        translations
    }
}

const mapDispatchToProps = (dispatch) => {    
    return {
        setUsernameHandler(predictionType, userID, event){
            if (predictionType === 'new') 
                return dispatch(mutations.setUsernameNewPrediction(event.target.value))
            if (predictionType === 'existent' || 'results') 
                return dispatch(mutations.setUsername(event.target.value, userID))
        },
        setPredictionFieldHandler(predictionType, userID, field, event){
            if (predictionType === 'new') 
                return dispatch(mutations.setPredictionFieldNewPrediction(field, event.target.value))
            if (predictionType === 'existent' || 'results') 
                return dispatch(mutations.setPredictionField(userID, field, event.target.value))
        },
        setGoalsLeagueHandler(predictionType, userID, matchKey, team, event){
            if (predictionType === 'new') 
                return dispatch(mutations.setGoalsNewPredictionLeague(matchKey, team, event.target.value))
            if (predictionType === 'existent' || 'results') 
                return dispatch(mutations.setGoalsLeague(userID, matchKey, team, event.target.value))
        },
        setGoalsR16Handler(predictionType, userID, matchKey, team, event){
            if (predictionType === 'new') 
                return dispatch(mutations.setGoalsNewPredictionR16(matchKey, team, event.target.value))
            if (predictionType === 'existent' || 'results') 
                return dispatch(mutations.setGoalsR16(userID, matchKey, team, event.target.value))
        },
        setGoalsQuarterFinalHandler(predictionType, userID, matchKey, team, event){
            if (predictionType === 'new') 
                return dispatch(mutations.setGoalsNewPredictionQuarterFinal(matchKey, team, event.target.value))
            if (predictionType === 'existent' || 'results')
                return dispatch(mutations.setGoalsQuarterFinal(userID, matchKey, team, event.target.value))
        },
        setGoalsSemiFinalHandler(predictionType, userID, matchKey, team, event){
            if (predictionType === 'new') 
                return dispatch(mutations.setGoalsNewPredictionSemiFinal(matchKey, team, event.target.value))
            if (predictionType === 'existent' || 'results')
                return dispatch(mutations.setGoalsSemiFinal(userID, matchKey, team, event.target.value))
        },
        setGoalsFinalHandler(predictionType, userID, matchKey, team, event){
            if (predictionType === 'new') 
                return dispatch(mutations.setGoalsNewPredictionFinal(matchKey, team, event.target.value))
            if (predictionType === 'existent' || 'results')
                return dispatch(mutations.setGoalsFinal(userID, matchKey, team, event.target.value))
        },
        generateRandomPredictionsRequest(predictionType, userID, event){
                dispatch(mutations.generateRandomPredictionsRequest(predictionType, userID))
        },
        submitFormHandler(predictionType, userID, username, prediction, translations, event) {
            event.preventDefault()
            if(!username)
                return alert(translations.predictionsForm.noUsernameAlert)
            else {
                if (predictionType === 'new') {
                    dispatch(mutations.requestPredictionCreation(username, prediction))
                } else { 
                    predictionType === 'existent' ? dispatch(mutations.hidePredictionsFormExistent()) : dispatch(mutations.hidePredictionsFormResults())
                    dispatch(mutations.requestPredictionUpdate(userID, username, prediction))
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