import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategNewComponent } from './categ-new.component';

describe('CategNewComponent', () => {
  let component: CategNewComponent;
  let fixture: ComponentFixture<CategNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CategNewComponent]
    });
    fixture = TestBed.createComponent(CategNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
