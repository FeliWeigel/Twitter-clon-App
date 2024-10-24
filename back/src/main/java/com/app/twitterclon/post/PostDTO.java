package com.app.twitterclon.post;

import com.app.twitterclon.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor@NoArgsConstructor
public class PostDTO {

    private String text;
    private MultipartFile file;
    private String fileUrl;
    private String imageId;
    private String videoId;
    private LocalDateTime date;
    private UserDTO user;
}
