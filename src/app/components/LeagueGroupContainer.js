import React from 'react'
import { connect } from 'react-redux'
import { emptyPrediction } from '../../utils/config'
import { ConnectedEuroMatch } from './EuroMatch'
import { ConnectedGroupTable } from './GroupTable'


const LeagueGroupContainer = (ownprops) => (
    <div key={ownprops.leagueGroup} >
        <strong>{`${ownprops.translations.predictionsForm.group} ${ownprops.leagueGroup}`}</strong>
        {Object.keys(emptyPrediction.leagueMatches).map(leagueMatch => (
            <div key={leagueMatch}>
                {emptyPrediction.leagueMatches[leagueMatch].group === ownprops.leagueGroup ? 
                    <ConnectedEuroMatch { ...ownprops } matchID={leagueMatch} />
                    : null
                }
            </div>
        ))}
        <ConnectedGroupTable { ...ownprops } group={ownprops.leagueGroup}/>
        <hr />
    </div>
)

const mapStateToProps = (state, ownProps) => {
    let { translations } = state
    return {
        ...ownProps,
        translations
    }
}

export const ConnectedLeagueGroupContainer = connect(mapStateToProps)(LeagueGroupContainer)