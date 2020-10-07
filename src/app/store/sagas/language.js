import { take, put } from 'redux-saga/effects'
import * as mutations from '../mutations'


// ------ GET LANGUAGES FROM LOCAL STORAGE --- 

export function* getLocalStorageLanguageSaga() {
    while (true) {
        yield take(mutations.GET_LOCAL_STORAGE_LANGUAGE)

        const localStorageLanguage = localStorage.getItem("language")

        if (localStorageLanguage === "english" || localStorageLanguage === "spanish") {
            yield put(mutations.setLanguage(localStorageLanguage))
            yield put(mutations.setTranslations(localStorageLanguage))
        }
    }
}


// --------- SET LANGUAGE - COOKIE -----------
// This is needed so language selection is not lost when logging in

export function* setLanguageSaga() {
    while (true) {
        const { language } = yield take(mutations.SET_LANGUAGE)
        localStorage.setItem("language", language)
    }
}