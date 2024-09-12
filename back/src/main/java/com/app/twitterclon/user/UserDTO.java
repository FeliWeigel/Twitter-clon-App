package com.app.twitterclon.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@Builder
@AllArgsConstructor @NoArgsConstructor
public class UserDTO {

    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private Date birthdate;
    private String password;
    private String description;
}
