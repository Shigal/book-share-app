import { Component, OnInit } from '@angular/core';
import { BorrowedBookResponse, FeedbackRequest, PagedResponseBorrowedBookResponse } from '../../../../services/models';
import { CommonModule } from '@angular/common';
import { BookService, FeedbackService } from '../../../../services/services';
import { Rating } from '../../components/rating/rating';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-borrowed-book-list',
  imports: [
    CommonModule,
    FormsModule,
    Rating
  ],
  templateUrl: './borrowed-book-list.html',
  styleUrl: './borrowed-book-list.scss'
})
export class BorrowedBookList implements OnInit {
  borrowedBooks: PagedResponseBorrowedBookResponse = {};
  selectedBook: BorrowedBookResponse | undefined;
  feedbackRequest: FeedbackRequest = {
    bookId: 0,
    comment: '',
    note: 0
  };
  page = 0;
  size = 4;

  constructor(
    private bookService: BookService,
    private feedbackService: FeedbackService
  ){}
    ngOnInit(): void {
    this.findAllBorrowedBooks();
  }
  findAllBorrowedBooks() {
    this.bookService.findAllBorrowedBooks({
       page: this.page,
       size: this.size
    }).subscribe({
      next: (res) => {
        this.borrowedBooks = res;
      }
    });
  }
    goToFirstPage(){
    this.page = 0;
    this.findAllBorrowedBooks();
  }
  goToPreviousPage(){
    this.page--;
    this.findAllBorrowedBooks();
  }
  goToPage(page: any){
    this.page = page;
    this.findAllBorrowedBooks();
  }
  goToNextPage(){
    this.page++;
    this.findAllBorrowedBooks();
  }
  gotToLastPage(){
    this.page = this.borrowedBooks.totalPages as number - 1; // need to cast it as it might be undefined
    this.findAllBorrowedBooks();
  }

  get isLastPage(): boolean {
    return this.page == this.borrowedBooks.totalPages as number - 1;
  }

  returnBorrowedBook(book: BorrowedBookResponse){
    this.selectedBook = book;
    this.feedbackRequest.bookId = this.selectedBook?.id as number;

  }
  returnBook(withFeedback: boolean) {
    this.bookService.returnBorrowedBook({
      'book-id': this.selectedBook?.id as number
    }).subscribe({
      next: () => {
        if (withFeedback) {
          this.giveFeedback();
        }
        this.selectedBook = undefined;
        this.findAllBorrowedBooks();
      }
    });
  }
  giveFeedback() {
    this.feedbackService.saveFeedback({
      body: this.feedbackRequest
    }).subscribe({
      next: () => {
      }
    });
  }
}
