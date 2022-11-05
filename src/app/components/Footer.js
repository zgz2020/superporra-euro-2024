import React from 'react'
import { connect } from 'react-redux'

const Footer = ({ translations }) => (
    <footer className="card bg-light">
        <div className="text-center pt-4">
            <div>
                {`${translations.footer.contactUs}  `}
            </div>
            <a href="mailto:superporra.euro.2021@gmail.com">superporra.euro.2021@gmail.com</a>
        </div>
        <div className="footer-copyright text-center py-4">
            {"© 2022 Copyright:  Superporra World Cup 2022"}
        </div>
    </footer>
)

const mapStateToProps = (state) => {
    let { translations } = state
    return { translations }
}

export const ConnectedFooter = connect(mapStateToProps)(Footer)