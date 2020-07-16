import React from 'react'
import { connect } from 'react-redux'
import { generalPredictionsSelect } from '../../utils/predictions'
import * as mutations from '../store/mutations' 
import { ConnectedEuroStage } from './EuroStage'


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
    cancelPredictionForm } ) => { 

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
            title: "Participa en la superporra mandando tus prediccions",
            description: "Haz click en el botón 'Mandar Predicciones' cuando hayas acabado."
        }
        if (predictionType === 'existent') return {
            title: "Actualiza tus predicciones",
            description: "Haz click en el botón 'Mandar Actualizaciones' cuando hayas acabado."
        }
        if (predictionType === 'results') return {
            title: "Actualiza los resultados oficiales",
            description: "Haz click en el botón 'Mandar Actualizaciones' cuando hayas acabado."
        }
    }

    const submitButtonLabel = (predictionType) => {
        if (predictionType === 'new') return "Mandar Predicciones"
        if (predictionType === 'existent' || 'results') return "Mandar Actualizaciones"
    }

    const submitButton = (predictionType) => (
        <div className="text-center py-4">
            <button type="submit" className="btn btn-primary" data-automation="submit-button">{submitButtonLabel(predictionType)}</button>
        </div>  
    )


    return (

        <div key="createPredictionsForm" className="card mx-auto" style={{width: "28rem"}} data-automation="predictions-form">

            <div className="card-header">
                <h3 >{formHeader(predictionType).title}</h3>
                <h5>{formHeader(predictionType).description}</h5>
            </div>

            <form onSubmit={e => submitFormHandler(predictionType, predictionDetails(predictionType).userID, predictionDetails(predictionType).username, predictionDetails(predictionType).predictions, e)} className="card-body">

                {submitButton(predictionType)}

                <div className="text-center pb-4">
                    <button type="button" onClick={e => cancelPredictionForm(predictionType, e)} className="btn btn-danger" data-automation="cancel-button">Cancelar</button>
                </div> 

                <div> </div>
                
                {userID !== "U1" ?
                    <div>
                        <div className="form-group pt-3">
                            {"Nombre de usuario: "}
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
                                    Generar predicciones aleatorias
                                </button>
                            </div>  
                            :
                            <div className="text-center py-3">
                                <button className="btn btn-info" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    {'  Cargando...'}
                                </button>
                            </div>
                        }       
                        
                        <h4>Predicciones</h4>
                    </div>
                    :
                    null
                }

                <div className="card">
                    <div className="form-group pt-3 d-flex flex-column card-body">
                        {generalPredictionsSelect(predictionType, predictionDetails(predictionType).userID, "winner", setPredictionFieldHandler, predictionDetails(predictionType).predictions)}
                        {generalPredictionsSelect(predictionType, predictionDetails(predictionType).userID, "finalist", setPredictionFieldHandler, predictionDetails(predictionType).predictions)}
                        {generalPredictionsSelect(predictionType, predictionDetails(predictionType).userID, "topScorer", setPredictionFieldHandler, predictionDetails(predictionType).predictions)}
                        {generalPredictionsSelect(predictionType, predictionDetails(predictionType).userID, "leastConceded", setPredictionFieldHandler, predictionDetails(predictionType).predictions)}
                    </div>
                </div>

                <ConnectedEuroStage predictionType={predictionType} mode="edit" userID={predictionDetails(predictionType).userID} stageName="Fase de grupos" matchType="league" changeHandler={setGoalsLeagueHandler} prediction={predictionDetails(predictionType).predictions}/>

                <ConnectedEuroStage predictionType={predictionType} mode="edit" userID={predictionDetails(predictionType).userID} stageName="Dieciseisavos de final" matchType="r16" changeHandler={setGoalsR16Handler} prediction={predictionDetails(predictionType).predictions}/>

                <ConnectedEuroStage predictionType={predictionType} mode="edit" userID={predictionDetails(predictionType).userID} stageName="Cuartos de final" matchType="quarterFinal" changeHandler={setGoalsQuarterFinalHandler} prediction={predictionDetails(predictionType).predictions}/>

                <ConnectedEuroStage predictionType={predictionType} mode="edit" userID={predictionDetails(predictionType).userID} stageName="Semifinales" matchType="semiFinal" changeHandler={setGoalsSemiFinalHandler} prediction={predictionDetails(predictionType).predictions}/>

                <ConnectedEuroStage predictionType={predictionType} mode="edit" userID={predictionDetails(predictionType).userID} stageName="Final" matchType="final" changeHandler={setGoalsFinalHandler} prediction={predictionDetails(predictionType).predictions}/>

                {submitButton(predictionType)}               
            </form>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { newPrediction, newPredictionUsername, generatingRandomPredictions, predictions, users } = state
    const { predictionType, userID } = ownProps
    return {
        newPrediction,
        newPredictionUsername,
        generatingRandomPredictions,
        predictions, 
        users,
        predictionType,
        userID
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
        submitFormHandler(predictionType, userID, username, prediction, event) {
            event.preventDefault()
            if(!username)
                return alert("Introduce un nombre de usuario")
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