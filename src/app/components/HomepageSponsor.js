import React from 'react'
import { connect } from 'react-redux'

const HomepageSponsor = ({ translations }) => (
    <div className="card">
        <div className="card-body text-center">
            {translations.homepage.sponsoredBy}
        </div>
        <img className="card-img-bottom px-1" src="https://res.cloudinary.com/hjsnqmtbi/image/upload/v1619984978/JLD-Banner-2_copy_siuzdf.png" alt="Jelen Landon Designs"></img>
    </div>
)


const mapStateToProps = (state) => {
    let { translations } = state
    return { translations }
}

export const ConnectedHomepageSponsor = connect(mapStateToProps)(HomepageSponsor)