import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuoinglieuComponent } from './nuoinglieu.component';

describe('NuoinglieuComponent', () => {
  let component: NuoinglieuComponent;
  let fixture: ComponentFixture<NuoinglieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuoinglieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuoinglieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
