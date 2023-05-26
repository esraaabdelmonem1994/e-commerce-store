import { Injectable, Renderer2 } from '@angular/core';
import { of, throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { RoleEnum } from '../enums/role.enum';
import { StorageEnum } from '../enums/storage.enum';

@Injectable({ providedIn: 'root' })
export class HelperService {
	currentuser: any;

	constructor(private translateService: TranslateService) {
		this.currentuser = this.getLocalStorage(StorageEnum.CurrentUser);
	 }

	setLocalStorage(key: string, obj: string | JSON | Object) {
		let objStr = JSON.stringify(obj)
		localStorage.setItem(key, objStr);
	}

	getLocalStorage<T = any>(key: string): T {
		let objStr = localStorage.getItem(key);
		let obj = JSON.parse(objStr || '{}');
		return obj as T;
	}

	removeLocalStorage(key: string) {
		localStorage.removeItem(key);
	}

	getUsers() {
		const users = [
			{ username: 'admin', password: 'admin', roleId: RoleEnum.Admin },
			{ username: 'user', password: 'user', roleId: RoleEnum.User }
		];
		return users;
	}

	getUser(user: any) {
		const users = this.getUsers();
		const index = users.findIndex((row) => row.username === user.username);
		if (index == -1) {
			return throwError(() => new Error('InvalidCredential'));
		} else {
			return of(users[index]);
		}
	}

	isAdmin() {
		let currentuser = this.getLocalStorage(StorageEnum.CurrentUser);
		return (currentuser.roleId == RoleEnum.Admin);
	}

	isUser() {
		let currentuser = this.getLocalStorage(StorageEnum.CurrentUser);
		return (currentuser.roleId == RoleEnum.User);
	}

	setCurrentUser(user: any){
		this.currentuser = user;
	}

	changeLanguage(renderer2: Renderer2, lang: string): void {
		this.translateService.use(lang).subscribe(x => {
			this.setLocalStorage(StorageEnum.Language, lang);
			renderer2.setAttribute(document.querySelector('html'), 'dir', this.translateService.instant('dir')); // translate dir in index page
		});
	}

	setDefaultLang(renderer2: Renderer2, lang: string): void {
		this.translateService.setDefaultLang(lang);
		let storageLanguage = this.getLocalStorage<string>(StorageEnum.Language);
		let currentLanguage: string;
		if (typeof storageLanguage == 'string') {
			currentLanguage = this.getLocalStorage<string>(StorageEnum.Language);
		} else {
			currentLanguage = lang
		}
		this.changeLanguage(renderer2, currentLanguage);
	}

}