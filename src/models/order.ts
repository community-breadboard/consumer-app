import { OrderPickupSchedule } from './order-pickup-schedule';
import { FoodItem } from './food-item';

export class Order {
  id?: string;
	orderPickupSchedule?: OrderPickupSchedule;
	foodItems: FoodItem[];
	totalCost: number;
  isOpen: boolean;
  isPlaced: boolean;
  nextSaleStartDateString?: string;
  nextSaleStartDate?: Date;
  datePlacedString?: string;
  datePlaced: Date;
  nextPickupDateString? :string;
  nextPickupDate?: Date;
  formattedPickupTime?: string;
  pickupLocationName?: string;

  
  constructor(json) {
    this.id = json.id;
    this.totalCost = json.total_cost || 0;
    this.isOpen = json.is_open || false;
    this.datePlacedString = json.datetime_placed;
    this.datePlaced = json.datetime_placed? new Date(json.datetime_placed) : null;
    this.isPlaced = this.datePlaced != null;
    this.nextSaleStartDateString = json.next_sale_start_datetime;
    this.nextSaleStartDate = json.next_sale_start_datetime? new Date(json.next_sale_start_datetime) : null;
    this.nextPickupDateString = json.next_pickup_date;
    this.nextPickupDate = json.next_pickup_date? new Date(json.next_pickup_date) : null;
    this.formattedPickupTime = json.formatted_pickup_time;
    this.pickupLocationName = json.pickup_location_name;
    this.foodItems = [];
    for (let foodItem of json.food_items) {
      this.foodItems.push(new FoodItem(foodItem));
    };
    
  }
}
