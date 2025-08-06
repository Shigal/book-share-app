import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedBookList } from './returned-book-list';

describe('ReturnedBookList', () => {
  let component: ReturnedBookList;
  let fixture: ComponentFixture<ReturnedBookList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnedBookList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnedBookList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
