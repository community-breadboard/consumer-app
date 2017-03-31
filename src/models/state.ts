import { FoodCategory } from './food-category';
import { Account } from './account';
import { PickupLocation } from './pickup-location';
import { OutstandingOrder } from './outstanding-order';
import { OrderInProgress } from './order-in-progress';

export class State {
	account: Account;
	pickupLocations: [PickupLocation];
	outstandingOrder: OutstandingOrder;
	standingOrder: any;
	orderInProgress: OrderInProgress;
	foodCategories: [FoodCategory];
}
