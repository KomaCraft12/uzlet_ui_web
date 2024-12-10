import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrl: './add-stock.component.scss'
})
export class AddStockComponent {

  stock = {
    product_id: null,
    quantity: null
  };

  barcode: string = '';
  isScanning: boolean = false;
  product: any = null;

  constructor(private http: HttpService) {
    // get product_id from cookie
    const barcode_cokiee = document.cookie.split(';').find(cookie => cookie.includes('barcode'));
    let barcode = barcode_cokiee ? barcode_cokiee.split('=')[1] : undefined;
    console.log('Barcode:', barcode);
    if (barcode && barcode.includes("undefined") === false) {
      this.getProductData(barcode);
      // delete barcode cookie
      document.cookie = 'barcode=undefined;';
    }
  }



  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.isScanning) {
      this.isScanning = true;
      this.barcode = '';
    }

    if (event.key === 'Enter') {
      this.barcode = this.barcode.replaceAll('ö', '0'); // Csak számokat hagyunk meg
      console.log('Beolvasott vonalkód:', this.barcode);
      this.isScanning = false;
      this.getProductData(this.barcode);
    } else {
      this.barcode += event.key;
    }
  }

  onSubmit() {
    this.http.post('/stock-entries', this.stock).subscribe(
      response => {
        console.log('Stock added:', response);
        // Reset form
        this.stock = {
          product_id: null,
          quantity: null
        };
      },
      error => {
        console.error('Error adding stock:', error);
      }
    );
  }

  getProductData(barcode: string) {
    this.http.get('/products/barcode/' + barcode).subscribe(
      (product: any) => {
        console.log('Válasz:', product);
        if (product) {
          this.stock.product_id = product.id;
          this.product = product;
        }
      },
      (error) => {
        console.error('Hiba a termék beolvasásakor:', error);
        this.product = null;
      }
    );
  }

}
