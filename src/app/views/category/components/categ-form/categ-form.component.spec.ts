import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategFormComponent } from './categ-form.component';

describe('CategFormComponent', () => {
  let component: CategFormComponent;
  let fixture: ComponentFixture<CategFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CategFormComponent]
    });
    fixture = TestBed.createComponent(CategFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
