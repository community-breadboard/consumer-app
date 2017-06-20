import { Injectable } from '@angular/core';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/throw';
import { Http, Response, RequestOptions, Headers }  from '@angular/http';
import { DataService } from './data.service';
import { HelperService } from './helper.service';
import { Storage } from "@ionic/storage";
import { Consumer } from '../models/consumer';

@Injectable()
export class AuthService {

	private user: any;

	isAuthenticated(): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			this.storage.get('token').then((val) => {
				resolve(val && !this.jwtHelper.isTokenExpired(val));
			});
		});

	}

	public getUser() {
		return this.user;
	}
	public setUser(user: Consumer): void {
		this.user = user;
	}

	public login(credentials) : Observable<string> {

		if (credentials.email === null || credentials.password === null) {

			return Observable.throw("Please insert credentials");

		} else {

			let headers = new Headers({ 'Content-Type': 'application/json' });
			let options = new RequestOptions({ headers: headers });

			return this.http.post(this.dataService.baseUrl + '/user_token', {auth: credentials}, options)
				.map((res: Response) => res.json())
				.mergeMap((jwtObject) => {
					this.storage.set('token', jwtObject.jwt);

					return this.authHttp.get(this.dataService.baseUrl + '/me.json').map((res: Response) => {
						this.user = this.helperService.convertToCamelCase(res.json());
						return 'success';
					})
				})
				.catch(this.dataService.handleError)

		}
	}


	public logout() : void {
		this.storage.remove('token');
	}

	constructor(
		private http: Http,
		private authHttp: AuthHttp,
		private jwtHelper: JwtHelper,
		private dataService: DataService,
		private helperService: HelperService,
		private storage: Storage) {}
}
