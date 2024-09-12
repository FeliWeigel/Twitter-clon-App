package com.app.twitterclon.post;

import com.app.twitterclon.exception.CredentialsNotFoundException;
import com.app.twitterclon.exception.FileUploadException;
import com.app.twitterclon.exception.InvalidPostException;
import com.app.twitterclon.s3.S3Service;
import com.app.twitterclon.user.User;
import com.app.twitterclon.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final S3Service s3Service;
    private final UserService userService;

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
}


