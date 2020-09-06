import React from 'react'
import { connect } from 'react-redux'
import * as mutations from '../store/mutations'
import { signIn, signOut } from '../../Auth/Auth'

const AuthLoginComponent = ({ loggedUser }) => {

    return (
        <div>
            <div>
                {!loggedUser.profile && <button onClick={signIn}>Login</button>}
            </div>

            <div>
                {loggedUser.profile && (
                    <div>
                        <button onClick={signOut}>Logout</button>
                        <img src={loggedUser.profile.picture} />
                        <div>{loggedUser.profile.email}</div>
                    </div>
                )}
                {/* <h3>Logueate!</h3>
                <form onSubmit={requestAuthenticateUser}>
                    <input type="text" placeholder="username" name="username" />
                    <input type="password" placeholder="password" name="password"/>

                    {authenticated === mutations.NOT_AUTHENTICATED ? 
                        <p>Nombre de usuario on contraseña incorrectos</p> 
                        : null
                    }

                    <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                </form> */}
            </div>
        </div>
    )
}

const mapStateToProps = ({ loggedUser }) => ({
    loggedUser
})


export const ConnectedAuthLoginComponent = connect(mapStateToProps)(AuthLoginComponent)