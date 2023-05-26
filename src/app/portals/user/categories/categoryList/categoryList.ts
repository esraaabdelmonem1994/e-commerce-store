import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../../shared/services/http.service'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NotifyService } from 'src/app/shared/services/notify.service';

@Component({
	standalone: true,
	templateUrl: './categoryList.html',
	styleUrls: ['./categoryList.scss'],
	imports: [FormsModule, CommonModule, TranslateModule, MatCardModule, MatGridListModule, MatIconModule, MatFormFieldModule, MatInputModule]
})
export class CategoryList {
	categories: any[] = [];
	products: any[] = [];
	filteredRows: any[] = [];
	selectedCategory: string = "";
	columns = 1;

	constructor(
		private httpService: HttpService,
		private translateService: TranslateService,
		private notifyService: NotifyService
	) { }

	ngOnInit() {
		this.getCategoryList();
		this.columns = (window.innerWidth < 400) ? 1 : (window.innerWidth < 800) ? 2 : 3 ;
	}

	handleResize(event: UIEvent) {
		const window = event.target as Window;
		this.columns = (window.innerWidth < 400) ? 1 : (window.innerWidth < 800) ? 2 : 3;
	}

	getCategoryList() {
		const endPoint = 'products/categories';
		this.httpService.get<any[]>(endPoint).subscribe(
			{
				next: (response: any) => {
					this.categories = response;
					this.selectedCategory = response[0];
					this.getCategoryProductList(this.selectedCategory);
				},
				error: errorResponse => {
					this.notifyService.error(this.translateService.instant(errorResponse.message));
				}
			})
	}

	getCategoryProductList(category: string) {
		const endPoint = 'products/category/' + category;
		this.httpService.get<any[]>(endPoint).subscribe(
			{
				next: (response: any) => {
					this.selectedCategory = category;
					this.products = response;
					this.filteredRows = response;
				},
				error: errorResponse => {
					this.notifyService.error(this.translateService.instant(errorResponse.message));
				}
			})
	}

	filterData(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.filteredRows = this.products.filter((row: any) => {
			return (
				(!filterValue) ||
				(row.title && row.title.toLowerCase().indexOf(filterValue.trim().toLowerCase()) > -1) ||
				(row.description && row.description.toLowerCase().indexOf(filterValue.trim().toLowerCase()) > -1)
			)
		});
	}

}
