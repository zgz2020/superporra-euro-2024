import React from 'react'
import * as mutations from '../store/mutations'
import { connect } from 'react-redux'

const LanguagePicker = ({ language, languageChangeHandler }) => (
    <select onChange={languageChangeHandler} data-automation="language-picker" value={language}>
        <option key="english" value="english">English</option>
        <option key="spanish" value="spanish">Español</option>
    </select>
)

const mapStateToProps = (state) => {
    let { language } = state

    return {
        language
    }
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
