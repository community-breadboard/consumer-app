export class Address {
	name: string;
	street: string;
	street2: string;
	city: string;
	state: string;
	zipCode: string;

	constructor(json: any) {
		this.name = json.name;
		this.street = json.street;
		this.street2 = json.street2;
		this.city = json.city;
		this.state = json.state;
		this.zipCode = json.zip_code;
	}
}
