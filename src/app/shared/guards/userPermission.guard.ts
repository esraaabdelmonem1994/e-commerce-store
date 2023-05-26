import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from '../services/helper.service';
import { NotifyService } from '../services/notify.service';

@Injectable({
	providedIn: 'root'
})
export class UserPermissionGuard implements CanActivate {

	constructor(
		private HelperService: HelperService,
		private translateService: TranslateService,
		private notifyService: NotifyService
	) { }

	canActivate(): boolean {
		const isUser = this.HelperService.isUser();
		if (!isUser) {
			this.notifyService.error(this.translateService.instant('InvalidPermissionMsg'));
			return false
		}
		return true;
	}

}
