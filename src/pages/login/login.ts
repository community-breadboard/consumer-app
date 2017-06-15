import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { TabsPage } from '../tabs/tabs';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	loading: Loading;
	registerCredentials = { email: 'edbaker@gmail.com', password: 'eatlocal' };

	constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

	public login() {
		this.showLoading()

		this.auth.login(this.registerCredentials).subscribe(user => {
			if (user) {
				this.nav.setRoot(TabsPage);
			} else {
				this.showError("Access Denied");
			}
		},
		error => {
			this.showError(error);
		});

	}

	showLoading() {
		this.loading = this.loadingCtrl.create({
			content: 'Please wait...',
			dismissOnPageChange: true
		});
		this.loading.present();
	}

	showError(text) {
		this.loading.dismiss();

		let alert = this.alertCtrl.create({
			title: 'Fail',
			subTitle: text,
			buttons: ['OK']
		});
		alert.present(prompt);
	}
}
