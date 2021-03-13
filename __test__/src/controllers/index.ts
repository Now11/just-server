import { CookieJar } from 'tough-cookie';
import { IAuthParams } from '../common/models';
import { ILoginRequest } from '../common/models';
import { PostsController } from './posts.controller';
import { UserController } from './user.controller';

export class ApiClient {
	public readonly user: UserController;
	public readonly posts: PostsController;
	constructor(params?: IAuthParams) {
		const defaultParams = {
			cookies: new CookieJar()
		};

		const mergeParams = {
			...defaultParams,
			...params
		};

		this.user = new UserController(mergeParams);
		this.posts = new PostsController(mergeParams);
	}

	static async authorized(credentials: ILoginRequest) {
		const res = await ApiClient.unauthorized().user.login(credentials);
		return new ApiClient({
			token: res.body.accessToken
		});
	}

	static unauthorized() {
		return new ApiClient();
	}
}
