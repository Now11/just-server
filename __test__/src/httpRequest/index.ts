import got, { Got, Response, OptionsOfJSONResponseBody } from 'got';
import { Methods } from '../common/enums/methods';
import { IGetArgs, IDeleteArgs, IPostArgs, IPutArgs } from '../common/models';
import * as dotenv from 'dotenv';

dotenv.config();
class HttpRequest {
	private readonly gotInstance: Got;
	constructor(url: string) {
		this.gotInstance = got.extend({
			prefixUrl: url,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	public get<T>({ url, searchParams }: IGetArgs, options?: OptionsOfJSONResponseBody): Promise<Response<T>> {
		return this.gotInstance(url, {
			method: Methods.GET,
			responseType: 'json',
			searchParams,
			...options
		});
	}

	public post<T>({ url, body }: IPostArgs, options?: OptionsOfJSONResponseBody): Promise<Response<T>> {
		return this.gotInstance(url, {
			method: Methods.POST,
			responseType: 'json',
			json: body,
			...options
		});
	}

	public put<T>({ url, body }: IPutArgs, options?: OptionsOfJSONResponseBody): Promise<Response<T>> {
		return this.gotInstance(url, {
			method: Methods.PUT,
			responseType: 'json',
			json: body,
			...options
		});
	}

	public delete<T>({ url }: IDeleteArgs, options?: OptionsOfJSONResponseBody): Promise<Response<T>> {
		return this.gotInstance(url, { method: Methods.DELETE, responseType: 'json', ...options });
	}
}

export default new HttpRequest(`http://localhost:${process.env.APP_PORT}/api`);
