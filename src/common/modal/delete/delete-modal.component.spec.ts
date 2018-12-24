import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgModalComponent } from './delete-modal.component';

describe('NgModalComponent', () => {
  let component: NgModalComponent;
  let fixture: ComponentFixture<NgModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
