import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Newchart2Component } from './newchart2.component';

describe('Newchart2Component', () => {
  let component: Newchart2Component;
  let fixture: ComponentFixture<Newchart2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Newchart2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Newchart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
