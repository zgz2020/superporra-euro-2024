import React from 'react'
import { connect } from 'react-redux'
import { emptyPrediction, groupsList } from '../../config'
import { ConnectedEuroMatch } from './EuroMatch'
import { ConnectedLeagueGroupContainer } from './LeagueGroupContainer'

const EuroStage = (ownProps) => (
    <div className="card">

        <div className="card-header">
            {ownProps.stageName}
        </div>

        <div className="card-body form-gorup pt-3">

            {ownProps.matchType === "league" ?

                <div key={ownProps.matchType}>
                    {groupsList.map(leagueGroup => (
                        <div key={leagueGroup}>
                            <ConnectedLeagueGroupContainer { ...ownProps} leagueGroup={leagueGroup} />
                        </div>
                    ))}
                </div>

                :
                                
                <div key={ownProps.matchType}>
                    {Object.keys(emptyPrediction[`${ownProps.matchType}Matches`]).map(match => (
                        <div key={match} className="pt-2 d-flex flex-row">
                            <ConnectedEuroMatch { ...ownProps } matchID={match} />
                        </div>
                    ))}
                </div>
            }

        </div>
    </div>
)


const mapStateToProps = (state, ownProps) => {
    return ownProps
}

export const ConnectedEuroStage = connect(mapStateToProps)(EuroStage)
