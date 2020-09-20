import * as mutations from '../mutations'
import { englishTranslations } from '../../../locate/en/translate'
import { spanishTranslations } from '../../../locate/es/translate'

export const language = (language = "english", action) => {
    switch (action.type) {
        case mutations.SET_LANGUAGE:
            return action.language
    }
    return language
}

export const translations = (translations = englishTranslations, action) => {
    switch (action.type) {
        case mutations.SET_TRANSLATIONS:
            return action.language === "english" ? englishTranslations : spanishTranslations
    }
    return translations
}