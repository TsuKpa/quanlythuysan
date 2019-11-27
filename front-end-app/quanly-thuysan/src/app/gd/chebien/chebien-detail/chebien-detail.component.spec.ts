import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChebienDetailComponent } from './chebien-detail.component';

describe('ChebienDetailComponent', () => {
  let component: ChebienDetailComponent;
  let fixture: ComponentFixture<ChebienDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChebienDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChebienDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
