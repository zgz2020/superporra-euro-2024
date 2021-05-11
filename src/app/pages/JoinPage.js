import React from 'react'
import { connect } from 'react-redux'
import { ConnectedHeader } from '../components/Header'
import { Link } from 'react-router-dom'
import { ConnectedHomepageSponsor } from '../components/HomepageSponsor'
import { ConnectedPredictionsForm } from '../components/PredictionsForm'

const JoinPage = ({ 
    session,
    newPrediction,
    translations 
}) => (
    <div className="mb-5">
        <ConnectedHeader title={translations.homepage.title} />

        <ConnectedHomepageSponsor />

        <div className="my-5"></div>

        {session.id ?
            <div className="card lead">
                <div className="card-header">
                    {translations.joinPage.alreadyJoined.title}
                </div>
                <div className="card-body">
                {translations.joinPage.alreadyJoined.description1}
                <Link 
                    to={"/account"}
                    data-automation="account-link"
                >
                    {translations.navigation.account}
                </Link>
                {translations.joinPage.alreadyJoined.description2}
                <br />
                {translations.joinPage.alreadyJoined.description3}
                <Link 
                    to={"/account"}
                    data-automation="account-link"
                >
                    {translations.navigation.account}
                </Link>
                </div>
            </div>
            :
            <ConnectedPredictionsForm predictionType="new" predictionsOrResults={newPrediction} /> 
        }
    </div>
)

const mapStateToProps = (state) => {
    let { 
        session,
        newPrediction,
        translations,
    } = state

    return {
        session,
        newPrediction,
        translations
    }
}

export const ConnectedJoinPage = connect(mapStateToProps)(JoinPage)