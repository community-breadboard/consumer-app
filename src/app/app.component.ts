import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { UiService } from '../services/ui.service';
import { AuthService } from '../services/auth.service';

@Component({
	templateUrl: 'app.html',
	providers: [UiService, StatusBar, SplashScreen]
})
export class MyApp {

	rootPage:any;


	constructor(
			platform: Platform,
			statusBar: StatusBar,
			splashScreen: SplashScreen,
			private authService: AuthService ) {
				platform.ready().then(() => {
					// Okay, so the platform is ready and our plugins are available.
					// Here you can do any higher level native things you might need.
					statusBar.styleDefault();
					splashScreen.hide();

					this.authService.isAuthenticated().then((isValid) => {
						if (!isValid) {
							this.rootPage = LoginPage;
						} else {
							this.authService.getUser()
								.subscribe((res: string) => {
									this.rootPage = isValid ? TabsPage : LoginPage;
								});
						}
					});

				});
			}
}
