import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss'
})
export class AddProductsComponent {


  product = {
    name: '',
    barcode: '',
    price: null,
    category_id: null,
    unit: '',
    quantity: null,
  };
  categories:any = [];
  barcode: string = '';
  isScanning: boolean = false;

  constructor(private http: HttpService) {}

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.isScanning) {
      this.isScanning = true;
      this.barcode = '';
    }

    if (event.key === 'Enter') {
      this.barcode = this.barcode.replaceAll('ö', '0'); // Csak számokat hagyunk meg
      console.log('Beolvasott vonalkód:', this.barcode);
      this.product.barcode = this.barcode;
      this.isScanning = false;
      this.getProductName(this.barcode);
    } else {
      this.barcode += event.key;
    }
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.http.get<any[]>('/categories').subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error('Error loading categories:', error);
      }
    );
  }

  onSubmit() {
    this.http.post('/products', this.product).subscribe(
      response => {
        console.log('Product added:', response);
        // Reset form
        this.product = {
          name: '',
          barcode: '',
          price: null,
          category_id: null,
          unit: '',
          quantity: null,
        };
      },
      error => {
        console.error('Error adding product:', error);
      }
    );
  }

  getProductName(barcode: string) {
   
    /*this.http.get('https://web.komaweb.eu/stocker/ean_search/search.php?ean=' + barcode).subscribe(
      (product: any) => {
        console.log('Válasz:', product);
        if (product) {
          this.product.name = product.product_name;
        }
      },
      (error) => {
        console.error('Hiba a termék beolvasásakor:', error);
      }
    );*/

  }

}
