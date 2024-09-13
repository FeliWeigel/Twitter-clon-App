package com.app.twitterclon.post;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/post")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
public class PostController {

    private final PostService postService;

    @GetMapping("/feed")
    public ResponseEntity<List<Post>> postsFeed(){
        return ResponseEntity.ok(postService.getFeed());
    }
    @PostMapping(value = "/new", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadPost(
            @RequestParam(value = "text", required = false) String text,
            @RequestParam(value = "file", required = false) MultipartFile file){
        PostDTO postDTO = PostDTO.builder()
                .text(text)
                .file(file)
                .build();

        return ResponseEntity.ok(postService.uploadPost(postDTO));
    }
}
