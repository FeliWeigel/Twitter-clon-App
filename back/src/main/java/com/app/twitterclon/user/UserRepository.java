package com.app.twitterclon.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    @Query("SELECT u FROM User u JOIN u.following f WHERE f.username = :username")
    Page<User> userFollowers(@Param("username") String username, Pageable pageable);
    @Query("SELECT u FROM User u JOIN u.followers f WHERE f.username = :username")
    Page<User> userFollowing(String username, Pageable pageable);
    @Query("SELECT u FROM User u JOIN u.following f WHERE f.username = :username")
    Set<User> allUserFollowers(String username);
    @Query("SELECT u FROM User u JOIN u.followers f WHERE f.username = :username")
    Set<User> allUserFollowing(String username);
    @Query("SELECT count(u) FROM User u JOIN u.following f WHERE f.username = :username")
    Long countFollowers(String username);
    @Query("SELECT count(u) FROM User u JOIN u.followers f WHERE f.username = :username")
    Long countFollowing(String username);
}
