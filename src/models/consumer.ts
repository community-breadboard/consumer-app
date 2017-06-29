
import {Family} from './family';

export class Consumer {
	email?: string;
	firstName: string;
	lastName: string;
	type?: string;
	balance?: number;
	family?: Family;

	constructor(json: any) {
		this.firstName = json.first_name;
		this.lastName = json.last_name;
		this.balance = json.balance;
		this.email = json.email;
		this.family = new Family(json.family);
	}
}
