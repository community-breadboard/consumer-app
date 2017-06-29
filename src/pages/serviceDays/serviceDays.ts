import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-service-days',
  templateUrl: 'serviceDays.html'
})
export class ServiceDaysPage {

	ionViewCanEnter() {
		return this.authService.isAuthenticated();
	}

	constructor(
		public navCtrl: NavController,
		private authService: AuthService
	) {}
}
