import React from 'react'
import { connect } from 'react-redux'
import { ConnectedTeamScore } from './TeamScore'

const EuroMatch = (ownProps) => (
    <div className="d-flex flex-row p-0">
        <ConnectedTeamScore { ...ownProps } team="home" />  
        <div className="p-1">{"-"}</div>
        <ConnectedTeamScore { ...ownProps } team="away" />       
    </div>
)

const mapStateToProps = (state, ownProps) => ownProps

export const ConnectedEuroMatch = connect(mapStateToProps)(EuroMatch)