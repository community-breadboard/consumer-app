export class ProducerEntity {
	name: string;

	constructor(json) {
		this.name = json.name;
	}
}
