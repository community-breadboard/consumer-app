import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { TabsPage } from '../tabs/tabs';
import { UiService } from '../../services/ui.service';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	registerCredentials = { email: 'edbaker@gmail.com', password: 'eatlocal' };

	constructor(private nav: NavController, private auth: AuthService, private uiService: UiService) { }

	public login() {
		this.uiService.showLoading();

		this.auth.login(this.registerCredentials).subscribe(status => {
			if ('success') {
				this.nav.setRoot(TabsPage);
			} else {
				this.uiService.showError("Access Denied");
			}
		},
		error => {
			this.uiService.showError("Access Denied");
		});

	}


}
