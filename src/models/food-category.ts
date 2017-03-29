import { FoodItem } from './food-item';

export class FoodCategory {
	id: number;
	label: string;
	image: string;
	amt: number = 0;
	expanded: boolean = false;
	items: [FoodItem];
}
