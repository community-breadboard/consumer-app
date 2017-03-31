import { PickupLocation } from './pickup-location';
import { FoodItem } from './food-item';

export class StandingOrder {
	pickupLocation?: PickupLocation;
	foodItems: FoodItem[];
}
