import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { CreditPage } from '../credit/credit';
import { LoginPage } from '../login/login';
import { State } from '../../models/state';
@Component({
	selector: 'page-account',
	templateUrl: 'account.html'
})
export class AccountPage implements OnInit {

	state: State;

	constructor(
		public navCtrl: NavController,
		private dataService: DataService) {
	}

	buyCredit() {
		this.navCtrl.push(CreditPage);
	}
	logout() {
		this.navCtrl.setRoot(LoginPage);
	}

	ngOnInit() {
		this.state = this.dataService.getData();
	}

}
