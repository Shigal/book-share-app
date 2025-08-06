import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/services';
import { Router } from '@angular/router';
import { BookResponse, PagedResponseBookResponse } from '../../../../services/models';
import { FormsModule } from '@angular/forms';
import { BookCard } from '../../components/book-card/book-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  imports: [
    CommonModule,
    FormsModule,
    BookCard
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss'
})
export class BookList implements OnInit {
  bookResponse: PagedResponseBookResponse = {};
  page = 0;
  size = 4;
  message = '';
  level: string = 'success';
  constructor(
    private bookService: BookService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.findAllBooks();
  }
  findAllBooks() {
    this.bookService.findAllBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (books) => {
        this.bookResponse = books;
      }
    });
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }
  goToPreviousPage() {
    this.page--;
    this.findAllBooks();
  }
  goToPage(page: any) {
    this.page = page;
    this.findAllBooks();
  }
  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }
  gotToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1; // need to cast it as it might be undefined
    this.findAllBooks();
  }

  get isLastPage(): boolean {
    return this.page == this.bookResponse.totalPages as number - 1;
  }
  
  borrowBook(book: BookResponse) {
    console.log('----borrow')
    this.message = '';
    this.bookService.borrowBook({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Book successfully added to your list';
      },
      error: (err) => {
        console.log(err);
        this.level = 'error';
        this.message = err.error.error;
      },
    });
  }
}
