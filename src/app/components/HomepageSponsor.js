import React from 'react'
import { connect } from 'react-redux'
import { sponsorName, sponsorLink } from '../../utils/sponsor'

const HomepageSponsor = ({ translations }) => (

    <div className="container">  
        <div className="row justify-content-center">  

            <div className="card col-md-8 col-lg-6 col-xl-5">
                <div className="card-body text-center">
                    {translations.homepage.sponsoredBy}
                </div>
                <a href={sponsorLink} target="_blank">
                    <img className="card-img-bottom px-1" src="https://res.cloudinary.com/hjsnqmtbi/image/upload/v1619984978/JLD-Banner-2_copy_siuzdf.png" alt={sponsorName}></img>
                </a>
            </div>

        </div>
    </div>
)


const mapStateToProps = (state) => {
    let { translations } = state
    return { translations }
}

export const ConnectedHomepageSponsor = connect(mapStateToProps)(HomepageSponsor)