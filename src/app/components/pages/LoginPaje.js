import React from 'react'
import { connect } from 'react-redux'
import * as mutations from '../../store/mutations'

const signIn = (requestAuthenticateUser, authenticated) => (
    <form onSubmit={requestAuthenticateUser}>

        {"Email address:"}
        <input 
            type="text" 
            placeholder="email address"
            name="emailAddress"
            className="form-control" 
            data-automation="email-address-input"
        />

        {"Password:"}
        <input 
            type="password" 
            placeholder="password"
            name="password"
            className="form-control" 
            data-automation="password-input"
        />

        {authenticated === mutations.NOT_AUTHENTICATED ? 
            <p>Login incorrect</p>
            :
            null
        }

        <button 
            type="submit" 
            // disabled={authenticated === `PROCESSING`} 
            className="form-control mt-2 btn btn-primary"
        >
            Login
        </ button>

    </ form>
)

const LoginPage = ({ requestAuthenticateUser, authenticated }) => (
    <div>
        Aquí se hará el login
        {signIn(requestAuthenticateUser, authenticated)}
    </div>
)

const mapStateToProps = (state) => {
    let { session } = state
    let authenticated = session.authenticated
    
    return {
        authenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestAuthenticateUser(e) {
            e.preventDefault()
            let emailAddress = e.target['emailAddress'].value
            let password = e.target['password'].value
            dispatch(mutations.requestAuthenticateUser(emailAddress, password))
        }
    }
}

export const ConnectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage)
