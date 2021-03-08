import { getRepository } from 'typeorm';
import { Tag } from '../entities/Tag';

export default class TagSeeder {
	public static async execute() {
		const data = [
			{
				title: 'QA'
			},
			{
				title: 'Big Data'
			},
			{
				title: 'NodeJS'
			}
		];

		const tagRepository = getRepository(Tag);
		data.forEach(async tag => {
			await tagRepository.save(tag);
		});
	}
}
