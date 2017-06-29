import { ProducerEntity } from './producer-entity';

export class FoodItem {
	id: number;
	name: string;
	quantityOrdered: number = 0;
	unitLabelSingular: string;
	unitLabelPlural: string;
	unitCost: number;
	description: string;
	ingredients: string;
	image?: string;
	producerEntity: ProducerEntity;

	constructor(json) {
		this.id = json.id;
		this.name = json.name;
		this.quantityOrdered = json.quantity_ordered || 0;
		this.unitLabelSingular = json.unit_label_singular;
		this.unitLabelPlural = json.unit_label_plural;
		this.unitCost = json.unit_cost;
		this.description = json.description;
		this.ingredients = json.ingredients;
		this.image = json.image;
		this.producerEntity = new ProducerEntity(json.producer_entity);
	}
}
