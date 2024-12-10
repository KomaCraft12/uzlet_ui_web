import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../services/http.service';

interface Category {
  id?: number;
  name: string;
}

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss']
})
export class AddCategoriesComponent implements OnInit {
  category: Category = {
    name: ''
  };
  categories: Category[] = [];

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.http.get<Category[]>('/categories').subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error('Error loading categories:', error);
      }
    );
  }

  onSubmit() {
    this.http.post('/categories', this.category).subscribe(
      response => {
        console.log('Category added:', response);
        // Reset form
        this.category.name = '';
        // Reload categories
        this.loadCategories();
      },
      error => {
        console.error('Error adding category:', error);
      }
    );
  }
}