import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
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
		private dataService: DataService,
		private authService: AuthService) {
	}

	buyCredit() {
		this.navCtrl.push(CreditPage);
	}
	logout() {
		this.authService.logout();
		this.navCtrl.setRoot(LoginPage);
	}

	ngOnInit() {
//		this.state = this.dataService.getData();
	}
	ionViewCanEnter() {
		return this.authService.isAuthenticated();
	}


}
