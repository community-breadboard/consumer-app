import { Component, OnInit } from '@angular/core';

import { NavController, Events, ToastController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { Account } from '../../models/account';

@Component({
	selector: 'page-account',
	templateUrl: 'credit.html'
})
export class CreditPage implements OnInit {

	predefinedAmounts: number[];
	amountToAdd: number;
	account: Account;
	alertMessage: String;
	showAlertMessage: boolean = false;
	alertClass: String;

	constructor(
		public navCtrl: NavController,
		private dataService: DataService,
		private events: Events,
		public toastCtrl: ToastController) {

	}

	addCredit() {
		this.account.balance = +this.account.balance + +this.amountToAdd;
		this.events.publish('account:changed');
		this.showToast(this.amountToAdd);
	}

	showToast(amt) {
		let toast = this.toastCtrl.create({
			message: '$' + amt + ' was added to your account',
			duration: 3000
		});
		toast.present();
	}

	getData() {
		this.account = this.dataService.getData().account;
	}

	private determineAlert() {
		if (this.account.firstTime === true) {
			this.showAlertMessage = true;
			this.alertClass = "";
			this.alertMessage = "Please add credit to your account";
		} else if (this.account.balance <= 0) {
			this.showAlertMessage = true;
			this.alertMessage = "Your account has a 0 balance.  Please add credit."
			this.alertClass = "danger";
		} else if (this.account.balance <= this.account.balanceIsLowThreshold) {
			this.showAlertMessage = true;
			this.alertMessage = "Your account balance is low"
			this.alertClass = "";
		}

	}

	ngOnInit() {
		this.getData();
		this.predefinedAmounts = [100,200,400];
		this.amountToAdd = 200;
		this.determineAlert();
	}

}
