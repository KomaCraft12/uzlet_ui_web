import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './add-products/add-products.component'; // AddProductsComponent importálása
import { AddStockComponent } from './add-stock/add-stock.component';
import { ProductsComponent } from './products/products.component';
import { AddDiscountComponent } from './add-discount/add-discount.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { PrintLabelComponent } from './print-label/print-label.component';
import { AddCouponsComponent } from './add-coupons/add-coupons.component';
import { CouponsComponent } from './coupons/coupons.component';

const routes: Routes = [
  {
    path: '', // Alapértelmezett admin útvonal
    component: AddProductsComponent, // Az alap admin komponens
  },
  {
    path: 'add-products',
    component: AddProductsComponent, // Az add-products komponens
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'add-stock',
    component: AddStockComponent
  },
  {
    path: 'add-discount',
    component: AddDiscountComponent
  },
  {
    path: 'add-categories',
    component: AddCategoriesComponent
  },
  {
    path: 'print-label',
    component: PrintLabelComponent
  },
  {
    path: 'add-coupons',
    component: AddCouponsComponent
  },
  {
    path: 'coupons',
    component: CouponsComponent
  }
  // További admin útvonalak itt, ha szükségesek
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
