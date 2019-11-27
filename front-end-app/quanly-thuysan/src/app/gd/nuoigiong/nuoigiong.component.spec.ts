import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuoigiongComponent } from './nuoigiong.component';

describe('NuoigiongComponent', () => {
  let component: NuoigiongComponent;
  let fixture: ComponentFixture<NuoigiongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuoigiongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuoigiongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
