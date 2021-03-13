import { expect } from 'chai';
import Chance from 'chance';
import { ITag } from '../src/common/models';
import { ApiClient } from '../src/controllers';

const chance = new Chance();

const user = {
	email: `test-${chance.guid({ version: 4 })}@gmail.com`,
	password: '111111',
	firstName: 'Test user',
	lastName: 'TestUser'
};

describe('Suite - /posts routes', () => {
	let authUser: ApiClient;
	before(async () => {
		await ApiClient.unauthorized().user.register(user);

		authUser = await ApiClient.authorized({ email: user.email, password: user.password });
	});

	it('[POST] /post- create new post', async () => {
		const postData = {
			title: ' My new post',
			description: 'test description',
			isPrivate: false,
			tags: [] as ITag[]
		};

		const { body, statusCode } = await authUser.posts.createNew(postData);

		expect(statusCode).to.eql(200);

		expect({ ...postData, id: body.id }).to.deep.equal(body);
	});

	it('[GET] /post/:id - get public post by id', async () => {
		const postData = {
			title: ' My new post',
			description: 'test description',
			isPrivate: false,
			tags: [] as ITag[]
		};

		const newPost = await authUser.posts.createNew(postData);

		const { body, statusCode } = await authUser.posts.findById(newPost.body.id);

		expect(statusCode).to.eql(200);

		expect({
			...postData,
			id: body.id,
			createdAt: body.createdAt,
			updatedAt: body.updatedAt,
			owner: { id: body.owner.id }
		}).to.deep.equal(body);
	});

	it('[DELETE] /post/:id - delete post by id', async () => {
		const postData = {
			title: ' My new post',
			description: 'test description',
			isPrivate: false,
			tags: [] as ITag[]
		};

		const newPost = await authUser.posts.createNew(postData);

		const { body, statusCode } = await authUser.posts.delete(newPost.body.id);

		expect(statusCode).to.eql(200);
		expect(body).to.deep.equal({ success: true });
	});

	it('[UPDATE] /post/:id - update post by id', async () => {
		const postData = {
			title: 'My new post',
			description: 'test description',
			isPrivate: false,
			tags: [] as ITag[]
		};

		const newPost = await authUser.posts.createNew(postData);

		const updatePost = {
			title: 'Updated test title',
			description: 'updated test description',
			isPrivate: false,
			tags: [] as ITag[]
		};

		const { body, statusCode } = await authUser.posts.update(newPost.body.id, updatePost);

		expect(statusCode).to.eql(200);
		expect({
			...updatePost,
			id: body.id,
			createdAt: body.createdAt,
			updatedAt: body.updatedAt,
			owner: { id: body.owner.id }
		}).to.eql(body);
	});
});
