package com.shigal.book_share_app.service;

import com.shigal.book_share_app.domain.Book;
import com.shigal.book_share_app.domain.Feedback;
import com.shigal.book_share_app.domain.User;
import com.shigal.book_share_app.exception.OperationNotPermittedException;
import com.shigal.book_share_app.model.FeedbackRequest;
import com.shigal.book_share_app.model.FeedbackResponse;
import com.shigal.book_share_app.model.PagedResponse;
import com.shigal.book_share_app.repository.BookRepository;
import com.shigal.book_share_app.repository.FeedbackRepository;
import com.shigal.book_share_app.util.FeedbackMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final BookRepository bookRepository;
    private final FeedbackRepository feedbackRepository;
    private final FeedbackMapper feedbackMapper;

    public Integer saveFeedback(@Valid FeedbackRequest feedbackRequest, Authentication associatedUser) {
        Book book = bookRepository.findById(feedbackRequest.bookId())
                .orElseThrow(() -> new EntityNotFoundException("No book found with the id: " + feedbackRequest.bookId()));
        if(!book.isArchived() ||  !book.isShareable()) {
            throw new OperationNotPermittedException("You cannot give a feedback for an archived or not shareable book");
        }
        User user = (User) associatedUser.getPrincipal();
        if (!Objects.equals(book.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot give a feeback to your own book");
        }
        Feedback feedBack = feedbackMapper.mapToFeedback(feedbackRequest);
        return feedbackRepository.save(feedBack).getId();
    }

    public PagedResponse<FeedbackResponse> findAllFeedbacks(Integer bookId, int page, int size, Authentication associatedUser) {
        Pageable pageable = PageRequest.of(page, size);
        User user = (User) associatedUser.getPrincipal();
        Page<Feedback> feedbacks = feedbackRepository.findAllByBookId(bookId, pageable);
        List<FeedbackResponse> feedbackResponseList = feedbacks.stream()
                .map(feedback -> feedbackMapper.mapToFeedbackResponse(feedback, user.getId()))
                .toList();
        return new PagedResponse<>(feedbackResponseList, feedbacks.getNumber(), feedbacks.getSize(), feedbacks.getTotalElements(), feedbacks.getTotalPages(), feedbacks.isFirst(), feedbacks.isLast());
    }
}
