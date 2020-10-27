import supertest from 'supertest';

interface IRequestParams {
	url: string;
	path: string;
	method: string;
	body?: object | string;
	headers?: object | string;
	qeuries?: object | string;
}

export interface Response<T> {
	responseBody: T;
	statusCode: number;
}

export async function request<T>({ url, path, method, body }: IRequestParams): Promise<Response<T>> {
	let res: supertest.Response;
	const request = supertest(url);
	if (method === 'GET') {
		res = await request.get(path);
	} else if (method === 'POST') {
		res = await request.post(path).send(body).set('Accept', 'application/json');
	}

	return {
		responseBody: res.body as T,
		statusCode: res.status,
	};
}
