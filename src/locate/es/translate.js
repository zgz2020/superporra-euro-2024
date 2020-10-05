export const spanishTranslations = {
    navigation: {
        home: "Inicio",
        participants: "Participantes",
        results: "Resultados",
        scoringRules: "Normas puntuación",
        account: "Cuenta",
        login: "Mi cuenta",
        logout: "Cerrar"
    },
    homepage: {
        title: "Superporra Eurocopa 2021"
    },
    signIn: {
        email: "Correo electrónico",
        emailPlaceholder: "mi@cuenta.com",
        password: "Clave",
        passwordPlaceholder: "miClave",
        signIn: "Iniciar sesión",
        wrongCredentials: "Dirección o clave erróneas"
    },
    participantsPage: {
        title: "Paticipantes de la Superporra",
        noParticipantsYet: "Todavía no hay ningún participante. ¡Se el primero en participar haciendo click en el botón 'PARTICIPAR'!"
    },
    participantPredictionsPage: {
        title: "Predicciones"
    },
    participantScoreDetailedPage: {
        title: "Puntuaciones"
    },
    scoringRulesPage: {
        title: "Normas de Puntuación"
    },
    resultsPage: {
        title: "Resultados Oficiales"
    },
    accountPage: {
        title: "Mi cuenta",
        notSignedIn: {
            title: "Sesión no iniciada",
            description: "Tienes que iniciar sesión para acceder a tu cuenta. Para iniciar sesión, haz click en la opción 'Mi cuenta' del menú principal."
        },
        myBets: "Mis apuestas",
        noBets: "Aún no tienes ninguna apuesta. Haz click en el botón 'PARTICIPAR' para crear tus apuestas."
    },
    leaderboard: {
        name: "Nombre",
        score: "Puntuación"
    },
    predictionsForm: {
        title: {
            new: "Participa en la superporra mandando tus predicciones",
            existent: "Actualiza tus predicciones",
            results: "Actualiza los resultados oficiales"
        },
        description: {
            new: "Haz click en el botón 'Mandar Predicciones' cuando hayas acabado.",
            existent: "Haz click en el botón 'Mandar Actualizaciones' cuando hayas acabado.",
            results: "Haz click en el botón 'Mandar Actualizaciones' cuando hayas acabado."
        },
        username: "Nombre de usuario",
        noUsernameAlert: "Introduce un nombre de usuario",
        predictions: "Predicciones",
        group: "GRUPO",
        team: "EQUIPO",
        pointsShort: "PT",
        matchesPlayedShort: "PJ",
        goalsScoredShort: "GF",
        goalsConcededShort: "GC",
        euroWinner: "Campeón",
        topScorer: "Máximo goleador",
        leastConceded: "Menos goleado",
        goal: "gol",
        goals: "goles"
    },
    participantScores: {
        result: "Res",
        groupShort: "Gr",
        homeGoalsShort: "GA",
        awayGoalsShort: "GV",
        matchWinnerShort: "1X2",
        goalsBonus: "BG",
        total: "TOTAL",
        groupTotal: "TOTAL - Gr ",
        matchShort: "P",
        qualifiedTeams: "Equipos clasificados",
        points: "puntos",
        withBonus: "Con bonus",
        noBonus: "Sin bonus",
        goalsScored: "Goles marcados",
        goalsConceded: "Goles encajados"
    },
    stages: {
        groupStage: "Fase de grupos",
        r16: "Octavos",
        r16Short: "OF",
        quarterFinals: "Cuartos de final",
        quarterFinalsShort: "CF",
        semiFinals: "Semifinales",
        semiFinalsShort: "SF",
        final: "Final"
    },
    common: {
        join: "PARTICIPAR",
        update: "ACTUALIZAR",
        submitPredictions: "Mandar Predicciones",
        submitUpdates: "Mandar Actualizaciones",
        cancel: "Cancelar",
        generateRandomPredictions: "Generar Predicciones Aleatorias",
        predictionsSubmitted: "¡Se han enviado tus predicciones!",
        note: "Nota",
        or: "o"
    },
    placeholders: {
        underConstruction: "En construcción",
        loading: "Cargando"
    },
    teamRules: {
        title: "PUNTUACIÓN - EQUIPOS",
        rules: {
            a: {
                title: "Puntuación por equipos", 
                description: "La puntuación de un equipo será igual a la suma de las 5 mejores puntuaciones individuales de ese equipo."
            }
        }
    },
    individualsRules: {
        title: "PUNTUACIÓN - INDIVIDUALES",
        rules: {
            a: {
                title: "Goles Anfitrión",
                description: "Aquellos participantes que acierten el número de goles que el equipo anfitrión marca en un partido se llevarán 5 puntos. El equipo anfitrión será el que aparezca a la izquierda en la tabla de resultados.",
                notes: {
                    1: "No es necesario acertar los equipos que llegarán a las fases eliminatorias (octavos de final, cuartos de final, semifinales y final) para poder obtener puntos por acertar los goles marcados por el equipo anfitrión en dichos partidos.",
                    2: "Durante las fases eliminatorias (octavos de final, cuartos de final, semifinal y final), los 'Goles Anfitrión' se basarán en el número de goles marcados por el equipo anfitrión, ya sea después de los 90 minutos oficiales (cuando no se necesite prórroga) o después de los 120 minutos oficiales (cuando sí se necesite prórroga). En el caso de que un partido acabe en penaltis, estos no contarán en la apuesta 'Goles Anfitrión'."
                },
                points: 5
            },
            b: {
                title: "Goles Visitante",
                description: "Aquellos participantes que acierten el número de goles que el equipo visitante marca en un partido se llevarán 5 puntos. El equipo visitante será el que aparezca a la derecha en la tabla de resultados.",
                notes: {
                    1: "No es necesario acertar los equipos que llegarán a las fases eliminatorias (octavos de final, cuartos de final, semifinales y final) para poder obtener puntos por acertar los goles marcados por el equipo visitante en dichos partidos.",
                    2: "Durante las fases eliminatorias (octavos de final, cuartos de final, semifinal y final), los 'Goles Visitante' se basarán en el número de goles marcados por el equipo visitante, ya sea después de los 90 minutos oficiales (cuando no se necesite prórroga) o después de los 120 minutos oficiales (cuando sí se necesite prórroga). En el caso de que un partido acabe en penaltis, estos no contarán en la apuesta 'Goles Visitante'."
                },
                points: 5
            },
            c: {
                title: "1X2",
                description: "Aquellos participantes que acierten el ganador de un partido o, en su defecto, un empate, se llevarán 10 puntos.",
                notes: {
                    1: "Solo para la fase de grupos."    
                },
                points: 10
            },
            d: {
                title: "Bonus por Goles",
                description: "Aquellos participantes que acierten tanto el número de goles que marca el equipo anfitrión como el visitante se llevarán 5 puntos más como bonus.",
                notes: {
                    1: "Solo para las fases eliminatorias.",
                    2: "No es necesario acertar los equipos que llegarán a las fases eliminatorias (octavos de final, cuartos de final, semifinales y final) para poder conseguir el 'Bonus por Goles'."
                },
                points: 5
            },
            e: {
                title: "Octavos - Equipos clasificados",
                description: "Aquellos participantes que acierten los equipos que pasan a los octavos se llevarán puntos por cada equipo acertado.",
                notes: {
                    1: "10 puntos por cada equipo acertado para el que también se acierte su posición final en la fase de grupos.",
                    2: "5 puntos por cada equipo acertado para el que NO se acierte su posición final en la fase de grupos."
                },
                points: [10, 5]
            },
            f: {
                title: "Cuartos de final - Equipos clasificados",
                description: "Aquellos participantes que acierten los equipos que pasan a los cuartos de final se llevarán puntos por equipo acertado.",
                notes: {
                    1: "15 puntos por cada equipo acertado."
                },
                points: 15
            },
            g: {
                title: "Semifinales - Equipos clasificados",
                description: "Aquellos participantes que acierten los equipos que pasan a las semifinales se llevarán puntos por equipo acertado.",
                notes: {
                    1: "20 puntos por cada equipo acertado."
                },
                points: 20
            },
            h: {
                title: "Final - Equipos clasificados",
                description: "Aquellos participantes que acierten los equipos que pasan a la final se llevarán puntos por equipo acertado.",
                notes: {
                    1: "25 puntos por cada equipo acertado."
                },
                points: 25
            },
            i: {
                title: "Ganador de la Eurocopa",
                description: "Aquellos participantes que acierten el equipo ganador de la Eurocopa se llevarán 40 puntos.",
                points: 40
            },
            j: {
                title: "Máximo goleador",
                description: "Aquellos participantes que acierten el equipo que más goles marque durante el torneo se llevarán 25 puntos.",
                notes: {
                    1: "El 'máximo goleador' será aquel o aquellos equipos que marquen el mayor número de goles durante el torneo sin contar las tandas de penaltis y sin importar cuántos partidos hayan jugado.",
                    2: "Todos los participantes que hayan acertado alguno de los equipos con más goles se llevarán 25 puntos."
                },
                points: 25
            },
            k: {
                title: "Menos goleado",
                description: "Aquellos participantes que acierten el equipo menos goleado del torneo se llevarán 25 puntos.",
                notes: {
                    1: "El 'menos goleado' será aquel o aquellos equipos que concedan el menor número de goles durante el torneo sin contar las tandas de penaltis y sin importar cuántos partidos hayan jugado.",
                    2: "Todos los participantes que hayan acertado alguno de los equipos menos goleados se llevarán 25 puntos."
                },
                points: 25
            },
            l: {
                title: "Coeficiente de desempate",
                description: "En el caso de que dos o más participantes obtengan el mismo número de puntos al final de la competición se aplicará un coeficiente de desempate. Este coeficiente se calculará de acuerdo a los siguientes criterios:",
                notes: {
                    1: "Ganador de la Eurocopa: Si dos o más participantes tienen el mismo número de puntos al final del campeonato, el participante que haya acertado el ganador de la Eurocopa de fútbol estará por encima de los otros participantes con la misma puntuación.",
                    2: "Equipos que juegan la final (mayor número de equipos acertado): Si el empate todavía persiste tras el punto anterior (1), el participante que haya acertado los equipos que juegan la final (mayor número de equipos) estará por encima de los otros participantes con la misma puntuación.",
                    3: "Subcampeón de la Eurocopa: Si el empate todavía persiste tras los puntos anteriores (1 y 2), el participante que haya acertado el subcampeón de la Eurocopa de fútbol estará por encima de los otros participantes con la misma puntuación.",
                    4: "Resultado de la final (antes de los penaltis): Si el empate todavía persiste tras los puntos anteriores (1, 2 y 3), el participante que haya acertado el resultado de la final (número exacto de goles marcado por cada uno de los equipos antes de la tanda de penaltis) estará por encima de los otros participantes con la misma puntuación.",
                    5: "Máximo goleador (equipo): Si el empate todavía persiste tras los puntos anteriores (1, 2, 3 y 4), el participante que haya acertado el equipo máximo goleador de la Eurocopa estará por encima de los otros participantes con la misma puntuación.",
                    6: "Menos goleado (equipo): Si el empate todavía persiste tras los puntos anteriores (1, 2, 3, 4 y 5), el participante que haya acertado el equipo menos goleado de la Eurocopa estará por encima de los otros participantes con la misma puntuación.",
                    7: "Equipos que juegan las semifinales (mayor número de equipos acertado): Si el empate todavía persiste tras los puntos anteriores (1, 2, 3, 4, 5 y 6), el participante que haya acertado los equipos que juegan las semifinales (mayor número de equipos) estará por encima de los otros participantes con la misma puntuación.",
                    8: "Equipos que juegan los cuartos de final (mayor número de equipos acertado): Si el empate todavía persiste tras los puntos anteriores (1, 2, 3, 4, 5, 6 y 7), el participante que haya acertado los equipos que juegan los cuartos de final (mayor número de equipos) estará por encima de los otros participantes con la misma puntuación.",
                    9: "Orden alfabético: Si el empate todavía persiste tras los puntos anteriores (1, 2, 3, 4, 5, 6, 7 y 8), los participantes con la misma puntuación serán ordenados alfabéticamente en la clasificación."
                }
            }
        }
    }
}
