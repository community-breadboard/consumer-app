import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { Events } from 'ionic-angular';

@Component({
	selector: 'page-scenarios',
	templateUrl: 'scenarios.html'
})

export class ScenariosPage {

	scenario: string;

	scenarios: any = [
		{
			id:'first_time',
			label: 'First Time'
		},
		{
			id:'balance_low',
			label: 'Balance Low'
		},
		{
			id:'balance_zero',
			label: 'Balance Zero'
		},
		{
			id:'outstanding_order',
			label: 'Order Placed'
		},
		{
			id:'new_order_standing',
			label: 'New Order (With Standing Order)'
		},
		{
			id:'new_order_no_standing',
			label: 'New Order (No Standing Order)'
		},
		{
			id:'order_in_progress',
			label: 'Order in Progress'
		}

	];

	constructor(public navCtrl: NavController, private dataService: DataService, private events: Events) {

	}

	selectScenario(scenario: string): void {
		this.scenario = scenario;
		this.dataService.setScenario(scenario);
		this.events.publish('account:changed');
	}
}
