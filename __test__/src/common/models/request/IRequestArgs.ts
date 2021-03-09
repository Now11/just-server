export interface IGet {
	url: string;
	searchParams?: URLSearchParams;
}

export interface IPost {
	url: string;
	body: any;
}

export interface IPut {
	url: string;
	body: any;
}

export interface IDelete {
	url: string;
}
