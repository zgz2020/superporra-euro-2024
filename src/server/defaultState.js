import 'dotenv/config';
import md5 from 'md5';
import { emptyPrediction } from '../utils/config';

export const defaultState = {
	session: {
		id: '',
		authenticated: '',
	},
	users: {
		byId: {},
		allIds: [],
	},
	predictions: {
		byId: {},
		allIds: [],
	},
	results: {
		id: 'officialResults',
		winner: '???',
		topScorer: '???',
		leastConceded: '???',
		leagueMatches: emptyPrediction.leagueMatches,
		r16Matches: emptyPrediction.r16Matches,
		quarterFinalMatches: emptyPrediction.quarterFinalMatches,
		semiFinalMatches: emptyPrediction.semiFinalMatches,
		finalMatches: emptyPrediction.finalMatches,
	},
};

// - - - - - - - - - - - - - - - - - - - -

export const defaultStateDOS = {
	users: [
		{
			id: process.env.ADMIN_USER_EMAIL,
			password: md5(process.env.ADMIN_USER_PASSWORD),
			role: 'admin',
		},
	],
	// predictions: [
	//     {
	//         ...emptyPrediction, owner: "U1"
	//     },
	//     {
	//         ...emptyPrediction, owner: "U2"
	//     }
	// ],
	// users: [],
	// predictions: [],
	results: [
		{
			id: 'officialResults',
			winner: emptyPrediction.winner,
			topScorer: emptyPrediction.topScorer,
			leastConceded: emptyPrediction.leastConceded,
			leagueMatches: emptyPrediction.leagueMatches,
			r16Matches: emptyPrediction.r16Matches,
			quarterFinalMatches: emptyPrediction.quarterFinalMatches,
			semiFinalMatches: emptyPrediction.semiFinalMatches,
			finalMatches: emptyPrediction.finalMatches,
		},
	],
};

export const normalizeDefaultStateMongo = (defaultStateMongo) => {
	let newStateMongoNorm = {
		users: {
			byId: {},
			allIds: [],
		},
		predictions: {
			byId: {},
			allIds: [],
		},
		results: {},
	};

	defaultStateMongo.users.forEach((user) => {
		newStateMongoNorm = {
			...newStateMongoNorm,
			users: {
				...newStateMongoNorm.users,
				byId: {
					...newStateMongoNorm.users.byId,
					[user.id]: {
						id: user.id,
						role: user.role,
					},
				},
				allIds: [...newStateMongoNorm.users.allIds, user.id],
			},
		};
	});

	defaultStateMongo.predictions.forEach((prediction) => {
		newStateMongoNorm = {
			...newStateMongoNorm,
			predictions: {
				...newStateMongoNorm.predictions,
				byId: {
					...newStateMongoNorm.predictions.byId,
					[prediction.id]: {
						id: prediction.id,
						owner: prediction.owner,
						username: prediction.username,
						privateLeague: prediction.privateLeague,
						winner: prediction.winner,
						topScorer: prediction.topScorer,
						leastConceded: prediction.leastConceded,
						leagueMatches: prediction.leagueMatches,
						r16Matches: prediction.r16Matches,
						quarterFinalMatches: prediction.quarterFinalMatches,
						semiFinalMatches: prediction.semiFinalMatches,
						finalMatches: prediction.finalMatches,
					},
				},
				allIds: [...newStateMongoNorm.predictions.allIds, prediction.id],
			},
		};
	});

	newStateMongoNorm = {
		...newStateMongoNorm,
		results: defaultStateMongo.results[0],
	};

	// defaultStateMongo.results[0]( $results => {
	//     newStateMongoNorm = {
	//         ...newStateMongoNorm,
	//         results: {
	//             winner: $results.winner,
	//             topScorer: $results.topScorer,
	//             leastConceded: $results.leastConceded,
	//             leagueMatches: $results.leagueMatches,
	//             r16Matches: $results.r16Matches,
	//             quarterFinalMatches: $results.quarterFinalMatches,
	//             semiFinalMatches: $results.semiFinalMatches,
	//             finalMatches: $results.finalMatches
	//         }
	//     }
	// })

	return newStateMongoNorm;
};
