import { Component, OnInit } from '@angular/core';
import { BookResponse } from '../../../../services/models/book-response';
import { PagedResponseBookResponse } from '../../../../services/models/paged-response-book-response';
import { BookService } from '../../../../services/services/book.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { BookCard } from '../../components/book-card/book-card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-books',
  imports: [
    CommonModule,
    FormsModule,
    BookCard,
    RouterModule, 
    RouterLink
  ],
  templateUrl: './my-books.html',
  styleUrl: './my-books.scss'
})
export class MyBooks implements OnInit{
    bookResponse: PagedResponseBookResponse = {};
  page = 0;
  size = 4;

  constructor(
    private bookService: BookService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.findAllBooks();
  }
  findAllBooks() {
    this.bookService.findAllBooksByOwner({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (books) => {
        this.bookResponse = books;
      }
    });
  }

  goToFirstPage(){
    this.page = 0;
    this.findAllBooks();
  }
  goToPreviousPage(){
    this.page--;
    this.findAllBooks();
  }
  goToPage(page: any){
    this.page = page;
    this.findAllBooks();
  }
  goToNextPage(){
    this.page++;
    this.findAllBooks();
  }
  gotToLastPage(){
    this.page = this.bookResponse.totalPages as number - 1; // need to cast it as it might be undefined
    this.findAllBooks();
  }

  get isLastPage(): boolean {
    return this.page == this.bookResponse.totalPages as number - 1;
  }

  archiveBook(book: BookResponse): void{
    this.bookService.updateArchivedStatus({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        book.archived = !book.archived;
      }
    });
  }
  shareBook(book: BookResponse): void{
    this.bookService.updateShareableStatus({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        book.shareable = !book.shareable;
      }
    });
  }
  editBook(book: BookResponse): void{
    this.router.navigate(['books', 'manage', book.id]); // http://localhost:4200/books/manage/102
  }
}
