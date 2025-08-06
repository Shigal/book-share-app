import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookRequest, BookResponse } from '../../../../services/models';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../../../services/services';

@Component({
  selector: 'app-manage-book',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
    ],
  templateUrl: './manage-book.html',
  styleUrl: './manage-book.scss'
})
export class ManageBook implements OnInit{
  errorMsg: Array<string> = [];
  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    shareable: false,
    synopsis: '',
    title: ''
  };
  selectedPicture: string | undefined;
  selectedBookCover: any;

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
    console.log('ActivatedRoute type:', typeof this.activatedRoute); // should be "object"
    console.dir(this.activatedRoute);
  }
  ngOnInit(): void {
    console.log('ActivatedRoute initialized' + this.activatedRoute);
    if (this.activatedRoute && this.activatedRoute.params) {
    // const bookId = this.activatedRoute.snapshot.params['bookId'];
    this.activatedRoute.params.subscribe(params => {
      console.log('==param: ' + JSON.stringify(params))
      const bookId = params['bookId'];
      console.log('=====: id: ' + bookId)
    if (bookId) {
      this.bookService.findBookById({
        'book-id': bookId
      }).subscribe({
        next: (book: BookResponse) => {
          this.bookRequest = {
            id: book.id,
            authorName: book.authorName as string,
            isbn: book.isbn as string,
            shareable: book.shareable as boolean,
            synopsis: book.synopsis as string,
            title: book.title as string
          }
          if (book.cover) {
            this.selectedPicture = 'data:image/jpg;base64,' + book.cover;
          }
        }
      })
    }
    });
  }
  }

  onFileSelected(event: any){
    this.selectedBookCover = event.target.files[0];
    console.log("selectedBookCover: " + JSON.stringify(this.selectedBookCover));
    if (this.selectedBookCover) {
      const reader: FileReader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      }
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  saveBook(){
    this.bookService.saveBook({
      body: this.bookRequest
    }).subscribe({
      next: (bookId) => {
        this.bookService.uploadBookCoverImg({
          'book-id': bookId,
          body: {
             file: this.selectedBookCover
          }
        }).subscribe({
          next: () => {
            this.router.navigate(['/books/my-books']);
          }
        });
      },
          error: (err) => {
            this.errorMsg = err.error.validationErrors;
          }
    });
  }
}
