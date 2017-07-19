import { FoodCategory } from './food-category';
import { Consumer } from './consumer';
import { Order } from './order';

export class State {
	consumer?: Consumer;
	outstandingOrder?: Order;
	orderInProgress?: Order;
	foodCategories?: FoodCategory[];

	constructor() {}
}
