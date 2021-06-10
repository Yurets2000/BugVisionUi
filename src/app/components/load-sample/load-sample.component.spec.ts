import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoadSampleComponent} from './load-sample.component';

describe('LoadSampleComponent', () => {
  let component: LoadSampleComponent;
  let fixture: ComponentFixture<LoadSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadSampleComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
