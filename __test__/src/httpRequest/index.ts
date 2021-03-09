import got, { Got, Response, OptionsOfJSONResponseBody } from 'got';
import { Methods } from '../common/enums/methods';
import { IGet, IDelete, IPost, IPut } from '../common/models';

class HttpRequest {
	private readonly gotInstance: Got;
	constructor(url: string) {
		this.gotInstance = got.extend({
			prefixUrl: url,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	public get<T>({ url, searchParams }: IGet, options?: OptionsOfJSONResponseBody): Promise<Response<T>> {
		return this.gotInstance(url, {
			method: Methods.GET,
			responseType: 'json',
			searchParams,
			...options
		});
	}

	public post<T>({ url, body }: IPost, options?: OptionsOfJSONResponseBody): Promise<Response<T>> {
		return this.gotInstance(url, {
			method: Methods.POST,
			responseType: 'json',
			json: body,
			...options
		});
	}

	public put<T>({ url, body }: IPut, options?: OptionsOfJSONResponseBody): Promise<Response<T>> {
		return this.gotInstance(url, {
			method: Methods.PUT,
			responseType: 'json',
			json: body,
			...options
		});
	}

	public delete<T>({ url }: IDelete, options?: OptionsOfJSONResponseBody): Promise<Response<T>> {
		return this.gotInstance(url, { method: Methods.DELETE, responseType: 'json', ...options });
	}
}

export default new HttpRequest(`http://localhost:${process.env.APP_PORT}/api`);
