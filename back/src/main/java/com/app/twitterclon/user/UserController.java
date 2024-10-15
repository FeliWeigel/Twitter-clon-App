package com.app.twitterclon.user;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getAuthUser(){
        return ResponseEntity.ok(userService.getAuthenticatedUser());
    }
    @GetMapping("/profile/{username}")
    public ResponseEntity<UserDTO> getProfileUser(@PathVariable String username){
        return ResponseEntity.ok(userService.getProfileUser(username));
    }

    @PostMapping("/follow/{followingUsername}")
    public ResponseEntity<String> followUser(@PathVariable String followingUsername){
        return ResponseEntity.ok(userService.followUser(followingUsername));
    }
    @PostMapping("/unfollow/{followingUsername}")
    public ResponseEntity<String> unfollowUser(@PathVariable String followingUsername){
        return ResponseEntity.ok(userService.unfollowUser(followingUsername));
    }

    @GetMapping("/followers/{userUsername}")
    public ResponseEntity<PagedModel<UserDTO>> followersList(
            @PathVariable String userUsername,
            @RequestParam(defaultValue = "15") int size,
            @RequestParam(defaultValue = "0") int page

    ){
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(userService.followersList(userUsername, pageable));
    }
    @GetMapping("/following/{userUsername}")
    public ResponseEntity<PagedModel<UserDTO>> followingList(
            @PathVariable String userUsername,
            @RequestParam(defaultValue = "15") int size,
            @RequestParam(defaultValue = "0") int page

    ){
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(userService.followingList(userUsername, pageable));
    }

    @GetMapping("/countfollowers/{userUsername}")
    public ResponseEntity<Long> numberOfFollowers(@PathVariable String userUsername){
        return ResponseEntity.ok(userService.numberOfFollowers(userUsername));
    }
    @GetMapping("/countfollowing/{userUsername}")
    public ResponseEntity<Long> numberOfFollowing(@PathVariable String userUsername){
        return ResponseEntity.ok(userService.numberOfFollowing(userUsername));
    }
}
