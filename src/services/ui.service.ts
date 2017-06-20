
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Loading } from 'ionic-angular';


@Injectable()
export class UiService {

	constructor(
		private alertCtrl: AlertController,
		private loadingCtrl: LoadingController
	) {}
	loading: Loading;

	public showLoading() {
		this.loading = this.loadingCtrl.create({
			content: 'Please wait...',
			dismissOnPageChange: true
		});
		this.loading.present();
	}

	public showError(text) {
		this.loading.dismiss();

		let alert = this.alertCtrl.create({
			title: 'Fail',
			subTitle: text,
			buttons: ['OK']
		});
		alert.present(prompt);
	}
}
