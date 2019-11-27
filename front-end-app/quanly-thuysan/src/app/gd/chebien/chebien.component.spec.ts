import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChebienComponent } from './chebien.component';

describe('ChebienComponent', () => {
  let component: ChebienComponent;
  let fixture: ComponentFixture<ChebienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChebienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChebienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
