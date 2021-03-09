import { IAuthParams } from '../common/models/request/IAtuhParams';

export class BaseController {
	constructor(protected readonly params: IAuthParams) {}
}
