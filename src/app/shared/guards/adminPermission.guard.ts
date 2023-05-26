import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifyService } from '../services/notify.service';
import { HelperService } from '../services/helper.service';

@Injectable({
	providedIn: 'root'
})
export class AdminPermissionGuard implements CanActivate {

	constructor(
		private HelperService: HelperService,
		private translateService: TranslateService,
		private notifyService: NotifyService
	) { }
	canActivate(): boolean {
		const isAdmin = this.HelperService.isAdmin();
		if (!isAdmin) {
			this.notifyService.error(this.translateService.instant('InvalidPermissionMsg'));
			return false
		}
		return true;
	}

}
