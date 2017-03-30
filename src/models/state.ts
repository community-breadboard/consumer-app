import { FoodCategory } from './food-category';
import { Account } from './account';
import { PickupLocation } from './pickup-location';

export class State {
	account: Account;
	pickupLocations: [PickupLocation];
	outstandingOrder: any;
	standingOrder: any;
	orderInProgress: any;
	foodCategories: [FoodCategory];
}
