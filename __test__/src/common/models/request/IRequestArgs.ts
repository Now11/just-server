export interface IGetArgs {
	url: string;
	searchParams?: URLSearchParams;
}

export interface IPostArgs {
	url: string;
	body: any;
}

export interface IPutArgs {
	url: string;
	body: any;
}

export interface IDeleteArgs {
	url: string;
}
