import { Repository, ObjectLiteral, DeleteResult } from 'typeorm';

export default abstract class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
	getAll(): Promise<T[]> {
		return this.find();
	}

	getById(id: string): Promise<T> {
		return this.findOne({
			where: {
				id
			}
		});
	}

	createItem(data: Partial<T>): Promise<T> {
		return this.save(data);
	}

	deleteById(id: string): Promise<DeleteResult> {
		return this.delete(id);
	}
}
