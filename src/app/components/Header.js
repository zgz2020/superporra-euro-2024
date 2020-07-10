import React from 'react'
import { connect } from 'react-redux'

const Header = ( {title } ) => (
    <div>
        <h2 data-automation="page-header">{title}</ h2>
    </div>
)

const mapStateToProps = (state, ownProps) => {
    return {
        title: ownProps.title
    }
}

export const ConnectedHeader = connect(mapStateToProps)(Header)