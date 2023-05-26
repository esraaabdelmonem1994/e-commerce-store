import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

	constructor() { };

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let spinner = document.getElementById('spinner');
		return next.handle(req).pipe(tap(evt => {
			spinner?.classList.toggle('block-display');
		}));

	}
}