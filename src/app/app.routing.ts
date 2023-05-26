import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';
import { AdminPermissionGuard } from './shared/guards/adminPermission.guard';
import { UserPermissionGuard } from './shared/guards/userPermission.guard';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				redirectTo: 'login',
				pathMatch: 'full'
			},
			{
				path: 'login',
				loadComponent: () => import('./account/login/login').then(c => c.LoginComponent)
			},
			{
				path: 'admin',
				canActivate: [AdminPermissionGuard],
				children: [
					{
						path: 'product-list',
						loadComponent: () => import('./portals/admin/products/productList/productList'
						).then(c => c.ProductList)
					},
				]
			},
			{
				path: 'user',
				canActivate: [UserPermissionGuard],
				children: [
					{
						path: 'category-list',
						loadComponent: () => import('./portals/user/categories/categoryList/categoryList'
						).then(c => c.CategoryList)
					},
				]
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes), MatSnackBarModule],
	providers:[MatSnackBarModule],
	exports: [RouterModule]
})
export class AppRoutingModule { }
