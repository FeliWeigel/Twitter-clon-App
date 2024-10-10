package com.app.twitterclon.post;

import com.app.twitterclon.exception.CredentialsNotFoundException;
import com.app.twitterclon.exception.FileUploadException;
import com.app.twitterclon.exception.InvalidPostException;
import com.app.twitterclon.s3.S3Service;
import com.app.twitterclon.user.User;
import com.app.twitterclon.user.UserDTO;
import com.app.twitterclon.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.hateoas.PagedModel;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final S3Service s3Service;
    private final UserService userService;

    private List<Post> getAllPost(){
        return postRepository.findAll();
    }
    private void validatePostText(String text){
        if(text.length() > 200){
            throw new InvalidPostException("The post cannot exceed 200 characters in length.");
        }
    }

    private String fileUploadInPost(MultipartFile file, Long userId){
        String contentType = file.getContentType();
        if (!isContentTypeSupported(contentType)) {
            throw new InvalidPostException("Unsupported file type: " + contentType);
        }
        try {
            String fileName = "posts/" + userId + "/" + file.getOriginalFilename();
            s3Service.uploadFile(fileName, file.getInputStream());
            return fileName;
        } catch (IOException e) {
            throw new FileUploadException("Error uploading file", e);
        }
    }
    private Boolean isContentTypeSupported(String contentType){
        return contentType != null && (contentType.startsWith("image") || contentType.startsWith("video"));
    }
    private Post buildPost(String contentType, String text, String fileName, Long userId){
        User user = userService.getUserById(userId).orElse(null);
        if(user == null){
            throw new CredentialsNotFoundException("Warning! User not found to build post.");
        }

        Post.PostBuilder postBuilder = Post.builder()
                .user(user)
                .text(text)
                .date(LocalDateTime.now());

        if(contentType != null &&  fileName != null){
            if(contentType.startsWith("image")){
                postBuilder.imageId(fileName);
            }else if(contentType.startsWith("video")){
                postBuilder.videoId(fileName);
            }
        }

        return postBuilder.build();
    }

    public Page<Post> getFeed(Pageable pageable){
        Page<Post> pagedPosts = postRepository.findAll(pageable);
        return pagedPosts.map(post -> {
            if(post.getImageId() != null){
                String fileUrl = s3Service.generatePresignedUrl(post.getImageId());
                post.setFileUrl(fileUrl);
            }else if(post.getVideoId() != null){
                String fileUrl = s3Service.generatePresignedUrl(post.getVideoId());
                post.setFileUrl(fileUrl);
            }
            return post;
        });
    }

    public List<Post> getNewPosts(String lastPostDate){
        LocalDateTime dateFormatted = LocalDateTime.parse(lastPostDate);
        return postRepository.findNewPosts(dateFormatted);
    }

    public String uploadPost(PostDTO postDTO){
        Long userId = userService.getAuthenticatedUserId();
        validatePostText(postDTO.getText());
        String fileName = null;

        if(postDTO.getFile() == null || postDTO.getFile().isEmpty()){
            Post newPost = buildPost(null, postDTO.getText(), null, userId);
            postRepository.save(newPost);
            return "Your post has been shared successfully!";
        }

        fileName = fileUploadInPost(postDTO.getFile(), userId);
        Post newPost = buildPost(postDTO.getFile().getContentType(), postDTO.getText(), fileName, userId);
        postRepository.save(newPost);
        return "Your post has been shared successfully!";
    }

    public PagedModel<PostDTO> postByUser(String userUsername, Pageable pageable){
        Optional<User> user = userService.getUserByUsername(userUsername);
        if(!user.isPresent()){
            throw new UsernameNotFoundException("user not found");
        }
        Page<Post> userPostPage = postRepository.getPostsByUser(userUsername, pageable);
        List<PostDTO> postDTOs = userPostPage.getContent().stream().map(post -> {
            return PostDTO.builder()
                    .text(post.getText())
                    .fileURL(post.getFileUrl())
                    .date(post.getDate())
                    .user(
                            UserDTO.builder()
                                    .firstname(post.getUser().getFirstname())
                                    .lastname(post.getUser().getLastname())
                                    .username(post.getUser().getUsername())
                                    .build()
                    )
                    .build();

        }).collect(Collectors.toList());
        return PagedModel.of(postDTOs, new PagedModel.PageMetadata(
                userPostPage.getSize(),
                userPostPage.getNumber(),
                userPostPage.getTotalElements(),
                userPostPage.getTotalPages()));
    }

}


