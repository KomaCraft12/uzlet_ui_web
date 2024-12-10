import { HttpClient } from '@angular/common/http';
import { Component, HostListener  } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'uzlet_ui';

  ngOnInit() {
    initFlowbite();
  }

}
