import React from 'react'
import md5 from 'md5'
import { connect } from 'react-redux'
import * as mutations from '../store/mutations' 
import { ConnectedEuroStage } from './EuroStage'
import { ConnectedGeneralPrediction } from './GeneralPrediction'

const PredictionsForm = ( { 
    newPredictionUsername,
    generatingRandomPredictions,
    predictionsOrResults,
    nicknameTaken,
    noNickname,
    randomPredictionsGenerated,
    predictionType,
    userID,
    predictionID,
    setUsernameHandler,
    generateRandomPredictionsRequest,
    submitFormHandler,
    // cancelPredictionForm,
    translations,
    invalidEmailSignUpMessage,
    emailAlreadyRegisteredMessage,
    noPasswordMessage,
    predictionsIncomplete
} ) => { 

    const username = predictionType === 'new' ?
        newPredictionUsername
        :
        predictionType === 'existent' ?
            predictionsOrResults.username
            :
            null

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
                className="btn btn-primary btn-lg" 
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
                    predictionsOrResults.id,
                    username,
                    predictionsOrResults, 
                    translations, 
                    e
                )
            } >

                {predictionType !== 'results' ?
                    <div>
                        <div className="form-group pt-3 px-2 col-md-6 offset-md-3">
                            
                            {predictionType == 'new' &&
                                <div>
                                    {`${translations.signInPage.email}:`}
                                    <input 
                                        type="text" 
                                        placeholder={translations.signInPage.emailPlaceholder}
                                        name="emailAddress"
                                        className="form-control" 
                                        data-automation="email-address-input"
                                    />

                                    {invalidEmailSignUpMessage &&  
                                        <p 
                                            className="text-danger font-italic mt-2"
                                            data-automation="invalid-email-message-signUp"
                                        >
                                            {translations.signInPage.noEmail}
                                        </p>
                                    }

                                    {emailAlreadyRegisteredMessage &&  
                                        <p 
                                            className="text-danger font-italic mt-2"
                                            data-automation="email-error-signUp"
                                        >
                                            {translations.signInPage.emailAlreadyRegistered}
                                        </p>
                                    }


                                    {`${translations.signInPage.password}:`}
                                    <input 
                                        type="password" 
                                        placeholder={translations.signInPage.passwordPlaceholder}
                                        name="password"
                                        className="form-control" 
                                        data-automation="password-input"
                                    />

                                    {noPasswordMessage &&  
                                        <p 
                                            className="text-danger font-italic mt-2"
                                            data-automation="password-error-signUp"
                                        >
                                            {translations.signInPage.noPassword}
                                        </p>
                                    }
                                </div>
                            }


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
                                    data-automation={"username-taken"}
                                >
                                    {translations.predictionsForm.usernameTakenError}
                                </p>
                            }

                            {noNickname && 
                                <p
                                    className="text-danger font-italic mt-2"
                                    data-automation={"no-username"}
                                >
                                    {translations.predictionsForm.noUsernameAlert}
                                </p>
                            }
                        </div>

                        {!generatingRandomPredictions ?
                            <div className="text-center py-3">
                                <button 
                                    type="button" 
                                    onClick={e => generateRandomPredictionsRequest(
                                        predictionType, 
                                        predictionID,
                                        e
                                    )} 
                                    className="btn btn-info"
                                    data-automation="random-predictions-button"
                                >
                                    {translations.common.generateRandomPredictions}
                                </button>

                                {randomPredictionsGenerated && 
                                    <p
                                        className="text-success font-italic mt-2"
                                        data-automation={"random-predictions-generated"}
                                    >
                                        {translations.predictionsForm.randomPredictionsGenerated}
                                    </p>
                                }
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

                        
                        {predictionsIncomplete && 
                            <div className="text-center pb-4">
                                <div
                                    className="text-danger font-italic mt-2"
                                    data-automation={"predictions-incomplete"}
                                >
                                    {translations.predictionsForm.predictionsIncomplete}
                                </div>
                            </div>
                        }
                        
                        {submitButton(predictionType, nicknameTaken)}

                        <h4 className="pt-2 pl-2">{translations.predictionsForm.predictions}</h4>
                    </div>
                    :
                    null
                }

                <ConnectedEuroStage 
                    predictionType={predictionType} 
                    mode="edit" 
                    predictionID={predictionID}
                    stageName={translations.stages.groupStage} 
                    stage="leagueMatches"
                    predictionsOrResults={predictionsOrResults}
                />

                <ConnectedEuroStage 
                    predictionType={predictionType} 
                    mode="edit" 
                    predictionID={predictionID}
                    stageName={translations.stages.r16} 
                    stage="r16Matches"
                    predictionsOrResults={predictionsOrResults}
                />

                <ConnectedEuroStage 
                    predictionType={predictionType} 
                    mode="edit" 
                    predictionID={predictionID}
                    stageName={translations.stages.quarterFinals} 
                    stage="quarterFinalMatches"
                    predictionsOrResults={predictionsOrResults}
                />

                <ConnectedEuroStage 
                    predictionType={predictionType} 
                    mode="edit" 
                    predictionID={predictionID}
                    stageName={translations.stages.semiFinals} 
                    stage="semiFinalMatches"
                    predictionsOrResults={predictionsOrResults}
                />

                <ConnectedEuroStage 
                    predictionType={predictionType} 
                    mode="edit" 
                    predictionID={predictionID}
                    stageName={translations.stages.final} 
                    stage="finalMatches"
                    predictionsOrResults={predictionsOrResults}
                />

                <ConnectedGeneralPrediction 
                    title={translations.predictionsForm.euroWinner} 
                    predictionName="winner" 
                    predictionType={predictionType} 
                    predictionID={predictionID}
                    predictionsOrResults={predictionsOrResults} 
                />

                <ConnectedGeneralPrediction 
                    title={translations.predictionsForm.topScorer} 
                    predictionName="topScorer" 
                    predictionType={predictionType} 
                    predictionID={predictionID}
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

                <div className="text-center">
                    {invalidEmailSignUpMessage &&  
                        <p 
                            className="text-danger font-italic mt-2"
                            data-automation="invalid-email-message-signUp"
                        >
                            {translations.signInPage.noEmail}
                        </p>
                    }

                    {emailAlreadyRegisteredMessage &&  
                        <p 
                            className="text-danger font-italic mt-2"
                            data-automation="email-error-signUp"
                        >
                            {translations.signInPage.emailAlreadyRegistered}
                        </p>
                    }

                    {noPasswordMessage &&  
                        <p 
                            className="text-danger font-italic mt-2"
                            data-automation="password-error-signUp"
                        >
                            {translations.signInPage.noPassword}
                        </p>
                    }

                    {noNickname && 
                        <p
                            className="text-danger font-italic mt-2"
                            data-automation={"no-username"}
                        >
                            {translations.predictionsForm.noUsernameAlert}
                        </p>
                    }

                    {predictionsIncomplete && 
                        <p
                            className="text-danger font-italic mt-2"
                            data-automation={"predictions-incomplete"}
                        >
                            {translations.predictionsForm.predictionsIncomplete}
                        </p>
                    }
                </div>
                

            </form>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {

    const { 
        newPredictionUsername,
        generatingRandomPredictions,
        predictions,
        nicknameTaken,
        noNickname,
        randomPredictionsGenerated,
        translations,
        session,
        invalidEmailSignUpMessage,
        emailAlreadyRegisteredMessage,
        noPasswordMessage,
        predictionsIncomplete
    } = state
    const { predictionType, predictionID, predictionsOrResults } = ownProps

    const userID = session?.id ? session.id : null
    
    return {
        newPredictionUsername,
        generatingRandomPredictions,
        predictionsOrResults,
        predictions, 
        nicknameTaken,
        noNickname,
        randomPredictionsGenerated,
        predictionType,
        userID,
        predictionID,
        translations,
        invalidEmailSignUpMessage,
        emailAlreadyRegisteredMessage,
        noPasswordMessage,
        predictionsIncomplete
    }
}

const mapDispatchToProps = (dispatch) => {    
    let emailAddress = (e) => e.target['emailAddress'].value
    let passwordHash = (e) => md5(e.target['password'].value)

    return {
        setUsernameHandler(predictionType, predictionID, event){
            dispatch(mutations.hideNoNickname())
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
            dispatch(mutations.hideNoNickname())
            if(!username && predictionType !== 'results')
                return dispatch(mutations.showNoNickname())
            else {
                if (predictionType === 'new') {
                    dispatch(mutations.requestUserCreation(emailAddress(event), passwordHash(event), username, prediction))
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
    }
}

export const ConnectedPredictionsForm = connect(mapStateToProps, mapDispatchToProps)(PredictionsForm)