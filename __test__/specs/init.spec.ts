import { expect } from 'chai';
import faker from 'faker';
import { request, Response } from '../lib';
import { UserModel } from '../models';

describe('suite', () => {
	it('test #1', async () => {
		const fakeEmail = faker.internet.email();
		const { responseBody, statusCode }: Response<UserModel> = await request({
			url: 'http://localhost:3001',
			path: '/api/auth/register',
			method: 'POST',
			body: {
				email: fakeEmail,
				password: 'test11',
				firstName: 'test',
				lastName: 'ttt12',
			},
		});

		expect(responseBody.data.firstName).to.eql('test');
		expect(responseBody.data.email).to.eql(fakeEmail);
		expect(responseBody.data.lastName).to.eql('ttt12');
		expect(statusCode).to.eql(200);
	});

	it('test #2', async () => {
		const fakeEmail = faker.internet.email();
		const { responseBody, statusCode }: Response<UserModel> = await request({
			url: 'http://localhost:3001',
			path: '/api/auth/register',
			method: 'POST',
			body: {
				email: fakeEmail,
				password: 'test11',
				firstName: 'test',
				lastName: 'ttt12',
			},
		});

		expect(responseBody.data.firstName).to.eql('test');
		expect(responseBody.data.email).to.eql(fakeEmail);
		expect(responseBody.data.lastName).to.eql('ttt12');
		expect(statusCode).to.eql(200);
	});

	it('test #3', async () => {
		const fakeEmail = faker.internet.email();
		const { responseBody, statusCode }: Response<UserModel> = await request({
			url: 'http://localhost:3001',
			path: '/api/auth/register',
			method: 'POST',
			body: {
				email: fakeEmail,
				password: 'test11',
				firstName: 'test',
				lastName: 'ttt12',
			},
		});

		// expect(responseBody.data.firstName).to.eql('test');
		expect(responseBody.data.email).to.eql(fakeEmail);
		expect(responseBody.data.lastName).to.eql('ttt12');
		expect(statusCode).to.eql(200);
	});
});
