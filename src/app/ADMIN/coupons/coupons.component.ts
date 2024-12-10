import { Component, OnInit } from '@angular/core';
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
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {
  coupons: Coupon[] = [];

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.loadCoupons();
  }

  loadCoupons() {
    this.http.get<Coupon[]>('/coupons').subscribe(
      data => {
        this.coupons = data;
      },
      error => {
        console.error('Error loading coupons:', error);
      }
    );
  }
}