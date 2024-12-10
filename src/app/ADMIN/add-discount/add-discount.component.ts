import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../services/http.service';

interface Discount {
  product_id: number | null;
  discount_amount: number | null;
  start_date: string | null;
  end_date: string | null;
}

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.scss']
})
export class AddDiscountComponent implements OnInit {
  discount: Discount = {
    product_id: null,
    discount_amount: null,
    start_date: null,
    end_date: null
  };
  barcode: string = '';
  isScanning: boolean = false;
  product: any = null;

  constructor(private http: HttpService) {}

  ngOnInit() {
    // get barcode from cookie
    const barcodeCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('barcode='));
    if (barcodeCookie) {
      let barcode = barcodeCookie ? barcodeCookie.split('=')[1] : undefined;
      console.log('Barcode from cookie:', this.barcode);
      if (barcode && barcode.includes("undefined") === false) {
        this.getProductData(barcode);
        // delete barcode cookie
        document.cookie = 'barcode=undefined;';
      }
    }
    this.discount.discount_amount = null;
  }

  getProductData(barcode: string) {
    this.http.get('/products/barcode/' + barcode).subscribe(
      (product: any) => {
        console.log('Válasz:', product);
        if (product) {
          this.discount.product_id = product.id;
          this.product = product;
        }
      },
      (error) => {
        console.error('Hiba a termék beolvasásakor:', error);
        this.product = null;
      }
    );
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.isScanning) {
      this.isScanning = true;
      this.barcode = '';
    }

    if (event.key === 'Enter') {
      this.barcode = this.barcode.replaceAll('ö', '0');
      console.log('Scanned barcode:', this.barcode);
      this.isScanning = false;
      this.getProductData(this.barcode);
    } else {
      this.barcode += event.key;
    }
  }

  onSubmit() {
    this.http.post('/discounts', this.discount).subscribe(
      response => {
        console.log('Discount added:', response);
        // Reset form
        this.discount.discount_amount = null;
        // Reload product data to show updated discounts
        this.getProductData(this.barcode);
      },
      error => {
        console.error('Error adding discount:', error);
      }
    );
  }
}