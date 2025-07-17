package com.shigal.book_share_app.util;

import com.shigal.book_share_app.domain.Book;
import com.shigal.book_share_app.domain.Feedback;
import com.shigal.book_share_app.model.FeedbackRequest;
import com.shigal.book_share_app.model.FeedbackResponse;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class FeedbackMapper {
    public Feedback mapToFeedback(@Valid FeedbackRequest feedbackRequest) {
        return Feedback.builder()
                .note(feedbackRequest.note())
                .comment(feedbackRequest.comment())
                .book(Book.builder()
                        .id(feedbackRequest.bookId())
                        .archived(false) // not required
                        .shareable(false) // not required
                        .build())
                .build();
    }

    public FeedbackResponse mapToFeedbackResponse(Feedback feedback, Integer id) {
        return FeedbackResponse.builder()
                .note(feedback.getNote())
                .comment(feedback.getComment())
                .ownFeedback(Objects.equals(feedback.getCreatedBy(), id))
                .build();
    }
}
