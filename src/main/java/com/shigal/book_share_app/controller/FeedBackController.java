package com.shigal.book_share_app.controller;

import com.shigal.book_share_app.model.FeedbackRequest;
import com.shigal.book_share_app.model.FeedbackResponse;
import com.shigal.book_share_app.model.PagedResponse;
import com.shigal.book_share_app.service.FeedbackService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("feedbacks")
@RequiredArgsConstructor
@Tag(name = "Feedback")
public class FeedBackController {

    private final FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<Integer> saveFeedback(@Valid @RequestBody FeedbackRequest feedbackRequest, Authentication associatedUser){
        return ResponseEntity.ok(feedbackService.saveFeedback(feedbackRequest, associatedUser));
    }

    @GetMapping("/book/{book-id}")
    public ResponseEntity<PagedResponse<FeedbackResponse>> findAllFeedbacksByBook(@PathVariable("book-id") Integer bookId,
                                                                                  @RequestParam(name = "page", defaultValue = "0", required = false) int page,
                                                                                  @RequestParam(name = "size", defaultValue = "10", required = false) int size,
                                                                                  Authentication associatedUser){
        return ResponseEntity.ok(feedbackService.findAllFeedbacks(bookId, page, size, associatedUser));
    }

}
