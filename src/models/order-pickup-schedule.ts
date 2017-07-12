import { Address } from './address';

export class OrderPickupSchedule {
	id: string;
	saleStartDayOfWeek: number;
	saleStartHour: number;
	saleStartMinute: number;
	saleEndDayOfWeek: number;
	saleEndHour: number;
	saleEndMinute: number;
	pickupDayOfWeek: number;
	pickupStartHour: number;
	pickupStartMinute: number;
	pickupEndHour: number;
	pickupEndMinute: number;
	nextPickupDateString: string;
	nextPickupDate: Date;
	formattedPickupTime: string;
	address: Address;

	constructor(json) {
		this.id = json.id;
		this.saleStartDayOfWeek = json.sale_start_day_of_week;
		this.saleStartHour = json.sale_start_hour;
		this.saleStartMinute = json.sale_start_minute;
		this.saleEndDayOfWeek = json.sale_end_day_of_week;
		this.saleEndHour = json.sale_end_hour;
		this.saleEndMinute = json.sale_end_minute;
		this.pickupDayOfWeek = json.pickup_day_of_week;
		this.pickupStartHour = json.pickup_start_hour;
		this.pickupStartMinute = json.pickup_start_minute;
		this.nextPickupDateString = json.next_pickup_date;
		this.nextPickupDate = new Date(parseInt(json.next_pickup_date.substring(0,4)), (parseInt(json.next_pickup_date.substring(5,7)) - 1), parseInt(json.next_pickup_date.substring(8)));
		this.formattedPickupTime = json.formatted_pickup_time;
		this.address = new Address(json.address);
	}
}
