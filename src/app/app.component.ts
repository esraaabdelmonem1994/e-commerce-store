import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from './shared/services/helper.service';
import { StorageEnum } from './shared/enums/storage.enum';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	constructor(
		private router: Router,
		private renderer2: Renderer2,
		public helperService: HelperService
	) {}

	ngOnInit() {
		this.helperService.setDefaultLang(this.renderer2, 'en');
	}

	logout(){
		this.helperService.removeLocalStorage(StorageEnum.CurrentUser);
		this.helperService.removeLocalStorage(StorageEnum.Language);
		this.helperService.setCurrentUser({});
		this.router.navigateByUrl('login');
	}
}
