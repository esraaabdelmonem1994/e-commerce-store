import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { HttpService } from '../../../../shared/services/http.service'
import { NotifyService } from 'src/app/shared/services/notify.service';

@Component({
	standalone: true,
	encapsulation: ViewEncapsulation.None,
	templateUrl: './productAddEdit.html',
	styleUrls: ['./productAddEdit.scss'],
	imports: [FormsModule, CommonModule, MatButtonModule,
		MatInputModule,
		TranslateModule,
		MatDialogModule,
		MatGridListModule,
		MatSelectModule
	]
})

export class ProductAddEdit {

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private httpService: HttpService,
		private DialogRef: MatDialogRef<ProductAddEdit>,
		private translateService: TranslateService,
		private notifyService: NotifyService
	) { }

	ngOnInit() { }

	justifyResponseAndCloseDialog(response: any) {
		this.data.product = response;
		this.DialogRef.close(this.data.product);
	}

	createProduct() {
		const endPoint = 'products';
		this.httpService.post<any>(endPoint, this.data.product).subscribe(
			{
				next: (response: any) => {
					this.justifyResponseAndCloseDialog(response);
				},
				error: errorResponse => {
					this.notifyService.error(this.translateService.instant(errorResponse.message));
				}
			})
	}

	updateProduct() {
		const endPoint = 'products/' + this.data.product.id;
		this.httpService.put<any>(endPoint, this.data.product).subscribe(
			{
				next: (response: any) => {
					this.justifyResponseAndCloseDialog(response);
				},
				error: errorResponse => {
					this.notifyService.error(this.translateService.instant(errorResponse.message));
				}
			})
	}

	save(frm: NgForm) {
		if (frm.invalid) {
			this.notifyService.error(this.translateService.instant('InvalidFormMsg'));
			return;
		}

		if (this.data.product.id == null) {
			this.createProduct();
		} else {
			this.updateProduct();
		}
	}

}