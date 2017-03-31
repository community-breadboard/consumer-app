import { PickupLocation } from './pickup-location';
import { FoodItem } from './food-item';


export class OrderInProgress {
	foodItems: FoodItem[];
	pickupLocation?: PickupLocation;
	totalCost: number;
}
