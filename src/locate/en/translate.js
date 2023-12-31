import { http, localhostPort } from '../../utils/common'

export const englishTranslations = {
    navigation: {
        home: "Home",
        join: "Join",
        participants: "Participants",
        results: "Results",
        prizes: "Prizes",
        scoringRules: "Rules",
        account: "Account",
        login: "Sign In",
        logout: "Sign Out"
    },
    footer: {
        contactUs: "Contact Us:"
    },
    homepage: {
        title: "Superporra Euro Cup 2024",
        sponsoredBy: "Sponsored By:",
        joinBanner: {
            title: "Join the Superporra in less than a minute!",
            body: {
                step: "STEP",
                "1.1": "Go to ",
                "1.2": "Join",
                "2": "Enter an email address, password and username, and Generate Random predictions (you will be able to edit your predictions afterwards if you wish)",
                "3": "Submit!"
            }
        },
        intro: {
            title: "Have fun with the Superporra Euro Cup 2024",
            body: {
                first: "The Superporra Euro Cup 2024 is a quiz or betting competition where participants will compete by trying to guess the final scores of all the Euro Cup 2024 matches, the countries that will qualify for the knockout stages (Round of 16, Quarter final, etc.) and the Euro champion.",
                second: "Have fun with the Superporra Euro Cup 2024, contribute to a good cause with your donation and get the chance to win a prize!"
            }
        },
        privateLeagues: {
            title: "Private championships",
            intro: "You can create a private championship with your friends or colleagues. You'll also take part in the global competition.",
            body: {
                step: "STEP",
                "1": "Sign up and submit your predictions",
                "2": "'My Championships' will now be available in Account page",
                "3": "Join one of the existent championships or crete a new one!"
            }
        },
        myAccount: {
            title: "My Account",
            description1: "Go to ",
            description2: " page to view and/or edit your predictions and private championships"
        }
    },
    joinPage: {
        alreadyJoined: {
            title: "You have already joined the competition",
            description1: "Go to ",
            description2: " page to review or edit your username or predictions.",
            description3: "You can also join or create a private Championship in "
        }
    },
    comments: {
        title: "Comments",
        placeholderUsername: "type your username",
        placeholderText: "type your comment here",
        success: "Your comment has been posted succesfully!",
        error: "You must enter a username (if logged out) and a comment"
    },
    signInPage: {
        title: "Sign In",
        email: "Email address",
        emailPlaceholder: "my@account.com",
        password: "Password",
        passwordNew: "New Password",
        passwordPlaceholder: "myPassword",
        signIn: "Sign In",
        noEmail: "You must enter a valid email address",
        emailNotRegistered: "Email address not registered. Please sign up",
        emailAlreadyRegistered: "Email address already registered",
        wrongPassword: "Password incorrect",
        noPassword: "You must enter a password",
        signUpHeader: "Don't have an account yet? Sign Up here!",
        joinDescription1: "Go to ",
        joinDescription2: " page, fill in the form and submit!",
        signUp: "Sign Up",
        forgotPasswordHeader: "Forgot your password? Reset it here",
        sendPasswordResetEmail: "Send password reset email",
        resetPasswordEmailSent: "Password reset email sent",
        resetPasswordEmailError: "There was an error. Please try again.",
        forgotPasswordEmailSubject: "Superporra - Reset your password",
        forgotPasswordEmailBody: (token, domain) => 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n'
            + 'Please click on the following link, or paste this into your browser, to complete the process within one hour of receiving it:\n\n'
            + `${http(domain)}://${domain}${localhostPort(domain)}/password-reset/${token}\n\n\n`
            + 'If you did not request this, please ignore this email and your password will emain unchanged.\n'
    },
    passwordResetPage: {
        title: "Password Reset",
        passwordResetTokenExpiredText: "The token to reset your password has expired.",
        passwordResetTokenExpiredButton: "Request a new token",
        resetButton: "Reset Password",
        resetPasswordSuccess: "Your password has been reset!",
        resetPasswordError: "There was an error. Please try again."
    },
    participantsPage: {
        title: "Superporra Participants",
        noParticipantsYet: "There are no particpants yet. Be the first one joining the competition by clicking on the 'Join' button!",
        noParticipantsYetPrivateLeague: "No participants have joined this Championship yet"
    },
    participantPredictionsPage: {
        title: "Predictions"
    },
    participantScoreDetailedPage: {
        title: "Scores"
    },
    scoringRulesPage: {
        title: "Scoring Rules"
    },
    resultsPage: {
        title: "Official Results"
    },
    prizesPage: {
        title: "Prizes",
        reward: (reward) => `${reward} voucher to spend on `,
        winner: {
            title: (reward) => `Winner - ${reward} voucher`,
            reward: "£30"
        },
        consolation: {
            title: (reward) => `Consolation (20th place) - ${reward} voucher`,
            reward: "£15"
        }
    },
    accountPage: {
        title: "My Account",
        joinedCompetitionSuccessfully: "You have succesfully joined the Superporra!",
        notSignedIn: {
            title: "Not Signed In",
            description: "You need to sign in to access to the Account page."
        },
        myBets: "My Bets",
        noBets: "You don't have any bets yet. Click on 'JOIN' button to create a bet and join the competition.",
        noPrivateLeagues: "You have not joined any private championships yet",
        privateLeagueIntro: "You can create a private championship with your friends or colleagues. You'll also take part in the global competition.",
        privateLeague: "Championship",
        joinLeague: "Join",
        joinLeagueIntro: "Join one of the existent championships",
        joinLeagueCreate: "Select 'Create' tab to create a new one",
        createLeague: "Create",
        createLeagueIntro: "Create a new championship",
        quitLeague: "Quit",
        quitLeagueIntro: "Quit the private championship and participate only in the global competition",
        createLeagueLabel: "Championship name",
        submit: "Submit",
        selectName: "Select Username",
        selectLeague: "Select Championship",
        joinLeagueError: "You must select a name and a championship",
        leagueNameTaken: "Championship name taken",
        quitLeagueError: "You must select a name",
        success: "Done!",
        username: "Username",
        myChampionships: "My Championships"
    },
    leaderboard: {
        global: "Global",
        privateLeagues: "Private Championships",
        name: "Name",
        score: "Score"
    },
    predictionsForm: {
        title: {
            new: "Join the Superporra by submitting your predictions",
            existent: "Update your predictions",
            results: "Update the official results"
        },
        description: {
            new: "Click on the 'Submit Predictions' button when you are ready.",
            existent: "Click on the 'Submit Updates' button when you are ready.",
            results: "Click on the 'Submit Updates' button when you are ready."
        },
        username: "Username",
        noUsernameAlert: "Fill in the 'Username' field",
        usernameTakenError: "Nickname already taken",
        predictions: "Predictions",
        group: "GROUP",
        team: "TEAM",
        pointsShort: "Pts",
        matchesPlayedShort: "P",
        goalsScoredShort: "F",
        goalsConcededShort: "A",
        euroWinner: "Winner",
        topScorer: "Top Scorer Team(s)",
        leastConceded: "Least Goals Conceded Team(s)",
        goal: "goal",
        goals: "goals",
        randomPredictionsGenerated: "Random predictions generated!",
        predictionsIncomplete: "You must provide predictions for all the matches to be able to submit them!"
    },
    participantScores: {
        result: "Result",
        groupShort: "Gr",
        homeGoalsShort: "GH",
        awayGoalsShort: "GA",
        matchWinnerShort: "WIN",
        goalsBonus: "GB",
        total: "TOTAL",
        groupTotal: "TOTAL - Gr ",
        matchShort: "M",
        qualifiedTeams: "Qualified Teams",
        points: "points",
        withBonus: "With bonus",
        noBonus: "No bonus",
        goalsScored: "Goals scored",
        goalsConceded: "Goals conceded"
    },
    stages: {
        groupStage: "Group Stage",
        r16: "Round of 16",
        r16Short: "R16",
        quarterFinals: "Quarter-finals",
        quarterFinalsShort: "QF",
        semiFinals: "Semi-finals",
        semiFinalsShort: "SF",
        final: "Final"
    },
    common: {
        join: "JOIN",
        update: "UPDATE",
        submitPredictions: "Submit Predictions",
        submitUpdates: "Submit Updates",
        cancel: "Cancel",
        generateRandomPredictions: "Generate Random Predictions",
        predictionsSubmitted: "Predictions submitted!",
        note: "Note",
        or: "or"
    },
    placeholders: {
        underConstruction: "Under Construction",
        loading: "Loading"
    },
    teamRules: {
        title: "SCORING RULES - TEAMS",
        rules: {
            a: {
                title: "Team score", 
                description: "The score of a team will be equal to the sum of the 4 highest individual scores (top 4 team members)."
            }
        }
    },
    generalRules: {
        title: "General Rules",
        rules: {
            1: {
                title: "Free",
                description: "You can participate in the Superporra 2024 for free. If you feel generous, please donate to any charity of your choice, or support our sponsor by buying any of their products: "
            },
            2: {
                title: "Deadlines",
                description: "The deadline to both join the Superporra 2024 and editing your predictions is Thursday the 10th of June 2024 (10th of June inclusive). No bets will be accepted after the 8th of June 2016."
            },
            3: {
                title: "Prizes",
                description: "Check the Prizes page to see the prizes donated by our sponsor: "
            }
        }
    },
    scoringRules: {
        title: "Scoring Rules",
        points: "pts",
        rules: {
            a: {
                title: "Goals Home",
                description: "10 points awarded for getting right the number of goals scored by the ‘Home’ team in a match. The ‘Home’ team will be the team that appears on the left side of the results table.",
                notes: {
                    1: "Even if you do not get the correct teams that play the Round of 16, Quarter-finals, etc. you will get points if you get the correct ‘Goals Home’ for those matches.",
                    2: "For the knock-out stages (Round of 16, Q/F, SF and Final), the ‘Goals Home’ will be the number of goals scored by the ‘Home’ team either after the official 90 minutes (if extra time is not needed) or after the 120 minutes (when extra time is needed). If penalties are needed after the extra time, they won’t count for the ‘Goals Home’ bet."
                },
                points: 10
            },
            b: {
                title: "Goals Away",
                description: "10 points awarded for getting right the number of goals scored by the ‘Away’ team in a match. The ‘Away’ team will be the team that appears on the right side of the results table.",
                notes: {
                    1: "Even if you do not get the correct teams that play the Round of 16, Quarter-finals, etc. you will get points if you get the correct ‘Goals Away’ for those matches.",
                    2: "For the knock-out stages (Round of 16, Q/F, SF and Final), the ‘Goals Away’ will be the number of goals scored by the ‘Away’ team either after the official 90 minutes (if extra time is not needed) or after the 120 minutes (when extra time is needed). If penalties are needed after the extra time, they won’t count for the ‘Goals Away’ bet."
                },
                points: 10
            },
            c: {
                title: "Match Winner/Draw",
                description: "10 points awarded for getting the correct winner of the match, or if there is a draw.",
                notes: {
                    1: "Match Winner/Draw points awarded for groups stage only"
                },
                points: 10
            },
            d: {
                title: "Goals Bonus",
                description: "5 extra points awarded for getting right both ‘Goals Home’ and ‘Goals Away’ in a knock-out stage match.",
                notes: {
                    1: "Goals Bonus points awarded for knock-out stages only",
                    2: "Even if you do not get the correct teams that play the Round of 16, Quarter-finals, etc. you will get points if you get the correct ‘Goals Home’ and ‘Goals Away’ for that match (Round of 16, Q/F, etc.)"
                },
                points: 5
            },
            e: {
                title: "Round of 16 - Teams",
                description: "Points awarded for getting right which teams qualify for the Round of 16; Points awarded for each team right.",
                notes: {
                    1: "10 points awarded for each qualified team which final position in the Groups stage matches with the actual results",
                    2: "5 points awarded for each qualified team which final position in the Groups stage does NOT match with the actual results"
                },
                points: [10, 5]
            },
            f: {
                title: "Quarter-finals - Teams",
                description: "Points awarded for getting right which teams qualify for the Quarter-finals; Points awarded for each team right.",
                notes: {
                    1: "15 points awarded for each qualified team."
                },
                points: 15
            },
            g: {
                title: "Semi-finals - Teams",
                description: "Points awarded for getting right which teams qualify for the Semi-finals; Points awarded for each team right.",
                notes: {
                    1: "20 points awarded for each qualified team."
                },
                points: 20
            },
            h: {
                title: "Final - Teams",
                description: "Points awarded for getting right which teams qualify for the Final; Points awarded for each team right.",
                notes: {
                    1: "25 points awarded for each qualified team."
                },
                points: 25
            },
            i: {
                title: "Euro Cup Winner",
                description: "40 points awarded for getting right the Euro Cup Winner.",
                points: 40
            },
            j: {
                title: "Top Scorer",
                description: "25 points awarded for getting right the top scorer team of the tournament.",
                notes: {
                    1: "The 'Top Scorer' will be the team or teams that score the highest amount of goals in the tournament (without counting penalty shoot-out), regardless of the number of matches played.",
                    2: "All the participants that have selected any of the 'Top Scorer' teams will get 25 points."
                },
                points: 25
            },
            k: {
                title: "Least goals conceded",
                description: "25 points awarded for getting right the team of the tournament with least goals conceded.",
                notes: {
                    1: "The 'Least goals conceded' will be the team or teams that concede the lowest amount of goals in the tournament (without counting penalty shoot-out), regardless of the number of matches played.",
                    2: "All the participants that have selected any of the 'Least goals conceded' teams will get 25 points."
                },
                points: 25
            },
            l: {
                title: "DL Coef",
                description: "A 'deadlock coefficient' will be applied in case two or more players get the same number of points at the end of the competition. This deadlock coefficient will be calculated according to the following criteria:",
                notes: {
                    1: "Euro Cup Winner: If two or more participants have got the same amount of points at the end of the competition, that one who got right the Euro Cup Winner will be on top.",
                    2: "Teams playing the final (highest number of teams guessed): If the draw still persists after point 1, the participant who got right the teams that qualified for the final (highest number of teams right) will be on top.",
                    3: "Euro Cup runner-up: If the draw still persists after points 1 and 2, the participant who got right the Euro Cup runner-up will be on top.",
                    4: "Final match score (before penalty shoot-out): If the draw still persists after points 1, 2 and 3, the participant who got right the Final match score (exact number of goals scored by both teams before penalty shoot-out) will be on top.",
                    5: "Top scorer team: If the draw still persists after points 1, 2, 3 and 4, the participant who got right one of the Top Scorer teams will be on top.",
                    6: "Least Goals conceded team: If the draw still persists after points 1, 2, 3, 4 and 5, the participant who got right one of the teams that conceded the lowest amount of goals will be on top.",
                    7: "Teams playing the SEMI-FINALS (highest number of teams guessed): If the draw still persists after points 1, 2, 3, 4, 5 and 6, the participant who got right the teams that qualified for the semi-finals (highest number of teams right) will be on top.",
                    8: "Teams playing the QUARTER-FINALS (highest number of teams guessed): If the draw still persists after points 1, 2, 3, 4, 5, 6 and 7, the participant who got right the teams that qualified for the quarter-finals (highest number of teams right) will be on top.",
                    9: "Alphabetical order: If the draw still persists after points 1, 2, 3, 4, 5, 6, 7 and 8, the participants will be sorted by alphabetical order."
                }
            }
        }
    }
}