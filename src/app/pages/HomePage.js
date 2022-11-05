import React from 'react'
import { connect } from 'react-redux'
import { ConnectedHeader } from '../components/Header'
import { ConnectedHomepageIntro } from '../components/HomepageIntro'
import { ConnectedHomepageJoin } from '../components/HomepageJoin'
import { ConnectedHomepagePrivateLeagues } from '../components/HomepagePrivateLeagues'
import { ConnectedHomepageSponsor } from '../components/HomepageSponsor'
import { ConnectedHomepageMyAccount } from '../components/HomepageMyAccount'
import { ConnectedCommentsBox } from '../components/CommentsBox'

const HomePage = ({ session, translations }) => (
    <div>
        <ConnectedHeader title={translations.homepage.title} />

        {!window.location.hostname.includes('loka-porra') && <ConnectedHomepageSponsor />}

        {session.id ?
            <ConnectedHomepageMyAccount />
            :
            <div>
                <ConnectedHomepageJoin />
                <ConnectedHomepagePrivateLeagues />
            </div>
        }

        <ConnectedCommentsBox />
        
    </div>
)

const mapStateToProps = (state) => {
    let { session, translations } = state

    return { 
        session,
        translations
    }
}

export const ConnectedHomePage = connect(mapStateToProps)(HomePage)