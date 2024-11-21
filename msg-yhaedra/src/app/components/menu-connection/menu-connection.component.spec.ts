import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuConnectionComponent } from './menu-connection.component';

describe('MenuConnectionComponent', () => {
  let component: MenuConnectionComponent;
  let fixture: ComponentFixture<MenuConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuConnectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
