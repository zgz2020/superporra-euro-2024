export const GET_LOCAL_STORAGE_LANGUAGE = 'GET_LOCAL_STORAGE_LANGUAGE'
export const SET_LANGUAGE = 'SET_LANGUAGE'
export const SET_TRANSLATIONS = 'SET_TRANSLATIONS'

export const getLocalStorageLanguage = () => ({
    type: GET_LOCAL_STORAGE_LANGUAGE
})

export const setLanguage = (language) => ({
    type: SET_LANGUAGE,
    language
})

export const setTranslations = (language) => ({
    type: SET_TRANSLATIONS,
    language
})