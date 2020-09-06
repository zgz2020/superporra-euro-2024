import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../store'
import { Router, Route } from 'react-router-dom'
import { history } from '../store/history'
import { getMongoData } from '../store/mutations'

import { ConnectedNavigation } from './Navigation'
import { ConnectedHomePage } from './pages/HomePage'
import { ConnectedResultsPage } from './pages/ResultsPage'
import { ConnectedParticipantsPage } from './pages/ParticipantsPage'
import { ConnectedParticipantPredictionsPage } from './pages/ParticipantPredictionsPage'
import { ConnectedParticipantScoreDetailedPage } from './pages/ParticipantScoreDetailedPage'
import { ConnectedScoringRulesPage } from './pages/ScoringRulesPage'

// import Callback from './pages/CallbackPage'

import Callback from './pages/CallbackPage'
import { ConnectedAuthLoginComponent } from './AuthLogin'

// import { ConnectedLoginPage } from './pages/LoginPage'
// import { Redirect } from 'react-router'  --> It would be used when adding AUTHENTICATION

// +++++++ This would be to add AUTHENTICATION / LOGIN to specific pages ++++++
// const RouteGuard = Component => ({ match }) => {
//     console.info("Route guard: ", match)
//     if (!store.getState().session.authenticated) {
//         // we'll reroute
//         console.info("Usuario no identificado!!!")
//         //return <div>{"Usuario no identificado!!!"}</div>  
//         return <Redirect to="/login" />
//     } else {
//         return <Component match={match} />
//     }
// }

export const Main = () => (
    <Router history={history}>
        <Provider store={store}>
            <div>
                <ConnectedNavigation />
                <Route exact path="/" render={() => (<ConnectedHomePage />)} />
                <Route path="/results" render={() => (<ConnectedResultsPage />)} />
                <Route exact path="/participants" render={() => (<ConnectedParticipantsPage />)} />
                <Route exact path="/participants/:id" render={({ match }) => (<ConnectedParticipantPredictionsPage match={match} />)} />
                <Route exact path="/participants/score/:id" render={({ match }) => (<ConnectedParticipantScoreDetailedPage match={match} />)} />
                <Route path="/scoring-rules" render={() => (<ConnectedScoringRulesPage />)} />

                {/* <Route exact path="/login" render={() => (<ConnectedLoginPage />)} /> */}
                {/* <Route exact path="/participants/:id" render={RouteGuard(ConnectedParticipantPredictionsPage)} />  
                        THIS LINE ABOVE would be to add authentication to participant page */}
                
                {/* <Route path="/callback" render={props => <Callback auth={this.auth} {...props} />}/> */}
                <Route path="/callback" render={() => (<Callback />)}/>
                <Route path="/auth-login" render={() => (<ConnectedAuthLoginComponent />)} />

            </div>
        </Provider>
    </Router>
)

store.dispatch(getMongoData())