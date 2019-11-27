import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhanphoiDetailComponent } from './phanphoi-detail.component';

describe('PhanphoiDetailComponent', () => {
  let component: PhanphoiDetailComponent;
  let fixture: ComponentFixture<PhanphoiDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhanphoiDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhanphoiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
