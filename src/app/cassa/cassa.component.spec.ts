import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CassaComponent } from './cassa.component';

describe('CassaComponent', () => {
  let component: CassaComponent;
  let fixture: ComponentFixture<CassaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CassaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CassaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
