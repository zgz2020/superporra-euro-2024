import React from 'react'
import { connect } from 'react-redux'
import { emptyPrediction } from '../../utils/config'
import { ConnectedEuroMatch } from './EuroMatch'
import { ConnectedGroupTable } from './GroupTable'


const LeagueGroupContainer = (ownprops) => (
    <div className="container">
        <div key={ownprops.leagueGroup} className="row no-gutters justify-content-center">
            <div className="col-md-6 col-lg-5 col-xl-4 mt-3">
                <strong>{`${ownprops.translations.predictionsForm.group} ${ownprops.leagueGroup}`}</strong>
                {Object.keys(emptyPrediction.leagueMatches).map(leagueMatch => (
                    <div key={leagueMatch}>
                        {emptyPrediction.leagueMatches[leagueMatch].group === ownprops.leagueGroup ? 
                            <ConnectedEuroMatch { ...ownprops } matchID={leagueMatch} />
                            : null
                        }
                    </div>
                ))}
            </div>
            <div className="col-sm-4 col-lg-4 col-xl-3 mt-3">
                <ConnectedGroupTable { ...ownprops } group={ownprops.leagueGroup}/>
            </div>
            
        </div>
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