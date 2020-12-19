import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFinancieraComponent } from './new-financiera.component';

describe('NewFinancieraComponent', () => {
  let component: NewFinancieraComponent;
  let fixture: ComponentFixture<NewFinancieraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFinancieraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
