export class FoodItem {
	id: number;
	name: string;
	quantityOrdered: number = 0;
	unitLabelSingular: string;
	unitLabelPlural: string;
	unitCost: number;
	description: string;
	ingredients: string;
	producer: string;
}
