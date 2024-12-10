import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products: any[] = [];

  constructor(private http: HttpService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<any[]>('/products').subscribe(
      data => {
        this.products = data;
      },
      error => {
        console.error('Error loading products:', error);
      }
    );
  }

  addStock(product: any) {
    document.cookie = 'barcode=' + product.barcode;
    this.router.navigate(['admin/add-stock']);
  }

  printLabel(product: any) {
    document.cookie = 'barcode=' + product.barcode;
    this.router.navigate(['admin/print-label']);
  }
}
