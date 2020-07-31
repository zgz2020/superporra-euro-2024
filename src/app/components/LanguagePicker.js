import React from 'react'
import * as mutations from '../store/mutations'
import { connect } from 'react-redux'

const LanguagePicker = ({ languageChangeHandler }) => (
    <select onChange={languageChangeHandler} data-automation="language-picker">
        <option key="english" value="english">English</option>
        <option key="spanish" value="spanish">Español</option>
    </select>
)

const mapStateToProps = (state, props) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        languageChangeHandler(event) {
            dispatch(mutations.setLanguage(event.target.value))
            dispatch(mutations.setTranslations(event.target.value))
        }
    }
}
export const ConnectedLanguagePicker = connect(mapStateToProps, mapDispatchToProps)(LanguagePicker)
