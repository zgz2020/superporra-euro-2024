import { take, put, select } from 'redux-saga/effects';
import axios from 'axios';
import * as selectors from '../selectors';
import * as mutations from '../mutations';
import { url } from './url';
import { history } from '../history';
import { setLocalStorageUser } from '../../../utils/common';
import { userExists } from '../../../utils/login';
import { verifyAllMatchesFilled } from '../../../utils/predictions';

let validator = require('email-validator');

export function* userCreationSaga() {
	while (true) {
		const { email, passwordHash, username, prediction } = yield take(
			mutations.REQUEST_USER_CREATION
		);
		const userID = email;

		let allUsers = yield select(selectors.getUsers);

		yield put(mutations.hideLoginPageErrorMessages());
		yield put(mutations.hidePredictionsIncomplete());
		yield take(mutations.LOGIN_PAGE_ERROR_MESSAGES_HIDDEN);

		if (!validator.validate(email)) {
			// if (userID == '') {
			yield put(mutations.showInvalidEmailSignUpMessage());
		} else if (userExists(allUsers.allIds, userID)) {
			yield put(mutations.showEmailAlreadyRegisteredMessage());
		} else if (passwordHash == 'd41d8cd98f00b204e9800998ecf8427e') {
			yield put(mutations.showNoPasswordMessage());
		} else if (!verifyAllMatchesFilled(prediction)) {
			yield put(mutations.showPredictionsIncomplete());
		} else {
			yield put(mutations.createUser(userID, passwordHash));

			const { data } = yield axios.post(url + '/user/new', {
				user: {
					id: userID,
					password: passwordHash,
				},
			});

			const { authenticated, id, idToken } = data.session;

			yield put(mutations.processAuthenticateUser(authenticated, id));

			setLocalStorageUser(idToken.token);

			yield put(mutations.requestPredictionCreation(userID, username, prediction));

			history.push('/account');
		}
	}
}
