import React from 'react'
import { connect } from 'react-redux'
import { emptyPrediction, groupsList } from '../../utils/config'
import { ConnectedEuroMatch } from './EuroMatch'
import { ConnectedLeagueGroupContainer } from './LeagueGroupContainer'

const EuroStage = (ownProps) => (
    <div className="card" data-automation="euro-stage">

        <div className="card-header">
            {ownProps.stageName}
        </div>

        <div className="card-body pt-3">

            {ownProps.stage === "leagueMatches" ?

                <div key={ownProps.stage}>
                    {groupsList.map(leagueGroup => (
                        <div key={leagueGroup} className="pt-2">
                            <ConnectedLeagueGroupContainer { ...ownProps} leagueGroup={leagueGroup} />
                        </div>
                    ))}
                </div>

                :
                <div className="container">  
                    <div className="row justify-content-center">              
                        <div key={ownProps.stage} className="pb-4">
                            {Object.keys(emptyPrediction[ownProps.stage]).map(match => (
                                <div key={match} className="pt-2 pb-2 d-flex flex-row">
                                    <ConnectedEuroMatch { ...ownProps } matchID={match} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }

        </div>
    </div>
)


const mapStateToProps = (state, ownProps) => ownProps

export const ConnectedEuroStage = connect(mapStateToProps)(EuroStage)
