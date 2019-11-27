import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanleComponent } from './banle.component';

describe('BanleComponent', () => {
  let component: BanleComponent;
  let fixture: ComponentFixture<BanleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
