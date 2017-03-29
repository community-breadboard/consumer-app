import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { HomePage } from "../home/home";
@Component({
	selector: 'page-account',
	templateUrl: 'account.html'
})
export class AccountPage {

	scenario: String = '';

	constructor(public navCtrl: NavController, private dataService: DataService) {

	}

	selectScenario(scenario: string): void {
		this.dataService.setScenario(scenario);
		this.navCtrl.setRoot(HomePage);
	}
}
