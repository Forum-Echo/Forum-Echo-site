import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutButtonComponent } from './about-button.component';

describe('AboutButtonComponent', () => {
  let component: AboutButtonComponent;
  let fixture: ComponentFixture<AboutButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
