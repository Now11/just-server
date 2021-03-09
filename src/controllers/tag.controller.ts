import { getCustomRepository } from 'typeorm';
import { HttpStatusCode } from '../common/enums';
import { CustomError } from '../common/helpers';
import { ITag, ICreateTag } from '../common/models';
import { TagRepository } from '../data/repositories';

class TagController {
	async getTags(): Promise<ITag[] | unknown> {
		const tagRepository = getCustomRepository(TagRepository);
		const tags = await tagRepository.findAll();
		if (!tags) {
			return {};
		}

		return tags;
	}

	async createTag(data: ICreateTag) {
		const { title } = data;

		const tagRepository = getCustomRepository(TagRepository);
		const existTag = await tagRepository.findByTitle(title);

		if (existTag) {
			throw new CustomError(HttpStatusCode.BAD_REQUEST, 'Title must be unique');
		}

		const newTag = await tagRepository.createItem(data);

		if (!newTag) {
			throw new CustomError(HttpStatusCode.BAD_REQUEST, 'Bad request');
		}

		return newTag;
	}
}

export { TagController };
