import { FoodItem } from './food-item';

export class FoodCategory {
	id: number;
	label: string;
	imageSvgName: string;
	quantityOrdered: number = 0;
	expanded: boolean = false;
	foodItems: FoodItem[];

	constructor(json) {
		this.id = json.id;
		this.label = json.label;
		this.imageSvgName = json.image_svg_name;
		this.quantityOrdered = json.quantity_ordered || 0;
		this.expanded = false;
		this.foodItems = [];
		for (let foodItem of json.food_items) {
			this.foodItems.push(new FoodItem(foodItem));
		};
	}
}
