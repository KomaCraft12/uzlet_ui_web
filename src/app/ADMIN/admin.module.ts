import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductsComponent } from './add-products/add-products.component';  // Import the component
import { AdminRoutingModule } from './admin-routing.module';  // AdminRoutingModule importálása
import { FormsModule } from '@angular/forms';
import { AddStockComponent } from './add-stock/add-stock.component';
import { ProductsComponent } from './products/products.component';
import { AddDiscountComponent } from './add-discount/add-discount.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { PrintLabelComponent } from './print-label/print-label.component';
import { AddCouponsComponent } from './add-coupons/add-coupons.component';
import { CouponsComponent } from './coupons/coupons.component';

@NgModule({
  declarations: [AddProductsComponent, AddStockComponent, ProductsComponent, AddDiscountComponent, AddCategoriesComponent, PrintLabelComponent, AddCouponsComponent, CouponsComponent],  // Declare AddProductsComponent only here
  imports: [
    CommonModule, 
    AdminRoutingModule,  // AdminRoutingModule for routing configuration
    FormsModule
  ],
})
export class AdminModule { }
