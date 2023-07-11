import path from 'path';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import './initialize-db';

import { connectDB } from './connect-db';
import { updatePredictionMatches } from './serverUtils';

import uuid from 'uuid';

import { englishTranslations } from '../locate/en/translate';
import { spanishTranslations } from '../locate/es/translate';

const nodemailer = require('nodemailer');

let port = process.env.PORT || 7777;
let app = express();

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());
app.listen(port, console.info('Server listening on port ', port));

app.post('/mongo/data', async (req, res) => {
	let db = await connectDB();
	let users = await db.collection('users').find().toArray();
	let predictions = await db.collection('predictions').find().toArray();
	let results = await db.collection('results').find().toArray();
	let privateLeagues = await db.collection('privateLeagues').find().toArray();
	let comments = await db.collection('comments').find().toArray();

	let mongoState = { users, predictions, results, privateLeagues, comments };

	res.send({ mongoState });
});

if (process.env.NODE_ENV == `production`) {
	app.use(express.static(path.resolve(__dirname, '../../dist')));
	app.get('/*', (req, res) => {
		res.sendFile(path.resolve('index.html'));
	});
}

export const updateResults = async (results) => {
	let {
		id,
		winner,
		topScorer,
		leastConceded,
		leagueMatches,
		r16Matches,
		quarterFinalMatches,
		semiFinalMatches,
		finalMatches,
	} = results;

	let db = await connectDB();
	let collection = db.collection('results');

	if (winner) await collection.updateOne({ id }, { $set: { winner } });

	if (topScorer) await collection.updateOne({ id }, { $set: { topScorer } });

	if (leastConceded) await collection.updateOne({ id }, { $set: { leastConceded } });

	if (leagueMatches)
		await collection.updateOne(
			{ id },
			{ $set: { leagueMatches, r16Matches, quarterFinalMatches, semiFinalMatches, finalMatches } }
		);

	if (r16Matches)
		await collection.updateOne(
			{ id },
			{ $set: { r16Matches, quarterFinalMatches, semiFinalMatches, finalMatches } }
		);

	if (quarterFinalMatches)
		await collection.updateOne(
			{ id },
			{ $set: { quarterFinalMatches, semiFinalMatches, finalMatches } }
		);

	if (semiFinalMatches)
		await collection.updateOne({ id }, { $set: { semiFinalMatches, finalMatches } });

	if (finalMatches) await collection.updateOne({ id }, { $set: { finalMatches } });
};

export const addNewPrediction = async (prediction) => {
	let db = await connectDB();
	let collection = db.collection('predictions');
	await collection.insertOne(prediction);
};

export const updatePredictionDOS = async (prediction) => {
	let {
		id,
		username,
		winner,
		topScorer,
		leastConceded,
		leagueMatches,
		r16Matches,
		quarterFinalMatches,
		semiFinalMatches,
		finalMatches,
	} = prediction;

	let db = await connectDB();
	let collection = db.collection('predictions');

	if (username) await collection.updateOne({ id }, { $set: { username } });

	if (winner) await collection.updateOne({ id }, { $set: { winner } });

	if (topScorer) await collection.updateOne({ id }, { $set: { topScorer } });

	if (leastConceded) await collection.updateOne({ id }, { $set: { leastConceded } });

	if (leagueMatches)
		await collection.updateOne(
			{ id },
			{ $set: { leagueMatches, r16Matches, quarterFinalMatches, semiFinalMatches, finalMatches } }
		);

	if (r16Matches)
		await collection.updateOne(
			{ id },
			{ $set: { r16Matches, quarterFinalMatches, semiFinalMatches, finalMatches } }
		);

	if (quarterFinalMatches)
		await collection.updateOne(
			{ id },
			{ $set: { quarterFinalMatches, semiFinalMatches, finalMatches } }
		);

	if (semiFinalMatches)
		await collection.updateOne({ id }, { $set: { semiFinalMatches, finalMatches } });

	if (finalMatches) await collection.updateOne({ id }, { $set: { finalMatches } });
};

export const updatePrediction = async (prediction) => {
	let {
		id,
		username,
		winner,
		topScorer,
		leastConceded,
		leagueMatches,
		r16Matches,
		quarterFinalMatches,
		semiFinalMatches,
		finalMatches,
	} = prediction;

	let db = await connectDB();
	let collection = db.collection('predictions');

	if (username) await collection.updateOne({ id }, { $set: { username } });

	if (winner) await collection.updateOne({ id }, { $set: { winner } });

	if (topScorer) await collection.updateOne({ id }, { $set: { topScorer } });

	if (leastConceded) await collection.updateOne({ id }, { $set: { leastConceded } });

	if (leagueMatches) updatePredictionMatches(collection, id, prediction, 'leagueMatches');

	if (r16Matches) updatePredictionMatches(collection, id, prediction, 'r16Matches');

	if (quarterFinalMatches)
		updatePredictionMatches(collection, id, prediction, 'quarterFinalMatches');

	if (semiFinalMatches) updatePredictionMatches(collection, id, prediction, 'semiFinalMatches');

	if (finalMatches) updatePredictionMatches(collection, id, prediction, 'finalMatches');
};

const updatePredictionPrivateLeague = async (action, id, privateLeague) => {
	let db = await connectDB();
	let collection = db.collection('predictions');

	if (action == 'join') await collection.updateOne({ id }, { $push: { privateLeague } });
	if (action == 'quit') await collection.updateOne({ id }, { $pull: { privateLeague } });
};

export const updateUser = async (user) => {
	let { id, username } = user;

	let db = await connectDB();
	let collection = db.collection('users');
	await collection.updateOne({ id }, { $set: { username } });
};

app.post('/results/update', async (req, res) => {
	let results = req.body.results;
	await updateResults(results);
	res.status(200).send();
});

app.post('/prediction/new', async (req, res) => {
	let prediction = req.body.prediction;
	await addNewPrediction(prediction);
	res.status(200).send();
});

app.post('/prediction/update-dos', async (req, res) => {
	let prediction = req.body.prediction;
	await updatePredictionDOS(prediction);
	res.status(200).send();
});

app.post('/prediction/update-private-league', async (req, res) => {
	let { action, predictionID, privateLeague } = req.body;

	await updatePredictionPrivateLeague(action, predictionID, privateLeague);

	res.status(200).send();
});

app.post('/user/update', async (req, res) => {
	let user = req.body.user;
	await updateUser(user);
	res.status(200).send();
});

app.post('/authenticate', async (req, res) => {
	let { username, passwordHash } = req.body;

	let db = await connectDB();
	let collection = db.collection('users');

	let user = await collection.findOne({ id: username });
	if (!user) {
		return res.status(500).send('User not found!');
	}

	let passwordCorrect = passwordHash === user.password;
	if (!passwordCorrect) {
		return res.status(500).send('Password incorrect!');
	}

	let token = uuid();
	let tokensCollection = db.collection('idTokens');
	let idToken = {
		token,
		userID: user.id,
	};
	await tokensCollection.insertOne(idToken);

	let session = {
		authenticated: 'AUTHENTICATED',
		id: user.id,
		idToken,
	};

	res.send({ session });
});

app.post('/id-token', async (req, res) => {
	let { idToken } = req.body;

	let db = await connectDB();
	let tokensCollection = db.collection('idTokens');

	let token = await tokensCollection.findOne({ token: idToken });
	if (!token) {
		return res.status(500).send('Token not valid!');
	}

	let session = {
		authenticated: 'AUTHENTICATED',
		id: token.userID,
		idToken,
	};

	res.send({ session });
});

app.post('/user/new', async (req, res) => {
	let user = req.body.user;

	if (!user) {
		return res
			.status(404)
			.send({ error: { message: 'Email address and password are mandatory!' } });
	}
	if (!user.id) {
		return res.status(404).send({ error: { message: 'Email address is mandatory!' } });
	}

	let db = await connectDB();
	let collection = db.collection('users');
	await collection.insertOne(user);

	let token = uuid();
	let tokensCollection = db.collection('idTokens');
	let idToken = {
		token,
		userID: user.id,
	};
	await tokensCollection.insertOne(idToken);

	let session = {
		authenticated: 'AUTHENTICATED',
		id: user.id,
		idToken,
	};

	res.send({ session });
});

app.post('/forgot-password-email', async (req, res) => {
	let { email, language, domain } = req.body;

	let db = await connectDB();
	let usersCollection = db.collection('users');

	let user = await usersCollection.findOne({ id: email });

	if (!user) {
		return res.status(500).send('Username not registered');
	}

	let token = uuid();
	let resetPasswordtokensCollection = db.collection('resetPasswordTokens');
	let resetPasswordToken = {
		token,
		tokenExpires: Date.now() + 3600000,
		userID: email,
	};
	await resetPasswordtokensCollection.insertOne(resetPasswordToken);

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'superporra.reset@gmail.com',
			pass: 'test1234!',
		},
	});

	const emailSubject = () => {
		if (language == 'english') return englishTranslations.signInPage.forgotPasswordEmailSubject;
		if (language == 'spanish') return spanishTranslations.signInPage.forgotPasswordEmailSubject;
	};
	const emailText = () => {
		if (language == 'english')
			return englishTranslations.signInPage.forgotPasswordEmailBody(token, domain);
		if (language == 'spanish')
			return spanishTranslations.signInPage.forgotPasswordEmailBody(token, domain);
	};

	const mailOptions = {
		from: 'superporra.reset@gmail.com',
		to: email,
		subject: emailSubject(),
		text: emailText(),
	};

	console.log('Sending email');

	transporter.sendMail(mailOptions, (err, response) => {
		if (err) {
			console.error('There was an error sending the email: ', err);
		} else {
			res.status(200).json('Recovery email sent');
		}
	});
});

app.post('/password-reset-token', async (req, res) => {
	let token = req.body.token;

	let db = await connectDB();
	let resetPasswordTokensCollection = db.collection('resetPasswordTokens');

	let tokenData = await resetPasswordTokensCollection.findOne({ token: token });

	if (!tokenData) {
		return res.status(500).send('Reset Password token not valid');
	}

	res.send({ tokenData });
});

app.post('/password-reset-request', async (req, res) => {
	let { userID, newPassword } = req.body;

	let db = await connectDB();
	let usersCollection = db.collection('users');

	await usersCollection.updateOne({ id: userID }, { $set: { password: newPassword } });

	res.status(200).send();
});

app.post('/remove-test-users', async (req, res) => {
	let db = await connectDB();
	let usersCollection = db.collection('users');

	await usersCollection.deleteMany({ id: /automated-/ });

	res.status(200).send();
});

app.post('/remove-test-predictions', async (req, res) => {
	let db = await connectDB();
	let predictionsCollection = db.collection('predictions');

	await predictionsCollection.deleteMany({ username: /Test Participant/ });

	res.status(200).send();
});

app.post('/remove-test-user-private-leagues', async (req, res) => {
	let db = await connectDB();
	let predictionsCollection = db.collection('predictions');

	await predictionsCollection.updateOne(
		{ owner: 'automated@test.com' },
		{ $set: { privateLeague: [] } }
	);

	res.status(200).send();
});

app.post('/private-league/league-name-validation', async (req, res) => {
	let leagueName = req.body.leagueName;

	let db = await connectDB();
	let privateLeaguesCollection = db.collection('privateLeagues');

	let league = await privateLeaguesCollection.findOne({ name: leagueName });

	if (!league) {
		return res.send('League name available');
	} else {
		return res.send('League name already in use');
	}
});

app.post('/private-league/create', async (req, res) => {
	let privateLeague = {
		name: req.body.leagueName,
	};

	let db = await connectDB();
	let privateLeaguesCollection = db.collection('privateLeagues');

	await privateLeaguesCollection.insertOne(privateLeague);

	res.status(200).send();
});

app.post('/private-league/remove', async (req, res) => {
	let db = await connectDB();
	let privateLeaguesCollection = db.collection('privateLeagues');

	await privateLeaguesCollection.deleteMany({ name: /Automated-Championship/ });

	res.status(200).send();
});

app.post('/comments/create', async (req, res) => {
	let comment = {
		username: req.body.username,
		date: req.body.date,
		text: req.body.text,
	};

	let db = await connectDB();
	let commentsCollection = db.collection('comments');

	await commentsCollection.insertOne(comment);

	res.status(200).send();
});
