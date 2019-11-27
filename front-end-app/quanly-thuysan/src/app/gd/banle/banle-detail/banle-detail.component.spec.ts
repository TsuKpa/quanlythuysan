import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanleDetailComponent } from './banle-detail.component';

describe('BanleDetailComponent', () => {
  let component: BanleDetailComponent;
  let fixture: ComponentFixture<BanleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
