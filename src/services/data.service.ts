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
			state.account.balanceIsLow = true;
			state.account.firstTime = false;
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
			balanceIsLow: false,
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
		outstandingOrder: {},
		standingOrder: {},
		orderInProgress: {
			items: [],
			pickupLocation: null,
			totalCost: 0
		},
		foodCategories: [
			{
				id: 1,
				label: 'Bread',
				image: 'bread.jpeg',
				amt: 0,
				expanded: false,
				items: [
					{
						id: 1,
						name: 'Oma\'s Best',
						quantity: 0,
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
						quantity: 0,
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
						quantity: 0,
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
				amt: 0,
				expanded: false,
				items: [
					{
						id: 4,
						name: 'Milk',
						quantity: 0,
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
						quantity: 0,
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
				amt: 0,
				expanded: false,
				items: [
					{
						id: 6,
						name: 'Rolled Oats',
						quantity: 0,
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
						quantity: 0,
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
				amt: 0,
				expanded: false,
				items: [
					{
						id: 8,
						name: 'Sauerkraut',
						quantity: 0,
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
						quantity: 0,
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
				amt: 0,
				expanded: false,
				items: [
					{
						id: 10,
						name: 'Assortment',
						quantity: 0,
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
				amt: 0,
				expanded: false,
				items: [
					{
						id: 11,
						name: 'Ground Beef',
						quantity: 0,
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
						quantity: 0,
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
				amt: 0,
				expanded: false,
				items: [
					{
						id: 13,
						name: 'Assortment',
						quantity: 0,
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
				amt: 0,
				expanded: false,
				items: [
					{
						id: 14,
						name: 'Honey',
						quantity: 0,
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
						quantity: 0,
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
						quantity: 0,
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
