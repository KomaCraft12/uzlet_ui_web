import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../services/http.service';

interface Coupon {
  code: string;
  discount_type: string;
  discount_value: number;
  start_date: string;
  end_date: string;
  usage_limit: number;
}

@Component({
  selector: 'app-add-coupons',
  templateUrl: './add-coupons.component.html',
  styleUrls: ['./add-coupons.component.scss']
})
export class AddCouponsComponent {
  coupon: Coupon = {
    code: '',
    discount_type: 'percent',
    discount_value: 0,
    start_date: '',
    end_date: '',
    usage_limit: 1
  };

  constructor(private http: HttpService) { }

  onSubmit() {
    this.http.post('/coupons', this.coupon).subscribe(
      response => {
        console.log('Coupon added:', response);
        // Reset form
        this.coupon = {
          code: '',
          discount_type: 'percent',
          discount_value: 0,
          start_date: '',
          end_date: '',
          usage_limit: 1
        };
      },
      error => {
        console.error('Error adding coupon:', error);
      }
    );
  }
}