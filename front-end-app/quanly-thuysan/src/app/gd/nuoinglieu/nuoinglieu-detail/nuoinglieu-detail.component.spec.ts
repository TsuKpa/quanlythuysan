import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuoinglieuDetailComponent } from './nuoinglieu-detail.component';

describe('NuoinglieuDetailComponent', () => {
  let component: NuoinglieuDetailComponent;
  let fixture: ComponentFixture<NuoinglieuDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuoinglieuDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuoinglieuDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
