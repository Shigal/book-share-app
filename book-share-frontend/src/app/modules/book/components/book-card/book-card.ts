import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookResponse } from '../../../../services/models';
import { Rating } from '../rating/rating';

@Component({
  selector: 'app-book-card',
  imports: [
    Rating
  ],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss'
})
export class BookCard {

  private _book: BookResponse = {};
  private _manage: boolean = false;
  private _bookCover: string | undefined;

  @Output() private share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private archive: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private addToWaitingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private details: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

  get bookCover(): string | undefined {
    if (this._book.cover) {
      return 'data:image/jpg;base64,' + this._book.cover;
    }
    // return 'https://source.unsplash.com/user/c_v_r/1900x800';
    return 'https://picsum.photos/1920/1080';
  }
  get book(): BookResponse {
    return this._book;
  }
  @Input()
  set book(value: BookResponse) {
    this._book = value;
  }

  get manage(): boolean {
    return this._manage;
  }
  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }

  showDetails(){
    this.details.emit(this._book);
  }
  borrowBook(){
    this.borrow.emit(this._book);
  }
  addBookToWaitingList(){
    this.addToWaitingList.emit(this._book);
  }
  editBook(){
    this.edit.emit(this._book);
  }
  shareBook(){
    this.share.emit(this._book);
  }
  archiveBook(){
    this.archive.emit(this._book);
  }

}
