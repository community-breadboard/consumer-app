
import { Injectable } from '@angular/core';
import { State } from '../models/state';
import { Observable } from 'rxjs/Observable';
import { Response }  from '@angular/http';
import { Storage } from "@ionic/storage";
import { AuthHttp } from 'angular2-jwt';
import { FoodCategory } from '../models/food-category';
import { Consumer } from '../models/consumer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/throw';
import _ from "lodash";


@Injectable()
export class DataService {

	baseUrl: string = 'http://localhost:3000';
	foodItemsForSaleUrl = this.baseUrl + '/current_user/food_items_for_sale.json';
	submitOrderUrl = this.baseUrl + '/current_user/submit_order';
	addCreditUrl = this.baseUrl + '/current_user/add_credit';
	authUrl = this.baseUrl + '/user_token';
	currentUserUrl = this.baseUrl + '/current_user';

	state: State = new State();

	public getData(): Observable<State> {
		return this.authHttp.get(this.foodItemsForSaleUrl).map((res: Response) => {

			let foodCategories: FoodCategory[] = [];
			for (let foodCategoryJson of res.json()) {
				foodCategories.push(new FoodCategory(foodCategoryJson));
			}

			this.state.foodCategories = foodCategories;
			return this.state;
		});
	}

	public submitOrder(state: State): Observable<string> {

		let data: any = _.pick(state, ['consumer', 'outstandingOrder']);
		
		return this.authHttp.post(this.submitOrderUrl, data).map((res: Response) => {
			return 'success';
		});
	}
	public addCredit(consumer: Consumer, amount: number): Observable<string> {

		return this.authHttp.post(this.addCreditUrl, {consumer: consumer, amount: amount}).map((res: Response) => {
			return 'success';
		});
	}

	public handleError (error: Response | any) {
		// In a real world app, you might use a remote logging infrastructure
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}

	constructor (
		private storage: Storage,
		private authHttp: AuthHttp,
	) {}

	private objectKeysToSnakeCase(obj: any): any {
		console.log("objectKeysToSnakeCase obj=", obj);
		var snakeCaseObject = {};
		_.forEach(
			obj,
			(value, key) => {
				console.log("v=", value);
				if (_.isPlainObject(value) || _.isArray(value)) {
					value = this.objectKeysToSnakeCase(value);
				}
				snakeCaseObject[_.snakeCase(key)] = value;
			}
		)
		return snakeCaseObject;
	}


/*
	defaultState:State = {
		account: {
			owner: {
				id: 12,
				firstName: 'Cyrus',
				lastName: 'Beer'
			},
			group: {
				members: [
					{
						id: 12,
						firstName: 'Cyrus',
						lastName: 'Beer',
						isResponsibleForPickup: false,
						hasPlacedOrder: false
					},
					{
						id: 13,
						firstName: 'Ruth',
						lastName: 'Ganev',
						isResponsibleForPickup: false,
						hasPlacedOrder: true
					},
					{
						id: 14,
						firstName: 'Sonke',
						lastName: 'Dornblut',
						isResponsibleForPickup: true,
						hasPlacedOrder: false
					},
					{
						id: 15,
						firstName: 'Sarah',
						lastName: 'Cox',
						isResponsibleForPickup: false,
						hasPlacedOrder: true
					}
				]
			},
			balance: 0,
			homeDelivery: true,
			balanceIsLowThreshold: 50,
			firstTime: true
		},
		pickupLocations: [
			{
				id: 1,
				name: 'Seacoast Waldorf School',
				abbreviatedName: 'Waldorf School',
				location: {
					address1: '403 Harold Dow Highway (Route 236)',
					city: 'Eliot',
					stateCode: 'ME',
					zipCode: '03903',
					lat: 43.1412688,
					lng: -70.7883459
				},
				nextPickup: 'Tues May 18, 3-6pm',
				pickupStartTime: '2017-05-18 3pm',
				pickupEndTime: '2017-05-18 6pm',
				available: false,
				unavailableReason: 'past_order_cutoff',
				selected: false
			},
			{
				id: 2,
				name: 'Little Harbour School',
				abbreviatedName: 'Little Harbour',
				location: {
					address1: '50 Clough Drive',
					city: 'Portsmouth',
					stateCode: 'NH',
					zipCode: '03801',
					lat: 43.0667763,
					lng: -70.7541994
				},
				nextPickup: 'Fri May 21, 3-6pm',
				pickupStartTime: '2017-05-18 3pm',
				pickupEndTime: '2017-05-18 6pm',
				available: true,
				unavailableReason: null,
				selected: false
			},
			{
				id: 3,
				name: 'Home Delivery',
				abbreviatedName: 'Home Delivery',
				location: {
					address1: '100 South Street',
					city: 'Portsmouth',
					stateCode: 'NH',
					zipCode: '03903',
					lat: 43.1412688,
					lng: -70.7883459
				},
				nextPickup: 'Tues May 18, 6-8am',
				pickupStartTime: '2017-05-18 6am',
				pickupEndTime: '2017-05-18 8am',
				available: false,
				unavailableReason: 'past_order_cutoff',
				selected: false
			}
		],
		outstandingOrder: null,
		standingOrder: null,
		orderInProgress: {
			foodItems: [],
			pickupLocation: null,
			totalCost: 0
		},
		foodCategories: [
			{
				id: 1,
				label: 'Bread',
				imageSvgName: 'bread.jpeg',
				quantityOrdered: 0,
				expanded: false,
				foodItems: [
					{

						id: 1,
						name: 'Country Levain',
						quantityOrdered: 0,
						unitLabelSingular: 'loaf',
						unitLabelPlural: 'loaves',
						unitCost: 6,
						description: 'A rustic levain blending three excellent flours.',
						ingredients: 'Organic white wheat flour, water, organic whole rye flour, sifted whole wheat flour, sea salt',
						image: 'country_levain.jpg',
						producerEntity: {
							name: 'Juniper Cottage Bake Shop'
						}
					},
					{
						id: 2,
						name: 'Spelt Boule',
						quantityOrdered: 0,
						unitLabelSingular: 'boule',
						unitLabelPlural: 'boules',
						unitCost: 6,
						description: 'Spelt flour gives this bread its great texture and slightly nutty flavor. Low gluten.',
						ingredients: 'Organic white spelt flour, water, organic whole spelt flour, sea salt',
						image: 'spelt_boule.jpg',
						producerEntity: {
							name: 'Juniper Cottage Bake Shop'
						}
					},
					{
						id: 3,
						name: 'Maine Mountain Bread',
						quantityOrdered: 0,
						unitLabelSingular: 'boule',
						unitLabelPlural: 'boules',
						unitCost: 6.75,
						description: 'Hearty, nutritious and delicious. A mix of pumpkin, sunflower and sesame seeds encase a loaf baked with Maine grown heritage wheat. A beautiful bread',
						ingredients: 'Organic white wheat flour, water, organic sifted whole wheat flour, organic pumpkin, sunflower and sesame seeds, sea salt',
						image: 'mountain.jpg',
						producerEntity: {
							name: 'Juniper Cottage Bake Shop'
						}
					}
				]
			},
			{
				id: 2,
				label: 'Dairy / Eggs',
				imageSvgName: 'dairy.jpeg',
				quantityOrdered: 0,
				expanded: false,
				foodItems: [
					{
						id: 4,
						name: 'Milk',
						quantityOrdered: 0,
						unitLabelSingular: 'gallon',
						unitLabelPlural: 'gallons',
						unitCost: 5,
						description: '',
						ingredients: '',
						producerEntity: {
							name: 'Benedikt Dairy'
						}
					},
					{
						id: 5,
						name: 'Eggs',
						quantityOrdered: 0,
						unitLabelSingular: 'dozen',
						unitLabelPlural: 'dozen',
						unitCost: 6,
						description: '',
						ingredients: '',
						producerEntity: {
							name: 'Tuckaway Farm'
						}
					}
				]
			}
			,
			{
				id: 3,
				label: 'Dry Goods',
				image: 'drygoods.jpeg',
				quantityOrdered: 0,
				expanded: false,
				foodItems: [
					{
						id: 6,
						name: 'Rolled Oats',
						quantityOrdered: 0,
						unitLabelSingular: 'bag',
						unitLabelPlural: 'bags',
						unitCost: 8,
						description: '',
						ingredients: '',
						producer: ''
					},
					{
						id: 7,
						name: 'Brown Rice',
						quantityOrdered: 0,
						unitLabelSingular: 'bag',
						unitLabelPlural: 'bags',
						unitCost: 8,
						description: '',
						ingredients: '',
						producer: ''
					}

				]
			},
			{
				id: 4,
				label: 'Ferments',
				image: 'ferments.jpeg',
				quantityOrdered: 0,
				expanded: false,
				foodItems: [
					{
						id: 8,
						name: 'Sauerkraut',
						quantityOrdered: 0,
						unitLabelSingular: 'jar',
						unitLabelPlural: 'jars',
						unitCost: 8,
						description: '',
						ingredients: '',
						producer: ''
					},
					{
						id: 9,
						name: 'Ruby Kraut',
						quantityOrdered: 0,
						unitLabelSingular: 'jar',
						unitLabelPlural: 'jars',
						unitCost: 8,
						description: '',
						ingredients: '',
						producer: ''
					}

				]
			},
			{
				id: 5,
				label: 'Flowers',
				image: 'flowers.jpeg',
				quantityOrdered: 0,
				expanded: false,
				foodItems: [
					{
						id: 10,
						name: 'Assortment',
						quantityOrdered: 0,
						unitLabelSingular: 'bunch',
						unitLabelPlural: 'bunches',
						unitCost: 8,
						description: '',
						ingredients: '',
						producer: ''
					}
				]
			},
			{
				id: 6,
				label: 'Meat',
				image: 'meat.jpeg',
				quantityOrdered: 0,
				expanded: false,
				foodItems: [
					{
						id: 11,
						name: 'Ground Beef',
						quantityOrdered: 0,
						unitLabelSingular: 'pound',
						unitLabelPlural: 'pounds',
						unitCost: 8,
						description: '',
						ingredients: '',
						producer: ''
					},
					{
						id: 12,
						name: 'Hot Dogs',
						quantityOrdered: 0,
						unitLabelSingular: 'pack',
						unitLabelPlural: 'packs',
						unitCost: 8,
						description: '',
						ingredients: '',
						producer: ''
					}

				]
			},
			{
				id: 7,
				label: 'Roots / Storage',
				image: 'roots.jpeg',
				quantityOrdered: 0,
				expanded: false,
				foodItems: [
					{
						id: 13,
						name: 'Assortment',
						quantityOrdered: 0,
						unitLabelSingular: 'bunch',
						unitLabelPlural: 'bunches',
						unitCost: 8,
						description: '',
						ingredients: '',
						producer: ''
					}
				]
			},
			{
				id: 8,
				label: 'Honey / Jam / Syrup',
				image: 'sweets.jpeg',
				quantityOrdered: 0,
				expanded: false,
				foodItems: [
					{
						id: 14,
						name: 'Honey',
						quantityOrdered: 0,
						unitLabelSingular: 'jar',
						unitLabelPlural: 'jars',
						unitCost: 5,
						description: 'N/A',
						ingredients: '',
						producer: ''
					},
					{
						id: 15,
						name: 'Jam',
						quantityOrdered: 0,
						unitLabelSingular: 'jar',
						unitLabelPlural: 'jars',
						unitCost: 8,
						description: '',
						ingredients: '',
						producer: ''
					},
					{
						id: 16,
						name: 'Maple Syrup',
						quantityOrdered: 0,
						unitLabelSingular: 'jar',
						unitLabelPlural: 'jars',
						unitCost: 8,
						description: '',
						ingredients: '',
						producer: ''
					}
				]
			}

		],
	}
	*/
}
