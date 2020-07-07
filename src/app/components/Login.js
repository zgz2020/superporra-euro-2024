import React from 'react'
import { connect } from 'react-redux'
import * as mutations from '../store/mutations'

const LoginComponent = ({ requestAuthenticateUser, authenticated }) => {

    return (
        <div>
            <h3>Logueate!</h3>
            <form onSubmit={requestAuthenticateUser}>
                <input type="text" placeholder="username" name="username" />
                <input type="password" placeholder="password" name="password"/>

                {authenticated === mutations.NOT_AUTHENTICATED ? 
                    <p>Nombre de usuario on contraseña incorrectos</p> 
                    : null
                }

                <button type="submit" className="btn btn-primary">Iniciar sesión</button>
            </form>
        </div>
    )
}

const mapStateToProps = ({ session }) => ({
    authenticated: session.authenticated
})

const mapDispatchToProps = dispatch => ({
    requestAuthenticateUser(event) {
        event.preventDefault()

        let username = event.target['username'].value
        let password = event.target['password'].value

        dispatch(mutations.requestAuthenticateUser(username, password))
    }
})

export const ConnectedLoginComponent = connect(mapStateToProps, mapDispatchToProps)(LoginComponent)