import React from 'react'
import { connect } from 'react-redux'

const Header = ( {title } ) => (
    <h2 data-automation="page-header" className="jumbotron">{title} </h2>
)

const mapStateToProps = (state, ownProps) => {
    return {
        title: ownProps.title
    }
}

export const ConnectedHeader = connect(mapStateToProps)(Header)