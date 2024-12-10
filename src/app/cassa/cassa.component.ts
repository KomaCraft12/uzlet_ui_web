import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-cassa',
  templateUrl: './cassa.component.html',
  styleUrl: './cassa.component.scss'
})
export class CassaComponent {

  barcode: string = '';
  products: any[] = [];
  coupon: any = null;
  total: number = 0;
  totalWithoutDiscount: number = 0;
  private isScanning: boolean = false;

  constructor(private http: HttpService, private cdr: ChangeDetectorRef) { }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.isScanning) {
      this.isScanning = true;
      this.barcode = '';
    }

    if (event.key === 'Enter') {

      this.barcode = this.barcode.replace(/[öZzYy]/g, match => {
        const replacements:any = {
          'ö': '0',
          'Z': 'Y',
          'z': 'y',
          'Y': 'Z',
          'y': 'z'
        };
        return replacements[match];
      });

      this.barcode = this.barcode.replaceAll('Shift', '');
      
      console.log('Beolvasott vonalkód:', this.barcode);
      //this.getProduct(this.barcode);
      if(this.barcode.startsWith("K")){
        this.getCoupon(this.barcode);
      } else {
        this.getProduct(this.barcode);
      }
      this.isScanning = false;
    } else {
      this.barcode += event.key;
    }
  }

  getCoupon(barcode: string): void {
    if(!this.coupon){
    this.http.get('/coupons/check/' + barcode).subscribe(
      (coupon: any) => {
        console.log('Válasz:', coupon);
        if (coupon) {
          //this.products.push(coupon);
          //this.calculateTotal();
          this.coupon = coupon;
          this.calculateTotal();
        }
      },
      (error) => {
        console.error('Hiba a kupon beolvasásakor:', error);
      }
    );
    } else {
      alert('Már felhasználtál egy kupont!');
    }
  }

  getProduct(barcode: string): void {

    this.http.get('/products/barcode/' + barcode).subscribe(
      (product: any) => {
        console.log('Válasz:', product);
        if (product) {
          product.price = parseFloat(product.price); // Konvertáljuk a price értéket számmá
          if (this.isStock(product)) {
            //product.incart = 1; // Termék darabszáma a kosárban
            //this.products.push(product); // Termék hozzáadása a listához

            if (this.products.filter(p => p.id === product.id).length > 0) {
              this.products.filter(p => p.id === product.id)[0].incart += 1;
            } else {
              product.incart = 1;
              this.products.push(product);
            }

            this.calculateTotal();

          } else {
            alert('Nincs készleten a termék!');
          }
        }
      },
      (error) => {
        console.error('Hiba a termék beolvasásakor:', error);
        if (error.status === 500) {
          alert('Nem található a termék!');
        }
      }
    );

    /*this.http.get('https://go-upc.com/search?q=5997938731081').subscribe(
      (response: any) => {
        console.log('Válasz:', response);
      },
      (error) => {
        console.error('Hiba a termék beolvasásakor:', error);
      }
    );*/

  }

  isStock(product: any): boolean {
    //let t = this.products.filter(p => p.id === product.id).length;
    let t = this.products.filter(p => p.id === product.id)[0]?.incart || 0;
    console.log('Kosárban lévő termék darabszáma:', t, 'Készleten lévő termék darabszáma:', product.stock);
    return t < product.stock;
  }

  calculateTotal(): void {
    this.total = this.products.reduce(
      (total, product) => {
        // Ha akciós a termék, akkor a discounted árat használjuk, különben a normál árat
        const priceToUse = product.isdiscounted ? product.discounted.price : product.price;
        return total + priceToUse * product.incart;
      }, 0
    );

    this.totalWithoutDiscount = this.total;

    if(this.coupon){
      if(this.coupon.discount_type === 'percentage'){
        this.total = this.total - (this.total * this.coupon.discount_value / 100);
      } else {
        this.total = this.total - this.coupon.discount_value;
      }
    }
  }


  clearCart(): void {
    this.products = [];
  }

  changeQuantity(product: any): void {

    window.setTimeout(() => {

      if (product.incart > product.stock) {
        product.incart = product.stock;
      } else if (product.incart < 1) {
        product.incart = 1;
      }

      this.calculateTotal();

      //this.cdr.detectChanges(); // Kényszeríti az Angular-t az újrarenderelésre

    }, 100);

  }

  checkout(): void {
    /*this.http.post('http://localhost:8000/api/orders', {}).subscribe(
      (response: any) => {
        console.log('Válasz:', response);
        this.clearCart();
      },
      (error) => {
        console.error('Hiba a rendelés leadásakor:', error);
      }
    );*/

    // print receipt

    // DATA
    /*
    $products = [
                ['name' => 'Milka Waffelini Milk 31g', 'quantity' => 1, 'unit_price' => 200, 'discount_price' => 190, 'total_price' => 190],
                ['name' => 'Twix kekszes szelet', 'quantity' => 1, 'unit_price' => 350, 'discount_price' => null, 'total_price' => 350],
                ['name' => 'Egri bikavér', 'quantity' => 1, 'unit_price' => 1200, 'discount_price' => 960, 'total_price' => 960],
                ['name' => 'ISY Micro batteries', 'quantity' => 1, 'unit_price' => 4500, 'discount_price' => 2700, 'total_price' => 2700],
                ['name' => 'Milky Way szelet', 'quantity' => 3, 'unit_price' => 200, 'discount_price' => null, 'total_price' => 600],
            ];
    */

    let products = this.products.map(p => {
      return {
        name: p.name,
        quantity: p.incart,
        unit_price: p.price,
        discount_price: p.isdiscounted ? p.discounted.price : null,
        total_price: p.price * p.incart
      };
    });

    let data = {
      products: products,
      total_price: this.total,
      payment_method: 'cash',
      cashier: 'John Doe',
      coupon: this.coupon,
      save: this.totalWithoutDiscount - this.total
    };

    this.http.post('/print-receipt', data).subscribe(
      (response: any) => {
        console.log('Válasz:', response);
        this.clearCart();
      },
      (error) => {
        console.error('Hiba a blokk kiállításakor:', error);
      }
    );

  }

}
