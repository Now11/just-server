export interface IRegisterRequest {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

export interface IRegisterResponse {
	email: string;
	firstName: string;
	lastName: string;
	id: string;
}
