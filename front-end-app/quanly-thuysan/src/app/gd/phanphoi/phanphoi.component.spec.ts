import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhanphoiComponent } from './phanphoi.component';

describe('PhanphoiComponent', () => {
  let component: PhanphoiComponent;
  let fixture: ComponentFixture<PhanphoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhanphoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhanphoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
