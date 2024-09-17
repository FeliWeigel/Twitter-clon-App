package com.app.twitterclon.post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findAll(Pageable pageable);
    @Query("SELECT p FROM Post p WHERE p.date > :lastDateTime")
    List<Post> findNewPosts(@Param("lastDateTime") LocalDateTime lastDateTime);
}
