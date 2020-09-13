import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import * as mutations from '../../store/mutations'


let Callback = ({ loggedUser, handleAuthenticationCallback }) => { 
  if (loggedUser.userID) return <Redirect to={`/account`} />

  handleAuthenticationCallback()

  return <div className="text-center">Loading user profile.</div>
}

const mapStateToProps = state => {
  return {
    loggedUser: state.loggedUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleAuthenticationCallback() {
      dispatch(mutations.handleAuthenticationCallback())
    }
  }
}

export const ConnectedCallback = connect(mapStateToProps, mapDispatchToProps)(Callback)
