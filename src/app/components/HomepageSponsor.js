import React from 'react'
import { connect } from 'react-redux'

const HomepageSponsor = ({ translations }) => (
    <div className="card">
        <div className="card-body text-center">
            {translations.homepage.sponsoredBy}
        </div>
        <img className="card-img-bottom px-1" src="src/images/JLD-Banner-2.png" alt="Jelen Landon Designs"></img>
    </div>
)


const mapStateToProps = (state) => {
    let { translations } = state
    return { translations }
}

export const ConnectedHomepageSponsor = connect(mapStateToProps)(HomepageSponsor)