import { FoodCategory } from './food-category';
import { Account } from './account';
import { PickupLocation } from './pickup-location';
import { OutstandingOrder } from './outstanding-order';
import { OrderInProgress } from './order-in-progress';
import { StandingOrder } from './standing-order';

export class State {
	account?: Account;
	pickupLocations?: [PickupLocation];
	outstandingOrder?: OutstandingOrder;
	standingOrder?: StandingOrder;
	orderInProgress?: OrderInProgress;
	foodCategories?: FoodCategory[];
}
