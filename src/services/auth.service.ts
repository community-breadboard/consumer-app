import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/throw';
import { Http, Response, RequestOptions, Headers }  from '@angular/http';


@Injectable()
export class AuthService {

	baseUrl: string = 'http://localhost:3000';
	jwtJson: any;

	public login(credentials) : Observable<{}> {

		if (credentials.email === null || credentials.password === null) {

			return Observable.throw("Please insert credentials");

		} else {

			let headers = new Headers({ 'Content-Type': 'application/json' });
			let options = new RequestOptions({ headers: headers });

			return this.http.post(this.baseUrl + '/user_token', {auth: credentials}, options)
				.map((res: Response) => res.json())
				.mergeMap((jwtJson) => {
					let authHeaders = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwtJson.jwt });
					let authOptions = new RequestOptions({ headers: authHeaders });

					return this.http.get(this.baseUrl + '/me.json', authOptions).map((res: Response) => res.json())
				})
				.catch(this.handleError)

		}
	}

	constructor(private http: Http) {}

/*
	private extractData(res: Response) {
		let body = res.json();
		this.currentUser = new User(body.jwt);
		return this.currentUser;
	}
*/
	private handleError (error: Response | any) {
		// In a real world app, you might use a remote logging infrastructure
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}

}
