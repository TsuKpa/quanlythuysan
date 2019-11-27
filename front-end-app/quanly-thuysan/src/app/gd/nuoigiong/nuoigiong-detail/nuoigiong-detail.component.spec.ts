import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuoigiongDetailComponent } from './nuoigiong-detail.component';

describe('NuoigiongDetailComponent', () => {
  let component: NuoigiongDetailComponent;
  let fixture: ComponentFixture<NuoigiongDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuoigiongDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuoigiongDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
