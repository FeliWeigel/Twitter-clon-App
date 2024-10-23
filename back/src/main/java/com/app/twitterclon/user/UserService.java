package com.app.twitterclon.user;

import com.app.twitterclon.exception.CredentialsNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.PagedModel;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserDTO getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AuthenticationCredentialsNotFoundException("No authenticated user found");
        }

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        UserDTO userDTO = UserDTO.builder()
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .birthdate(user.getBirthdate())
                .username(user.getUsername())
                .email(user.getEmail())
                .uploadDate(user.getUploadDate())
                .description(user.getDescription())
                .build();
        return userDTO;
    }

    public Long getAuthenticatedUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AuthenticationCredentialsNotFoundException("No authenticated user found");
        }

        Object principal = authentication.getPrincipal();

        String username;
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else if (principal instanceof String) {
            username = (String) principal;
        } else {
            throw new IllegalStateException("Unexpected principal type: " + principal.getClass());
        }
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return user.getId();
    }

    public UserDTO getProfileUser(String username) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AuthenticationCredentialsNotFoundException("No authenticated user found");
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        UserDTO userDTO = UserDTO.builder()
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .birthdate(user.getBirthdate())
                .username(user.getUsername())
                .email(user.getEmail())
                .uploadDate(user.getUploadDate())
                .description(user.getDescription())
                .build();
        return userDTO;
    }

    public Optional<User> getUserById(Long id){
        return userRepository.findById(id);
    }
    public Optional<User> getUserByUsername(String username){
        return userRepository.findByUsername(username);
    }
    public String followUser(String followingUsername){
        Long followerId = getAuthenticatedUserId();
        User follower = userRepository.findById(followerId).orElseThrow(() -> new CredentialsNotFoundException("An unexpected error has occurred, please try again later"));
        User following = userRepository.findByUsername(followingUsername).orElseThrow(() -> new CredentialsNotFoundException("An unexpected error has occurred, please try again later"));

        follower.getFollowing().add(following);
        following.getFollowers().add(follower);
        userRepository.save(follower);
        return "Have you started following @" + following.getUsername();
    }

    public String unfollowUser(String followingUsername){
        Long followerId = getAuthenticatedUserId();
        User follower = userRepository.findById(followerId).orElseThrow(() -> new CredentialsNotFoundException("An unexpected error has occurred, please try again later"));
        User following = userRepository.findByUsername(followingUsername).orElseThrow(() -> new CredentialsNotFoundException("An unexpected error has occurred, please try again later"));

        follower.getFollowing().remove(following);
        following.getFollowers().remove(follower);
        userRepository.save(follower);

        return "Have you stopped following @" + following.getUsername();
    }

    public PagedModel<UserDTO> followersList(String userUsername, Pageable pageable){
        User user = userRepository.findByUsername(userUsername).orElseThrow(() -> new UsernameNotFoundException("User not found."));
        Page<User> followersPage = userRepository.userFollowers(userUsername, pageable);
        Set<UserDTO> followersDTOSet = followersPage.getContent().stream().map(userMap -> {
            return UserDTO.builder()
                    .firstname(userMap.getFirstname())
                    .lastname(userMap.getLastname())
                    .username(userMap.getUsername())
                    .build();
        }).collect(Collectors.toSet());

        return PagedModel.of(followersDTOSet, new PagedModel.PageMetadata(
                followersPage.getSize(),
                followersPage.getNumber(),
                followersPage.getTotalElements(),
                followersPage.getTotalPages()
        ));

    }

    public PagedModel<UserDTO> followingList(String userUsername, Pageable pageable){
        User user = userRepository.findByUsername(userUsername).orElseThrow(() -> new UsernameNotFoundException("User not found."));
        Page<User> followingPage = userRepository.userFollowing(userUsername, pageable);
        Set<UserDTO> folloingDTOSet = followingPage.getContent().stream().map(userMap -> {
            return UserDTO.builder()
                    .firstname(userMap.getFirstname())
                    .lastname(userMap.getLastname())
                    .username(userMap.getUsername())
                    .build();
        }).collect(Collectors.toSet());

        return PagedModel.of(folloingDTOSet, new PagedModel.PageMetadata(
                followingPage.getSize(),
                followingPage.getNumber(),
                followingPage.getTotalElements(),
                followingPage.getTotalPages()
        ));

    }
    public Long numberOfFollowers(String userUsername){
        User user = userRepository.findByUsername(userUsername).orElse(null);
        if(user == null){
            throw new UsernameNotFoundException("User not found!");
        }
        return userRepository.countFollowers(userUsername);
    }
    public Long numberOfFollowing(String userUsername){
        User user = userRepository.findByUsername(userUsername).orElse(null);
        if(user == null){
            throw new UsernameNotFoundException("User not found!");
        }
        return userRepository.countFollowing(userUsername);
    }

}
