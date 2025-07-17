package com.shigal.book_share_app.controller;

import com.shigal.book_share_app.model.BookRequest;
import com.shigal.book_share_app.model.BookResponse;
import com.shigal.book_share_app.model.BorrowedBookResponse;
import com.shigal.book_share_app.model.PagedResponse;
import com.shigal.book_share_app.service.BookService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("books")
@RequiredArgsConstructor
@Tag(name = "Book")
public class BookController {
    private final BookService bookService;

    @PostMapping
    public ResponseEntity<Integer> saveBook(@Valid @RequestBody BookRequest bookRequest, Authentication associatedUser){
        return ResponseEntity.ok(bookService.save(bookRequest, associatedUser));
    }

    @GetMapping("{book-id}")
    public ResponseEntity<BookResponse> findBookById(@PathVariable("book-id") Integer bookId){
        return ResponseEntity.ok(bookService.findById(bookId));
    }

    @GetMapping
    public ResponseEntity<PagedResponse<BookResponse>> findAllBooks(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication associatedUser
                                                                    ){
        return ResponseEntity.ok(bookService.findAllBooks(page, size, associatedUser));

    }

    @GetMapping("/owner")
    public ResponseEntity<PagedResponse<BookResponse>> findAllBooksByOwner(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication associatedUser
    ){
        return ResponseEntity.ok(bookService.findAllBooksByOwner(page, size, associatedUser));
    }

    @GetMapping("/borrowed")
    public ResponseEntity<PagedResponse<BorrowedBookResponse>> findAllBorrowedBooks(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication associatedUser
    ){
        return ResponseEntity.ok(bookService.findAllBorrowedBooks(page, size, associatedUser));
    }

    @GetMapping("/returned")
    public ResponseEntity<PagedResponse<BorrowedBookResponse>> findAllReturnedBooks(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication associatedUser
    ){
        return ResponseEntity.ok(bookService.findAllReturnedBooks(page, size, associatedUser));
    }

    @PatchMapping("/shareable/{book-id}")
    public ResponseEntity<Integer> updateShareableStatus(@PathVariable("book-id") Integer bookId, Authentication authentication){
        return ResponseEntity.ok(bookService.updateShareableStatus(bookId, authentication));
    }

    @PatchMapping("/archived/{book-id}")
    public ResponseEntity<Integer> updateArchivedStatus(@PathVariable("book-id") Integer bookId, Authentication authentication){
        return ResponseEntity.ok(bookService.updateArchivedStatus(bookId, authentication));
    }

    @PatchMapping("/borrow/{book-id}")
    public ResponseEntity<Integer> borrowBook(@PathVariable("book-id") Integer bookId, Authentication authentication){
        return ResponseEntity.ok(bookService.borrowBook(bookId, authentication));
    }

    @PatchMapping("/borrow/return/{book-id}")
    public ResponseEntity<Integer> returnBorrowedBook(@PathVariable("book-id") Integer bookId, Authentication authentication){
        return ResponseEntity.ok(bookService.returnBorrowedBook(bookId, authentication));
    }

    @PatchMapping("/borrow/return/approve/{book-id}")
    public ResponseEntity<Integer> approveReturnedBook(@PathVariable("book-id") Integer bookId, Authentication authentication){
        return ResponseEntity.ok(bookService.approveReturnedBook(bookId, authentication));
    }

    @PostMapping(value = "/cover/{book-id}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadBookCoverImg(@PathVariable("book-id") Integer bookId, @Parameter() @RequestPart("file")MultipartFile file, Authentication authentication){
        bookService.uploadBookCoverImg(file, authentication, bookId);
        return ResponseEntity.accepted().build();
    }

}
