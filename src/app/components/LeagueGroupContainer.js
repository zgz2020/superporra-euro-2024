import React from 'react'
import { connect } from 'react-redux'
import { emptyPrediction } from '../../utils/config'
import { ConnectedEuroMatch } from './EuroMatch'
import { ConnectedGroupTable } from './GroupTable'


const LeagueGroupContainer = (ownprops) => (
    <div key={ownprops.leagueGroup}>
                        
        <div className="card">
            <div className="card-header">
                {"GROUP "}{ownprops.leagueGroup}
            </div>
            <div className="card-body">
                {Object.keys(emptyPrediction.leagueMatches).map(leagueMatch => (
                    <div key={leagueMatch}>
                        {emptyPrediction.leagueMatches[leagueMatch].group === ownprops.leagueGroup ? 
                            <ConnectedEuroMatch { ...ownprops } matchID={leagueMatch} />
                            : null
                        }
                    </div>
                ))}
            </div>
            <ConnectedGroupTable { ...ownprops } group={ownprops.leagueGroup}/>
        </div>
    
    </div>
)

const mapStateToProps = (state, ownProps) => ownProps

export const ConnectedLeagueGroupContainer = connect(mapStateToProps)(LeagueGroupContainer)