import { getCustomRepository } from 'typeorm';
import { HttpStatusCode } from '../common/enums';
import { CustomError } from '../common/helpers';
import { ITag, ICreateTag } from '../common/models';
import { TagRepository } from '../data/repositories';

class TagService {
	async getTags(): Promise<ITag[] | unknown> {
		const tagRepository = getCustomRepository(TagRepository);
		const tags = await tagRepository.getAll();
		if (!tags) {
			return {};
		}

		return tags;
	}

	async createTag(data: ICreateTag) {
		const tagRepository = getCustomRepository(TagRepository);
		const newTag = await tagRepository.createItem(data);
		if (!newTag) {
			throw new CustomError(HttpStatusCode.BAD_REQUEST, 'Bad request');
		}

		return newTag;
	}
}

export { TagService };
