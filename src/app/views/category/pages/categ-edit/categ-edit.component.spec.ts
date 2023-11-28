import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategEditComponent } from './categ-edit.component';

describe('CategEditComponent', () => {
  let component: CategEditComponent;
  let fixture: ComponentFixture<CategEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CategEditComponent]
    });
    fixture = TestBed.createComponent(CategEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
