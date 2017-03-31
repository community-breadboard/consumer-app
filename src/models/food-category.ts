import { FoodItem } from './food-item';

export class FoodCategory {
	id: number;
	label: string;
	image: string;
	quantityOrdered: number = 0;
	expanded: boolean = false;
	foodItems: FoodItem[];
}
