import { expect } from 'chai';
import { request, Response } from '../lib';
import { UserModel } from '../models';

describe('suite', () => {
	it('test', async () => {
		const { responseBody }: Response<UserModel> = await request({
			url: 'http://localhost:3001',
			path: '',
			method: 'GET',
		});
		console.log(responseBody);
	});

	it('test #1', async () => {
		const { responseBody, statusCode }: Response<UserModel> = await request({
			url: 'http://localhost:3001',
			path: '/api/auth/register',
			method: 'POST',
			body: {
				email: 'adminuser322@gmail.com',
				password: 'test11',
				firstName: 'test',
				lastName: 'ttt12',
			},
		});

		expect(responseBody.data.firstName).to.eql('test');
		expect(responseBody.data.email).to.eql('adminuser322@gmail.com');
		expect(responseBody.data.lastName).to.eql('ttt12');
		expect(statusCode).to.eql(200);
	});

	it('test #2', async () => {
		const { responseBody, statusCode }: Response<UserModel> = await request({
			url: 'http://localhost:3001',
			path: '/api/auth/register',
			method: 'POST',
			body: {
				email: 'adminuser3221@gmail.com',
				password: 'test11',
				firstName: 'test',
				lastName: 'ttt12',
			},
		});

		expect(responseBody.data.firstName).to.eql('test');
		expect(responseBody.data.email).to.eql('adminuser3221@gmail.com');
		expect(responseBody.data.lastName).to.eql('ttt12');
		expect(statusCode).to.eql(200);
	});

	it('test #3', async () => {
		const { responseBody, statusCode }: Response<UserModel> = await request({
			url: 'http://localhost:3001',
			path: '/api/auth/register',
			method: 'POST',
			body: {
				email: 'adminuser3222@gmail.com',
				password: 'test11',
				firstName: 'test',
				lastName: 'ttt12',
			},
		});

		expect(responseBody.data.firstName).to.eql('test');
		expect(responseBody.data.email).to.eql('adminuser3222@gmail.com');
		expect(responseBody.data.lastName).to.eql('ttt12');
		expect(statusCode).to.eql(200);
	});
});
