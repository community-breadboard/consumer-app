import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/throw';
import { Http, Response, RequestOptions, Headers }  from '@angular/http';
import { DataService } from './data.service';
import { Storage } from "@ionic/storage";
import { Consumer } from '../models/consumer';

@Injectable()
export class AuthService {

	currentUser: Consumer;

	isAuthenticated(): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			this.storage.get('token').then((val) => {
				resolve(val && !this.jwtHelper.isTokenExpired(val));
			});
		});

	}


	public login(credentials) : Observable<string> {

		if (credentials.email === null || credentials.password === null) {

			return Observable.throw("Please insert credentials");

		} else {

			let headers = new Headers({ 'Content-Type': 'application/json' });
			let options = new RequestOptions({ headers: headers });

			return this.http.post(this.dataService.authUrl, {auth: credentials}, options)
				.map((res: Response) => {
					this.storage.set('token', res.json().jwt);
				})
				.catch(this.dataService.handleError)

		}
	}


	public logout() : void {
		this.storage.remove('token');
	}

	constructor(
		private http: Http,
		private jwtHelper: JwtHelper,
		private dataService: DataService,
		private storage: Storage) {}
}
