import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-print-label',
  templateUrl: './print-label.component.html',
  styleUrls: ['./print-label.component.scss']
})
export class PrintLabelComponent implements OnInit {
  barcode: string = '';
  isScanning: boolean = false;
  product: any = null;

  constructor(private http: HttpService) {}

  ngOnInit() {
    // get barcode from cookie
    const barcodeCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('barcode='));
    if (barcodeCookie) {
      this.barcode = barcodeCookie.split('=')[1];
      console.log('Barcode from cookie:', this.barcode);
      this.getProductData(this.barcode);
      // delete barcode cookie
      document.cookie = 'barcode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }

    //this.getProductData("5000159561402");
  }

  getProductData(barcode: string) {
    this.http.get(`/products/barcode/${barcode}`).subscribe(
      data => {
        this.product = data;
        console.log('Válasz:', data);
      },
      error => {
        console.error('Error loading product data:', error);
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

  printLabel() {
    //window.print();
    this.http.get(`/products/${this.product.id}/generate-label`).subscribe(
      (data:any) => {
        alert(data.message);
      },
      error => {
        console.error('Error loading product data:', error);
      }
    );
  }
}