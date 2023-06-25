import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

type LeagueMatch = {
	id: string;
	homeGoals: string;
	awayGoals: string;
	group: string;
	homeTeam: string;
	awayTeam: string;
};

type leagueMatches = {
	1: LeagueMatch;
	2: LeagueMatch;
	3: LeagueMatch;
	4: LeagueMatch;
	5: LeagueMatch;
	6: LeagueMatch;
	7: LeagueMatch;
	8: LeagueMatch;
	9: LeagueMatch;
	10: LeagueMatch;
	11: LeagueMatch;
	12: LeagueMatch;
	13: LeagueMatch;
	14: LeagueMatch;
	15: LeagueMatch;
	16: LeagueMatch;
	17: LeagueMatch;
	18: LeagueMatch;
	19: LeagueMatch;
	20: LeagueMatch;
	21: LeagueMatch;
	22: LeagueMatch;
	23: LeagueMatch;
	24: LeagueMatch;
	25: LeagueMatch;
	26: LeagueMatch;
	27: LeagueMatch;
	28: LeagueMatch;
	29: LeagueMatch;
	30: LeagueMatch;
	31: LeagueMatch;
	32: LeagueMatch;
	33: LeagueMatch;
	34: LeagueMatch;
	35: LeagueMatch;
	36: LeagueMatch;
	37: LeagueMatch;
	38: LeagueMatch;
	39: LeagueMatch;
	40: LeagueMatch;
	41: LeagueMatch;
	42: LeagueMatch;
	43: LeagueMatch;
	44: LeagueMatch;
	45: LeagueMatch;
	46: LeagueMatch;
	47: LeagueMatch;
	48: LeagueMatch;
};

type KnockOutMatch = {
	id: string;
	homeGoals: string;
	awayGoals: string;
	homeTeam: string;
	awayTeam: string;
};

type r16Matches = {
	1: KnockOutMatch;
	2: KnockOutMatch;
	3: KnockOutMatch;
	4: KnockOutMatch;
	5: KnockOutMatch;
	6: KnockOutMatch;
	7: KnockOutMatch;
	8: KnockOutMatch;
};

type quarterFinalMatches = {
	1: KnockOutMatch;
	2: KnockOutMatch;
	3: KnockOutMatch;
	4: KnockOutMatch;
};

type semiFinalMatches = {
	1: KnockOutMatch;
	2: KnockOutMatch;
};

export type Prediction = {
	owner?: string;
	username?: string;
	winner?: string;
	topScorer?: string;
	leastConceded?: string;
	leagueMatches?: leagueMatches;
	r16Matches?: r16Matches;
	quarterFinalMatches?: quarterFinalMatches;
	semiFinalMatches?: semiFinalMatches;
	finalMatches?: KnockOutMatch;
};

const randomNumberOfGoals = () =>
	faker.number
		.int({
			min: 0,
			max: 9,
		})
		.toString();

const leagueGroups = {
	A: ['Ecuador', 'Netherlands', 'Qatar', 'Senegal'],
	B: ['England', 'Iran', 'USA', 'Wales'],
	C: ['Argentina', 'Mexico', 'Poland', 'Saudi Arabia'],
	D: ['Australia', 'Denmark', 'France', 'Tunisia'],
	E: ['Costa Rica', 'Germany', 'Japan', 'Spain'],
	F: ['Belgium', 'Canada', 'Croatia', 'Morocco'],
	G: ['Brazil', 'Cameroon', 'Serbia', 'Switzerland'],
	H: ['Ghana', 'Portugal', 'South Korea', 'Uruguay'],
};

const teamsList = () => {
	let teams = [];
	Object.keys(leagueGroups).map((group) => {
		teams = teams.concat(leagueGroups[group]);
	});
	return teams.sort();
};

const randomTeam = () => teamsList[Math.floor(Math.random() * teamsList.length)];

export const randomPrediction = {
	id: uuidv4(),
	owner: `autotest-${faker.internet.email()}`,
	username: faker.internet.userName(),
	winner: faker.location.country(),
	topScorer: faker.location.country(),
	leastConceded: faker.location.country(),
	leagueMatches: {
		'1': {
			id: '1',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'A',
			homeTeam: leagueGroups['A'][2],
			awayTeam: leagueGroups['A'][0],
		},
		'2': {
			id: '2',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'A',
			homeTeam: leagueGroups['A'][3],
			awayTeam: leagueGroups['A'][1],
		},
		'3': {
			id: '3',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'A',
			homeTeam: leagueGroups['A'][2],
			awayTeam: leagueGroups['A'][3],
		},
		'4': {
			id: '4',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'A',
			homeTeam: leagueGroups['A'][1],
			awayTeam: leagueGroups['A'][0],
		},
		'5': {
			id: '5',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'A',
			homeTeam: leagueGroups['A'][0],
			awayTeam: leagueGroups['A'][3],
		},
		'6': {
			id: '6',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'A',
			homeTeam: leagueGroups['A'][1],
			awayTeam: leagueGroups['A'][2],
		},
		'7': {
			id: '7',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'B',
			homeTeam: leagueGroups['B'][0],
			awayTeam: leagueGroups['B'][1],
		},
		'8': {
			id: '8',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'B',
			homeTeam: leagueGroups['B'][2],
			awayTeam: leagueGroups['B'][3],
		},
		'9': {
			id: '9',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'B',
			homeTeam: leagueGroups['B'][3],
			awayTeam: leagueGroups['B'][1],
		},
		'10': {
			id: '10',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'B',
			homeTeam: leagueGroups['B'][0],
			awayTeam: leagueGroups['B'][2],
		},
		'11': {
			id: '11',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'B',
			homeTeam: leagueGroups['B'][1],
			awayTeam: leagueGroups['B'][2],
		},
		'12': {
			id: '12',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'B',
			homeTeam: leagueGroups['B'][3],
			awayTeam: leagueGroups['B'][0],
		},
		'13': {
			id: '13',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'C',
			homeTeam: leagueGroups['C'][0],
			awayTeam: leagueGroups['C'][3],
		},
		'14': {
			id: '14',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'C',
			homeTeam: leagueGroups['C'][1],
			awayTeam: leagueGroups['C'][2],
		},
		'15': {
			id: '15',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'C',
			homeTeam: leagueGroups['C'][2],
			awayTeam: leagueGroups['C'][3],
		},
		'16': {
			id: '16',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'C',
			homeTeam: leagueGroups['C'][0],
			awayTeam: leagueGroups['C'][1],
		},
		'17': {
			id: '17',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'C',
			homeTeam: leagueGroups['C'][2],
			awayTeam: leagueGroups['C'][0],
		},
		'18': {
			id: '18',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'C',
			homeTeam: leagueGroups['C'][3],
			awayTeam: leagueGroups['C'][1],
		},
		'19': {
			id: '19',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'D',
			homeTeam: leagueGroups['D'][1],
			awayTeam: leagueGroups['D'][3],
		},
		'20': {
			id: '20',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'D',
			homeTeam: leagueGroups['D'][2],
			awayTeam: leagueGroups['D'][0],
		},
		'21': {
			id: '21',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'D',
			homeTeam: leagueGroups['D'][3],
			awayTeam: leagueGroups['D'][0],
		},
		'22': {
			id: '22',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'D',
			homeTeam: leagueGroups['D'][2],
			awayTeam: leagueGroups['D'][1],
		},
		'23': {
			id: '23',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'D',
			homeTeam: leagueGroups['D'][0],
			awayTeam: leagueGroups['D'][1],
		},
		'24': {
			id: '24',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'D',
			homeTeam: leagueGroups['D'][3],
			awayTeam: leagueGroups['D'][2],
		},
		'25': {
			id: '25',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'E',
			homeTeam: leagueGroups['E'][1],
			awayTeam: leagueGroups['E'][2],
		},
		'26': {
			id: '26',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'E',
			homeTeam: leagueGroups['E'][3],
			awayTeam: leagueGroups['E'][0],
		},
		'27': {
			id: '27',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'E',
			homeTeam: leagueGroups['E'][2],
			awayTeam: leagueGroups['E'][0],
		},
		'28': {
			id: '28',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'E',
			homeTeam: leagueGroups['E'][3],
			awayTeam: leagueGroups['E'][1],
		},
		'29': {
			id: '29',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'E',
			homeTeam: leagueGroups['E'][0],
			awayTeam: leagueGroups['E'][1],
		},
		'30': {
			id: '30',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'E',
			homeTeam: leagueGroups['E'][2],
			awayTeam: leagueGroups['E'][3],
		},
		'31': {
			id: '31',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'F',
			homeTeam: leagueGroups['F'][3],
			awayTeam: leagueGroups['F'][2],
		},
		'32': {
			id: '32',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'F',
			homeTeam: leagueGroups['F'][0],
			awayTeam: leagueGroups['F'][1],
		},
		'33': {
			id: '33',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'F',
			homeTeam: leagueGroups['F'][0],
			awayTeam: leagueGroups['F'][3],
		},
		'34': {
			id: '34',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'F',
			homeTeam: leagueGroups['F'][2],
			awayTeam: leagueGroups['F'][1],
		},
		'35': {
			id: '35',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'F',
			homeTeam: leagueGroups['F'][1],
			awayTeam: leagueGroups['F'][3],
		},
		'36': {
			id: '36',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'F',
			homeTeam: leagueGroups['F'][2],
			awayTeam: leagueGroups['F'][0],
		},
		'37': {
			id: '37',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'G',
			homeTeam: leagueGroups['A'][3],
			awayTeam: leagueGroups['A'][1],
		},
		'38': {
			id: '38',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'G',
			homeTeam: leagueGroups['A'][0],
			awayTeam: leagueGroups['A'][2],
		},
		'39': {
			id: '39',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'G',
			homeTeam: leagueGroups['A'][1],
			awayTeam: leagueGroups['A'][2],
		},
		'40': {
			id: '40',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'G',
			homeTeam: leagueGroups['A'][0],
			awayTeam: leagueGroups['A'][3],
		},
		'41': {
			id: '41',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'G',
			homeTeam: leagueGroups['A'][1],
			awayTeam: leagueGroups['A'][0],
		},
		'42': {
			id: '42',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'G',
			homeTeam: leagueGroups['A'][2],
			awayTeam: leagueGroups['A'][3],
		},
		'43': {
			id: '43',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'H',
			homeTeam: leagueGroups['B'][3],
			awayTeam: leagueGroups['B'][2],
		},
		'44': {
			id: '44',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'H',
			homeTeam: leagueGroups['B'][1],
			awayTeam: leagueGroups['B'][0],
		},
		'45': {
			id: '45',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'H',
			homeTeam: leagueGroups['B'][2],
			awayTeam: leagueGroups['B'][0],
		},
		'46': {
			id: '46',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'H',
			homeTeam: leagueGroups['B'][1],
			awayTeam: leagueGroups['B'][3],
		},
		'47': {
			id: '47',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'H',
			homeTeam: leagueGroups['B'][0],
			awayTeam: leagueGroups['B'][3],
		},
		'48': {
			id: '48',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			group: 'H',
			homeTeam: leagueGroups['B'][2],
			awayTeam: leagueGroups['B'][1],
		},
	},
	r16Matches: {
		'1': {
			id: '1',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			homeTeam: randomTeam(),
			awayTeam: randomTeam(),
		},
		'2': {
			id: '2',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			homeTeam: randomTeam(),
			awayTeam: randomTeam(),
		},
		'3': {
			id: '3',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			homeTeam: randomTeam(),
			awayTeam: randomTeam(),
		},
		'4': {
			id: '4',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			homeTeam: randomTeam(),
			awayTeam: randomTeam(),
		},
		'5': {
			id: '5',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			homeTeam: randomTeam(),
			awayTeam: randomTeam(),
		},
		'6': {
			id: '6',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			homeTeam: randomTeam(),
			awayTeam: randomTeam(),
		},
		'7': {
			id: '7',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			homeTeam: randomTeam(),
			awayTeam: randomTeam(),
		},
		'8': {
			id: '8',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			homeTeam: randomTeam(),
			awayTeam: randomTeam(),
		},
	},
	quarterFinalMatches: {
		'1': {
			id: '1',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			homeTeam: randomTeam(),
			awayTeam: randomTeam(),
		},
		'2': {
			id: '2',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			homeTeam: randomTeam(),
			awayTeam: randomTeam(),
		},
		'3': {
			id: '3',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			homeTeam: randomTeam(),
			awayTeam: randomTeam(),
		},
		'4': {
			id: '4',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			homeTeam: randomTeam(),
			awayTeam: randomTeam(),
		},
	},
	semiFinalMatches: {
		'1': {
			id: '1',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			homeTeam: randomTeam(),
			awayTeam: randomTeam(),
		},
		'2': {
			id: '2',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			homeTeam: randomTeam(),
			awayTeam: randomTeam(),
		},
	},
	finalMatches: {
		'1': {
			id: '1',
			homeGoals: randomNumberOfGoals(),
			awayGoals: randomNumberOfGoals(),
			homeTeam: randomTeam(),
			awayTeam: randomTeam(),
		},
	},
};
