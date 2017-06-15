import { PickupLocation } from './pickup-location';
import { FoodItem } from './food-item';

export class OutstandingOrder {
	pickupLocation?: PickupLocation;
	foodItems: FoodItem[];
	alertSet: boolean;
	addedToCalendar: boolean;
}
