import { Component, OnInit } from '@angular/core';
import { PagedResponseBorrowedBookResponse } from '../../../../services/models/paged-response-borrowed-book-response';
import { BorrowedBookResponse } from '../../../../services/models/borrowed-book-response';
import { FeedbackRequest } from '../../../../services/models/feedback-request';
import { BookService } from '../../../../services/services/book.service';
import { FeedbackService } from '../../../../services/services/feedback.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-returned-book-list',
  imports: [
    CommonModule
  ],
  templateUrl: './returned-book-list.html',
  styleUrl: './returned-book-list.scss'
})
export class ReturnedBookList implements OnInit {
  returnedBooks: PagedResponseBorrowedBookResponse = {};

    page = 0;
    size = 4;
    message: string = '';
    level: string = 'success';
  
    constructor(
      private bookService: BookService,
    ){}
      ngOnInit(): void {
      this.findAllReturnedBooks();
    }
    findAllReturnedBooks() {
      this.bookService.findAllReturnedBooks({
         page: this.page,
         size: this.size
      }).subscribe({
        next: (res) => {
          this.returnedBooks = res;
        }
      });
    }
      goToFirstPage(){
      this.page = 0;
      this.findAllReturnedBooks();
    }
    goToPreviousPage(){
      this.page--;
      this.findAllReturnedBooks();
    }
    goToPage(page: any){
      this.page = page;
      this.findAllReturnedBooks();
    }
    goToNextPage(){
      this.page++;
      this.findAllReturnedBooks();
    }
    gotToLastPage(){
      this.page = this.returnedBooks.totalPages as number - 1; // need to cast it as it might be undefined
      this.findAllReturnedBooks();
    }
  
    get isLastPage(): boolean {
      return this.page == this.returnedBooks.totalPages as number - 1;
    }

    approveReturn(book: BorrowedBookResponse){
      if (!book.returned) {
        this.level = 'error';
        this.message = 'The book has not been returned.';
        return;
      }
      this.bookService.approveReturnedBook({
        'book-id': book.id as number
      }).subscribe({
        next: () => {
          this.level = 'success';
          this.message = 'Book return approved';
          this.findAllReturnedBooks();
        }
      });
    }
}
