import { expect } from 'chai';
import Chance from 'chance';
import { dbConnect } from '../../src/db';
import { ApiClient } from '../src/controllers';
import { AuthController } from '../../src/controllers';

const chance = new Chance();

describe('Suite - /auth routes', () => {
	let connection: any;
	before(async () => {
		connection = await dbConnect();
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

		const apiClient = ApiClient.unauthorized();

		const { body, statusCode } = await apiClient.user.register(user);

		expect(statusCode).to.eql(200);
		expect({
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			id: body.id
		}).to.deep.equal(body);
	});

	it('[POST] /login - login with valid creds', async () => {
		const user = {
			email: `test-${chance.guid({ version: 4 })}@gmail.com`,
			password: '111111',
			firstName: 'Test user',
			lastName: 'TestUser'
		};

		await new AuthController().register(user);

		const apiClient = ApiClient.unauthorized();
		const { body, statusCode } = await apiClient.user.login({ email: user.email, password: user.password });

		expect(statusCode).to.eql(200);
		expect({
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			id: body.user.id
		}).to.deep.equal(body.user);
		expect(body.accessToken).to.be.not.null;
	});

	it('[POST] /login - login with invalid creds', async () => {
		const apiClient = ApiClient.unauthorized();
		const res: any = await apiClient.user.login({ email: 'invalid@email.com', password: '11111' }, false);

		expect(res.body.statusCode).to.eql(400);
		expect(res.body.message).to.eql('Incorrect email or password');
		expect(res.body.status).to.eql('error');
	});
});
