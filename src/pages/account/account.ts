import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'page-account',
	templateUrl: 'account.html'
})
export class AccountPage {


	constructor(public navCtrl: NavController, private dataService: DataService) {

	}

}
