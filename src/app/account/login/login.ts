import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { HelperService } from 'src/app/shared/services/helper.service';
import { StorageEnum } from 'src/app/shared/enums/storage.enum';
import { RoleEnum } from 'src/app/shared/enums/role.enum';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { Subscription } from 'rxjs';

@Component({
	standalone: true,
	templateUrl: './login.html',
	styleUrls: ['./login.scss'],
	imports: [CommonModule, FormsModule, TranslateModule, MatButtonModule,
		MatIconModule,
		MatCardModule,
		MatInputModule
	]

})
export class LoginComponent {
	credential = { username: '', password: '' }
	hidePassword: boolean = true;
	loginSubscription$!: Subscription;

	constructor(
		private router: Router,
		private renderer2: Renderer2,
		private translateService: TranslateService,
		private helperService: HelperService,
		private notifyService: NotifyService
	) { }

	login(frm: NgForm) {
		if (frm.invalid) {
			this.notifyService.error(this.translateService.instant('InvalidFormMsg'));
			return;
		}

		this.loginSubscription$ = this.helperService.getUser(this.credential).subscribe(
			{
				next: (response: any) => {
					this.helperService.setLocalStorage(StorageEnum.CurrentUser, response);
					this.helperService.setCurrentUser(response);
					this.defaultRoleNavigation(response.roleId);
				},
				error: errorResponse => {
					const errMsg = errorResponse.message;
					this.notifyService.error(this.translateService.instant(errMsg));
				}
			})
	}

	defaultRoleNavigation(roleId: number) {
		if (roleId == RoleEnum.Admin) {
			this.router.navigateByUrl('admin/product-list');
		} else if (roleId == RoleEnum.User) {
			this.router.navigateByUrl('user/category-list');
		}
	}

	changeLanguage(lang: string) {
		this.helperService.changeLanguage(this.renderer2, lang);
	}

	ngDestory() {
		this.loginSubscription$.unsubscribe();
	}

}
