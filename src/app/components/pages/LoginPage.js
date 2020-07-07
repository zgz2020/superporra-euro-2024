import React from 'react'
import { connect } from 'react-redux'
import { ConnectedLoginComponent } from '../Login'

const LoginPage = () => {

    return <ConnectedLoginComponent />
}

const mapStateToProps = state => state

export const ConnectedLoginPage = connect(mapStateToProps)(LoginPage)