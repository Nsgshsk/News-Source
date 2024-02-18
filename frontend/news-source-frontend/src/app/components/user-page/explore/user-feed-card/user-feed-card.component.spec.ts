import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFeedCardComponent } from './user-feed-card.component';

describe('UserFeedCardComponent', () => {
  let component: UserFeedCardComponent;
  let fixture: ComponentFixture<UserFeedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFeedCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFeedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
