import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mycomp1Component } from './mycomp1.component';

describe('Mycomp1Component', () => {
  let component: Mycomp1Component;
  let fixture: ComponentFixture<Mycomp1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mycomp1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mycomp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
