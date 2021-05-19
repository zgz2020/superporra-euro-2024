import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { Router, Route } from 'react-router-dom'
import { history } from './store/history'
import { getLocalStorageLanguage, getMongoData, getSessionStatus } from './store/mutations'
import { ConnectedNavigation } from './components/Navigation'
import { ConnectedHomePage } from './pages/HomePage'
import { ConnectedResultsPage } from './pages/ResultsPage'
import { ConnectedParticipantsPage } from './pages/ParticipantsPage'
import { ConnectedParticipantPredictionsPage } from './pages/ParticipantPredictionsPage'
import { ConnectedParticipantScoreDetailedPage } from './pages/ParticipantScoreDetailedPage'
import { ConnectedPrizesPage } from './pages/PrizesPage'
import { ConnectedRulesPage } from './pages/RulesPage'
import { ConnectedAccountPage } from './pages/AccountPage'
import { ConnectedLoginPage } from './pages/LoginPage'
import { ConnectedPasswordResetPage } from './pages/PasswordResetPage'
import { ConnectedFooter } from './components/Footer'
import { ConnectedJoinPage } from './pages/JoinPage'
import ScrollToTop from './scrollToTop'

export const Main = () => (
    <Router history={history}>
        <Provider store={store}>
            <div>
                <ScrollToTop />
                <ConnectedNavigation />
                <Route exact path="/" render={() => (<ConnectedHomePage />)} />
                <Route path="/sign-in" render={() => (<ConnectedLoginPage />)} />
                <Route path="/sign-out" render={() => (<ConnectedLoginPage />)} />
                <Route path="/password-reset/:token" render={({ match }) => (<ConnectedPasswordResetPage match={match} />)} />
                <Route path="/results" render={() => (<ConnectedResultsPage />)} />
                <Route exact path="/participants" render={() => (<ConnectedParticipantsPage />)} />
                <Route exact path="/participants/:id" render={({ match }) => (<ConnectedParticipantPredictionsPage match={match} />)} />
                <Route exact path="/participants/score/:id" render={({ match }) => (<ConnectedParticipantScoreDetailedPage match={match} />)} />
                <Route path="/prizes" render={() => (<ConnectedPrizesPage />)} />
                <Route path="/rules" render={() => (<ConnectedRulesPage />)} />
                <Route path="/account" render={() => (<ConnectedAccountPage />)} />
                <Route path="/join" render={() => (<ConnectedJoinPage />)} />
                <ConnectedFooter />
            </div> 
        </Provider>
    </Router>
)

store.dispatch(getSessionStatus())
store.dispatch(getLocalStorageLanguage())
store.dispatch(getMongoData())
