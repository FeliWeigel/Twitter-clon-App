package com.app.twitterclon.post;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/api/v1/post")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
public class PostController {

    private final PostService postService;

    @GetMapping("/feed")
    public ResponseEntity<Page<Post>> postsFeed(
            @RequestParam(defaultValue = "0") int page, // numero de pagina que se muestra
            @RequestParam(defaultValue = "10") int size // cantidad total de posts por pagina cargada
    ){
        Pageable pageable = PageRequest.of(page, size, Sort.by("date").descending());
        return ResponseEntity.ok(postService.getFeed(pageable));
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
