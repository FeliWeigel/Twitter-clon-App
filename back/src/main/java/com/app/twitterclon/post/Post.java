package com.app.twitterclon.post;

import com.app.twitterclon.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Post {

    @Id
    @GeneratedValue
    private Long id;
    private LocalDateTime date;
    private String text;
    private String imageId;
    private String videoId;
    private String fileUrl;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

}
