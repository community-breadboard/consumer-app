import { Address } from './address';

export class OrderPickupSchedule {
/*	json.sale_start_day_of_week @user.family.order_pickup_schedule.sale_start_day_of_week
	json.sale_start_hour @user.family.order_pickup_schedule.sale_start_hour
	json.sale_start_minute @user.family.order_pickup_schedule.sale_start_minute
	json.sale_end_day_of_week @user.family.order_pickup_schedule.sale_end_day_of_week
	json.sale_end_hour @user.family.order_pickup_schedule.sale_end_hour
	json.sale_end_minute @user.family.order_pickup_schedule.sale_end_minute
	json.pickup_day_of_week @user.family.order_pickup_schedule.pickup_day_of_week
	json.pickup_start_hour @user.family.order_pickup_schedule.pickup_start_hour
	json.pickup_start_minute @user.family.order_pickup_schedule.pickup_start_minute
	json.pickup_end_hour @user.family.order_pickup_schedule.pickup_end_hour
	json.pickup_end_minute @user.family.order_pickup_schedule.pickup_end_minute
	json.next_pickup_date @user.family.order_pickup_schedule.next_pickup_date
	json.formatted_pickup_time @user.family.order_pickup_schedule.formatted_pickup_time
	json.address do
		json.name @user.family.order_pickup_schedule.address.name
		json.street @user.family.order_pickup_schedule.address.street
		json.street2 @user.family.order_pickup_schedule.address.street2
		json.city @user.family.order_pickup_schedule.address.city
		json.state @user.family.order_pickup_schedule.address.state
		json.zip_code @user.family.order_pickup_schedule.address.zip_code
	end
*/

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
