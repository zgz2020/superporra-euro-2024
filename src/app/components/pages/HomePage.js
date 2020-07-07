import React from 'react'
import { ConnectedHeader } from '../Header'

export const HomePage = () => (
    <div>
        <h2 className="jumbotron">
            <ConnectedHeader title="Superporra 2021"/>
        </h2>
        <div className="card mx-auto" style={{width: "16rem"}}>
            <div className="card-header text-center">
                EN CONSTRUCCIÓN
            </div>
        </div>
    </div>
)