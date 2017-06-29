import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ServiceDaysPage } from '../pages/serviceDays/serviceDays';
import { AccountPage } from '../pages/account/account';
import { HomePage } from '../pages/home/home';
import { CreditPage } from '../pages/credit/credit';
import { OrderModal } from '../modals/order/order';
import { ItemModal } from '../modals/item/item';
import { WelcomeModal } from '../modals/welcome/welcome';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { IonicStorageModule } from '@ionic/storage';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';


export function getAuthHttp(http) {

	let storage = new Storage({});

	return new AuthHttp(new AuthConfig({
		headerPrefix: 'Bearer',
		noJwtError: true,
		globalHeaders: [{'Accept': 'application/json'}],
		tokenGetter: (() => storage.get('token')),
	}), http);
}


@NgModule({
	declarations: [
		MyApp,
		ServiceDaysPage,
		AccountPage,
		HomePage,
		CreditPage,
		OrderModal,
		ItemModal,
		WelcomeModal,
		TabsPage,
		LoginPage
	],
	imports: [
		BrowserModule,
		HttpModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot()
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		ServiceDaysPage,
		AccountPage,
		HomePage,
		CreditPage,
		OrderModal,
		ItemModal,
		WelcomeModal,
		TabsPage,
		LoginPage
	],
	providers: [
		StatusBar,
		AuthService,
		DataService,
		JwtHelper,
		SplashScreen,
		{
			provide: ErrorHandler,
			useClass: IonicErrorHandler
		},
		{
			provide: AuthHttp,
			useFactory: getAuthHttp,
			deps: [Http]
		}
	]
})
export class AppModule {}
