export const viewports = ['macbook-15', 'iphone-6']

export const languages = ['english', 'spanish']

export const registeredUser = {
    email: "automated@test.com",
    password: "testing"
}

export const registeredUserNoPredictions = {
    email: "automated-no-predictions@test.com",
    password: "test1234"
}

export const adminUser = {
    email: "admin",
    password: "admin"
}

export const passwordResetUser = 'password-reset-auto-test@test.com'

export const expiredToken = '49019c44-2356-4a10-9e40-cf706040d62c'

export const validToken = 'd379afd8-c531-4537-a609-da4f667798fb'

export const myAccountAssertions = (language) => language == 'english' ?
    { 
        myBetsHeader: "My Bets",
        noBetsYetText: "You don't have any bets yet",
        joinInputFormHeader: "Join the Superporra",
        updateInputFormHeader: "Update your predictions",
        noUsernameAlert: "Fill in the 'Username' field",
        predictionsHeader: "Predictions:",
        predictionsHeaderWithParticipantName: "Predictions: ZZ Test Participant",
        scoresHeader: "Scores:"
    }
    :
    {
        myBetsHeader: "Mis apuestas",
        noBetsYetText: "Aún no tienes ninguna apuesta",
        joinInputFormHeader: "Participa en la superporra",
        updateInputFormHeader: "Actualiza tus predicciones",
        noUsernameAlert: "Introduce un nombre de usuario",
        predictionsHeader: "Predicciones:",
        predictionsHeaderWithParticipantName: "Predicciones: ZZ Test Participant",
        scoresHeader: "Puntuaciones:"
    }

export const navigationAssertions = language => language == 'english' ?
    { 
        navItem1: 'Home',
        navItem2: 'Participants',
        navItem3: 'Results',
        navItem4: 'Prizes',
        navItem5: 'Scoring Rules',
        navItem6A: 'Sign In',
        navItem6B: 'Account',
        navItem7: 'Sign Out'
    }
    :
    {
        navItem1: 'Inicio',
        navItem2: 'Participantes',
        navItem3: 'Resultados',
        navItem4: 'Premios',
        navItem5: 'Normas puntuación',
        navItem6A: 'Mi cuenta',
        navItem6B: 'Cuenta',
        navItem7: 'Cerrar'
    }

export const passwordResetAssertions = language => language == 'english' ? 
    {
        tokenExpired: 'The token to reset your password has expired'
    }
    :
    {
        tokenExpired: 'El token para actualizar tu contrseña ha expirado'
    }

export const resultsAssertions = language => language == 'english' ?
    {
        officialResults: 'Official Results',
        updateResults: 'Update the official results'
    }
    :
    {
        officialResults: 'Resultados Oficiales',
        updateResults: 'Actualiza los resultados oficiales'
    }

export const signInAssertions = language => language == 'english' ? 
    {
        signUp: 'Sign Up'
    }
    :
    {
        signUp: 'Crear cuenta'
    }