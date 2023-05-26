import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HttpService {
	apiUrl = 'https://fakestoreapi.com/';

	constructor(private HttpClient: HttpClient,) { }

	get<T>(endPoint: string) {
		let endPointUrl = this.apiUrl + endPoint;
		return this.HttpClient.get<T>(endPointUrl);
	}

	post<T>(endPoint: string, model: any) {
		let endPointUrl = this.apiUrl + endPoint;
		return this.HttpClient.post<T>(endPointUrl, model);
	}

	put<T>(endPoint: string, model: any) {
		let endPointUrl = this.apiUrl + endPoint;
		return this.HttpClient.put<T>(endPointUrl, model);
	}

	delete<T>(endPoint: string) {
		let endPointUrl = this.apiUrl + endPoint;
		return this.HttpClient.delete<T>(endPointUrl);
	}

}