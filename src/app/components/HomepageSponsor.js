import React from 'react'
import { connect } from 'react-redux'

const HomepageSponsor = ({ translations }) => (
    <div className="card my-5">
        <div className="card-body text-center">
            {translations.homepage.sponsoredBy}
        </div>
        <img class="card-img-bottom px-1" src="./images/JLD-Banner-1.jpg" alt="Card image cap"></img>
    </div>
)


const mapStateToProps = (state) => {
    let { translations } = state
    return { translations }
}

export const ConnectedHomepageSponsor = connect(mapStateToProps)(HomepageSponsor)