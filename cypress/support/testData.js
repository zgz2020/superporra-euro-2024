export const viewports = ['macbook-15', 'iphone-6']

export const languages = ['english', 'spanish']

export const registeredUser = {
    email: "automated@test.com",
    password: "testing"
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
        navItem4: 'Scoring Rules',
        navItem5A: 'Sign In',
        navItem5B: 'Account',
        navItem6: 'Sign Out'
    }
    :
    {
        navItem1: 'Inicio',
        navItem2: 'Participantes',
        navItem3: 'Resultados',
        navItem4: 'Normas puntuación',
        navItem5A: 'Mi cuenta',
        navItem5B: 'Cuenta',
        navItem6: 'Cerrar'
    }
