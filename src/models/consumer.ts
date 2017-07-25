
import {Family} from './family';
import {Order} from './order';

export class Consumer {
	id: string;
	email?: string;
	firstName: string;
	lastName: string;
	type?: string;
	balance?: number;
  canPlaceOrder: boolean;
  mostRecentOrder?: Order;
	family?: Family;

	constructor(json: any) {
		this.id = json.id;
		this.firstName = json.first_name;
		this.lastName = json.last_name;
		this.balance = json.balance;
		this.email = json.email;
    this.canPlaceOrder = json.can_place_order;
    if (json.most_recent_order) {
      this.mostRecentOrder = new Order(json.most_recent_order);
    }
		this.family = new Family(json.family);
	}
}
