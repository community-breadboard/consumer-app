import { OrderPickupSchedule } from './order-pickup-schedule';
import { FoodItem } from './food-item';

export class OutstandingOrder {
	orderPickupSchedule?: OrderPickupSchedule;
	foodItems: FoodItem[];
}
