import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../store'
import { Router, Route } from 'react-router-dom'
import { history } from '../store/history'
import { getMongoData } from '../store/mutations'

import { Navigation } from './Navigation'
import { HomePage } from './pages/HomePage'
import { ConnectedResultsPage } from './pages/ResultsPage'
import { ConnectedParticipantsPage } from './pages/ParticipantsPage'
import { ConnectedParticipantPredictionsPage } from './pages/ParticipantPredictionsPage'
import { ConnectedParticipantScoreDetailedPage } from './pages/ParticipantScoreDetailedPage'

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
                <Navigation />
                <Route exact path="/" render={() => (<HomePage />)} />
                <Route path="/results" render={() => (<ConnectedResultsPage />)} />
                <Route exact path="/participants" render={() => (<ConnectedParticipantsPage />)} />
                <Route exact path="/participants/:id" render={({ match }) => (<ConnectedParticipantPredictionsPage match={match} />)} />
                <Route exact path="/participants/score/:id" render={({ match }) => (<ConnectedParticipantScoreDetailedPage match={match} />)} />

                {/* <Route exact path="/login" render={() => (<ConnectedLoginPage />)} /> */}
                {/* <Route exact path="/participants/:id" render={RouteGuard(ConnectedParticipantPredictionsPage)} />  
                        THIS LINE ABOVE would be to add authentication to participant page */}
            </div>
        </Provider>
    </Router>
)

store.dispatch(getMongoData())