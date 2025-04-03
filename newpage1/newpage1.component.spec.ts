import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Newpage1Component } from './newpage1.component';

describe('Newpage1Component', () => {
  let component: Newpage1Component;
  let fixture: ComponentFixture<Newpage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Newpage1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Newpage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
