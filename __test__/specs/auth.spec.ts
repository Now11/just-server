import { expect } from 'chai';
import Chance from 'chance';
import { request, Response } from '../lib';
import { ICustomError, IUserModel } from '../models';

import { AuthService } from '../../src/services';
import { getConnection } from '../../src/db';

const chance = new Chance();
describe('Suite - /auth routes', () => {
	let connection: any;
	before(async () => {
		connection = await getConnection();
	});

	after(async () => {
		connection.close();
	});

	it('[POST] /register - reqiester user with correct email', async () => {
		const user = {
			email: `test-${chance.guid({ version: 4 })}@gmail.com`,
			password: '111111',
			firstName: 'Test user',
			lastName: 'TestUser'
		};

		const { responseBody, statusCode }: Response<IUserModel> = await request({
			url: 'http://localhost:3001',
			path: '/api/auth/register',
			method: 'POST',
			body: {
				email: user.email,
				password: user.password,
				firstName: user.firstName,
				lastName: user.lastName
			}
		});

		expect(statusCode).to.eql(200);
		expect(responseBody.user.email).to.eql(user.email);
		expect(responseBody.user.firstName).to.eql(user.firstName);
		expect(responseBody.user.lastName).to.eql(user.lastName);
	});

	it('[POST] /login - login with valid creds', async () => {
		const user = {
			email: `test-${chance.guid({ version: 4 })}@gmail.com`,
			password: '111111',
			firstName: 'Test user',
			lastName: 'TestUser'
		};

		await new AuthService().register(user);

		const { responseBody, statusCode }: Response<IUserModel> = await request({
			url: 'http://localhost:3001',
			path: '/api/auth/login',
			method: 'POST',
			body: {
				email: user.email,
				password: user.password
			}
		});

		expect(statusCode).to.eql(200);
		expect(responseBody.user.email).to.eql(user.email);
		expect(responseBody.user.firstName).to.eql(user.firstName);
		expect(responseBody.user.lastName).to.eql(user.lastName);
	});

	it('[POST] /login - login with invalid creds', async () => {
		const { responseBody, statusCode }: Response<ICustomError> = await request({
			url: 'http://localhost:3001',
			path: '/api/auth/login',
			method: 'POST',
			body: {
				email: 'invalidEmail@gmail.com',
				password: 'invalid_password'
			}
		});

		expect(statusCode).to.eql(400);
		expect(responseBody.message).to.eql('Incorrect email or password');
		expect(responseBody.status).to.eql('error');
		expect(responseBody.statusCode).to.eql(400);
	});
});
