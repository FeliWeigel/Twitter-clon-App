package com.app.twitterclon.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor@NoArgsConstructor
public class PostDTO {

    private String text;
    private MultipartFile file;
}
