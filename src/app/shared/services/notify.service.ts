import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
	providedIn: 'root'
})

export class NotifyService {
	constructor(
		private translateService: TranslateService,
		private readonly snackBar: MatSnackBar,
	) { }

	openSnackBar(message: string, action: string, className = '', duration = 1000
	) {
		this.snackBar.open(message, action, {
			duration: duration,
			panelClass: [className],
			horizontalPosition: this.translateService.instant('LeftRightPosition'),
			verticalPosition: 'top'
		});
	}

	success(message: string) {
		this.openSnackBar(message, '', 'success-snackbar');
	}

	error(message: string) {
		this.openSnackBar(message, '', 'error-snackbar');
	}

}

