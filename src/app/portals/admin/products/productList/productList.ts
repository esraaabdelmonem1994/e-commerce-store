import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpService } from '../../../../shared/services/http.service'
import { NotifyService } from 'src/app/shared/services/notify.service';
import { ProductAddEdit } from '../productAddEdit/productAddEdit';

@Component({
	standalone: true,
	templateUrl: './productList.html',
	styleUrls: ['./productList.scss'],
	imports: [FormsModule, CommonModule, MatButtonModule,
		MatIconModule,
		TranslateModule,
		MatTableModule,
		MatDialogModule,
		MatPaginatorModule
	]
})

export class ProductList {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	dataList: any[] = [];
	categoryList: any[] = [];
	displayedColumns: string[] = ['image', 'category', 'title', 'price', 'buttons'];
	dataSource!: MatTableDataSource<any[]>;

	constructor(
		private httpService: HttpService,
		public dialog: MatDialog,
		private translateService: TranslateService,
		private notifyService: NotifyService
	) { }

	ngOnInit() {
		this.getProductList();
		this.getCategoryList();
	}

	getProductList() {
		const endPoint = 'products';
		this.httpService.get<any[]>(endPoint).subscribe({
			next: (response: any[]) => {
				this.dataList = response;
				this.updateDataSource();
			},
			error: errorResponse => {
				this.notifyService.error(this.translateService.instant(errorResponse.message));
			}
		})
	}

	getCategoryList() {
		const httpEndPoint = 'products/categories';
		this.httpService.get<any[]>(httpEndPoint).subscribe(
			{
				next: (response: any) => {
					this.categoryList = response
				},
				error: errorResponse => {
					this.notifyService.error(this.translateService.instant(errorResponse.message));
				}
			})
	}

	updateDataSource() {
		this.dataSource = new MatTableDataSource<any>(this.dataList);
		this.dataSource.paginator = this.paginator;
	}

	async openProductAddEditPopup(row: any) {
		const data = { product: Object.assign({}, row), categories: this.categoryList };
		const dialogRef = this.dialog.open(ProductAddEdit, { width: '600px', data: data });
		dialogRef.afterClosed().subscribe(result => {
			if (result && result.id) {
				if (row.id == null) {
					this.dataList.push(result);
				} else {
					const index = this.dataList.findIndex((obj: any) => obj.id == row.id);
					this.dataList[index] = result;
				}
				this.updateDataSource();
			}
		});
	}

	delete(row: any) {
		const endPoint = 'products/' + row.id;
		this.httpService.delete<any>(endPoint).subscribe(
			{
				next: (response: any) => {
					const index = this.dataList.findIndex((obj: any) => obj.id == row.id);
					this.dataList.splice(index, 1);
					this.updateDataSource();
				},
				error: errorResponse => {
					this.notifyService.error(this.translateService.instant(errorResponse.message));
				}
			})
	}

}