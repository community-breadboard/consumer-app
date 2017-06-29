import { ProducerEntity } from './producer-entity';

export class Family {
	name: string;
	producerEntity: ProducerEntity;

	constructor(json: any) {
		this.name = json.name;
		this.producerEntity = new ProducerEntity(json.producer_entity)
	}
}
