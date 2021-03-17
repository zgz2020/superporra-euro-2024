import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../store'
import { Router, Route } from 'react-router-dom'
import { history } from '../store/history'
import { getLocalStorageLanguage, getMongoData, getSessionStatus } from '../store/mutations'
import { ConnectedNavigation } from './Navigation'
import { ConnectedHomePage } from './pages/HomePage'
import { ConnectedResultsPage } from './pages/ResultsPage'
import { ConnectedParticipantsPage } from './pages/ParticipantsPage'
import { ConnectedParticipantPredictionsPage } from './pages/ParticipantPredictionsPage'
import { ConnectedParticipantScoreDetailedPage } from './pages/ParticipantScoreDetailedPage'
import { ConnectedScoringRulesPage } from './pages/ScoringRulesPage'
import { ConnectedAccountPage } from './pages/AccountPage'
import { ConnectedLoginPage } from './pages/LoginPage'
import { ConnectedPasswordResetPage } from './pages/PasswordResetPage'

export const Main = () => (
    <Router history={history}>
        <Provider store={store}>
            <div>
                <ConnectedNavigation />
                <Route exact path="/" render={() => (<ConnectedHomePage />)} />
                <Route path="/sign-in" render={() => (<ConnectedLoginPage />)} />
                <Route path="/sign-out" render={() => (<ConnectedLoginPage />)} />
                <Route path="/password-reset/:token" render={({ match }) => (<ConnectedPasswordResetPage match={match} />)} />
                <Route path="/results" render={() => (<ConnectedResultsPage />)} />
                <Route exact path="/participants" render={() => (<ConnectedParticipantsPage />)} />
                <Route exact path="/participants/:id" render={({ match }) => (<ConnectedParticipantPredictionsPage match={match} />)} />
                <Route exact path="/participants/score/:id" render={({ match }) => (<ConnectedParticipantScoreDetailedPage match={match} />)} />
                <Route path="/scoring-rules" render={() => (<ConnectedScoringRulesPage />)} />
                <Route path="/account" render={() => (<ConnectedAccountPage />)} />
            </div>
        </Provider>
    </Router>
)

store.dispatch(getSessionStatus())
store.dispatch(getLocalStorageLanguage())
store.dispatch(getMongoData())
