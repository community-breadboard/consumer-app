import { Injectable } from '@angular/core';
import { State } from '../models/state';
import _ from "lodash";

@Injectable()
export class DataService {

	private scenario: string = 'first_time';
	private cache: any = {};

	setScenario(scenario: string): void {
		this.scenario = scenario;
	}

	getData(): State {
		if (this.cache[this.scenario]) {
			return this.cache[this.scenario];
		}

		var state: State = _.cloneDeep(this.defaultState);
		if (this.scenario === 'balance_low') {
			state.account.balance = 20;
			state.account.firstTime = false;
		}
		else if (this.scenario === 'balance_zero') {
			state.account.balance = 0;
			state.account.firstTime = false;
		}
		else if (this.scenario === 'outstanding_order') {
			state.account.balance = 100;
			state.account.firstTime = false;
			state.outstandingOrder = {
				pickupLocation: _.cloneDeep(state.pickupLocations[0]),
				foodItems: [
					_.cloneDeep(state.foodCategories[0].foodItems[0]),
					_.cloneDeep(state.foodCategories[2].foodItems[0]),
					_.cloneDeep(state.foodCategories[5].foodItems[0])
				],
				alertSet: false,
				addedToCalendar: false
			}
			_.each(state.outstandingOrder.foodItems, function(foodItem) {
				foodItem.quantityOrdered = 1;
			});
		}
		else if (this.scenario === 'order_in_progress') {
			state.account.balance = 100;
			state.account.firstTime = false;
			state.foodCategories[0].quantityOrdered = 1;
			state.foodCategories[0].foodItems[0].quantityOrdered = 1;
			state.foodCategories[2].quantityOrdered = 1;
			state.foodCategories[2].foodItems[0].quantityOrdered = 1;
			state.foodCategories[4].quantityOrdered = 1;
			state.foodCategories[4].foodItems[0].quantityOrdered = 1;
		}
		else if (this.scenario === 'new_order_no_standing') {
			state.account.balance = 100;
			state.account.firstTime = false;
		}
		else if (this.scenario === 'new_order_standing') {
			state.account.balance = 100;
			state.account.firstTime = false;
			state.standingOrder = {
				pickupLocation: _.cloneDeep(state.pickupLocations[0]),
				foodItems: [
					_.cloneDeep(state.foodCategories[0].foodItems[0]),
					_.cloneDeep(state.foodCategories[2].foodItems[0]),
					_.cloneDeep(state.foodCategories[5].foodItems[0])
				],
			}
			_.each(state.standingOrder.foodItems, function(item) {
				item.quantityOrdered = 1;
			});
			state.standingOrder.pickupLocation.selected === true;
		}

		this.cache[this.scenario] = state;
		return state;
	}


	defaultState:State = {
		account: {
			owner: {
				firstName: 'Cyrus',
				lastName: 'Beer'
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
				image: 'bread.jpeg',
				quantityOrdered: 0,
				expanded: false,
				foodItems: [
					{
						id: 1,
						name: 'Oma\'s Best',
						quantityOrdered: 0,
						unitLabelSingular: 'loaf',
						unitLabelPlural: 'loaves',
						unitCost: 8,
						description: 'A traditional Danish / northern German-style pan loaf with a complex hearty flavor.',
						ingredients: 'Organic dark rye flour, organic whole spelt flour, water, organic sunflower seeds, organic flax seeds, organic sesame seeds, sea salt',
						producer: 'Juniper Cottage Bake Shop'
					},
					{
						id: 2,
						name: 'Sourdough',
						quantityOrdered: 0,
						unitLabelSingular: 'loaf',
						unitLabelPlural: 'loaves',
						unitCost: 8,
						description: '',
						ingredients: '',
						producer: 'Juniper Cottage Bake Shop'
					},
					{
						id: 3,
						name: 'Spent Grain',
						quantityOrdered: 0,
						unitLabelSingular: 'loaf',
						unitLabelPlural: 'loaves',
						unitCost: 8,
						description: '',
						ingredients: '',
						producer: 'Juniper Cottage Bake Shop'
					}
				]
			},
			{
				id: 2,
				label: 'Dairy / Eggs',
				image: 'dairy.jpeg',
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
						producer: ''
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
						producer: ''
					}
				]
			},
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
				label: 'Sweets',
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

}
