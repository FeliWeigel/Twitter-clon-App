package com.app.twitterclon.security.auth;

import com.app.twitterclon.exception.BusyCredentialsException;
import com.app.twitterclon.exception.InvalidCredentialsException;
import com.app.twitterclon.exception.NullFieldsException;
import com.app.twitterclon.security.jwt.JwtService;
import com.app.twitterclon.security.jwt.Token;
import com.app.twitterclon.security.jwt.TokenRepository;
import com.app.twitterclon.user.Role;
import com.app.twitterclon.user.User;
import com.app.twitterclon.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;

    private void saveUserToken(User user, String token){
        var saveToken = Token.builder()
                .token(token)
                .user(user)
                .revoked(false)
                .expired(false)
                .build();

        tokenRepository.save(saveToken);
    }

    private void revokeAllUserTokens(User user){
        var validTokens = tokenRepository.allValidTokensByUser(user.getId());

        if(validTokens.isEmpty()){
            return;
        }

        validTokens.forEach(token -> {
            token.setRevoked(true);
            token.setExpired(true);
        });

        tokenRepository.saveAll(validTokens);
    }

    private Boolean isValidPassword(String password){
        boolean isCLetter = false, isNumber = false, isSpecialChar = false;
        Pattern specialsList = Pattern.compile ("[?!¡@¿.,´)]");
        Matcher hasSpecial = specialsList.matcher(password);
        char[] passwordArr = password.toCharArray();

        if(!password.isBlank() && password.length() >= 6){
            for(char i : passwordArr){
                if(Character.isUpperCase(i)){
                    isCLetter = true;
                }else if(Character.isDigit(i)){
                    isNumber = true;
                }else if(hasSpecial.find()){
                    isSpecialChar = true;
                }
            }

        }else{
            return false;
        }

        return isCLetter && isNumber && isSpecialChar;
    }

    public ResponseEntity<AuthResponse> register(RegisterRequest registerRequest){
        if (registerRequest.getFirstname().isBlank() || registerRequest.getLastname().isBlank() ||
                registerRequest.getEmail().isBlank() || registerRequest.getPassword().isBlank() ||
                registerRequest.getRepeatPassword().isBlank() || registerRequest.getBirthdate() == null) {
            throw new NullFieldsException("Warning! Fields cannot be null. Please, complete all credentials.");
        }
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new BusyCredentialsException("The email is associated with an existing account. Please try again.");
        }
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            throw new BusyCredentialsException("The email is associated with an existing account. Please try again.");
        }
        if (registerRequest.getPassword().length() < 6) {
            throw new InvalidCredentialsException("Error! The password must contain six digits or more.");
        }
        if (!isValidPassword(registerRequest.getPassword())) {
            throw new InvalidCredentialsException("Error! The password must contain a capital letter, symbol, and number.");
        }
        if (!registerRequest.getPassword().equals(registerRequest.getRepeatPassword())) {
            throw new InvalidCredentialsException("Error! Passwords must match.");
        }
        if (registerRequest.getBirthdate().after(new java.util.Date())) {
            throw new InvalidCredentialsException("Error! The date entered is not valid.");
        }
        if (calculateAge(registerRequest.getBirthdate()) < 18) {
            throw new InvalidCredentialsException("Error! You must be over 18 years old to register.");
        }

        var user = User.builder()
                .username(registerRequest.getUsername())
                .firstname(registerRequest.getFirstname())
                .lastname(registerRequest.getLastname())
                .email(registerRequest.getEmail())
                .birthdate(registerRequest.getBirthdate())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.USER)
                .build();
        var savedUser = userRepository.save(user);
        var accessToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        saveUserToken(savedUser, accessToken);

        return new ResponseEntity<>(
                AuthResponse.builder()
                        .access_token(accessToken)
                        .refresh_token(refreshToken)
                        .build(),
                HttpStatus.CREATED);
    }

    public ResponseEntity<AuthResponse> login(AuthRequest authRequest){
        if(authRequest.getUsername().isBlank() || authRequest.getPassword().isBlank()){
            throw new NullFieldsException("Warning! Fields cannot be null. Please, complete all credentials.");
        }
        try{
            Authentication auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getUsername(),
                            authRequest.getPassword()
                    )
            );
        } catch (AuthenticationException ex) {
            throw new InvalidCredentialsException("Incorrect username or password, please try again.");
        }

        var user = userRepository.findByUsername(authRequest.getUsername())
                .orElseThrow();
        var accessToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);

        return new ResponseEntity<>(
                AuthResponse.builder()
                        .access_token(accessToken)
                        .refresh_token(refreshToken)
                        .build(),
                HttpStatus.OK
        );
    }

    private int calculateAge(java.util.Date birthdate) {
        java.util.Calendar birthCalendar = java.util.Calendar.getInstance();
        birthCalendar.setTime(birthdate);
        java.util.Calendar now = java.util.Calendar.getInstance();
        int age = now.get(java.util.Calendar.YEAR) - birthCalendar.get(java.util.Calendar.YEAR);
        if (now.get(java.util.Calendar.MONTH) + 1 < birthCalendar.get(java.util.Calendar.MONTH) + 1 ||
                (now.get(java.util.Calendar.MONTH) + 1 == birthCalendar.get(java.util.Calendar.MONTH) + 1 &&
                        now.get(java.util.Calendar.DAY_OF_MONTH) < birthCalendar.get(java.util.Calendar.DAY_OF_MONTH))) {
            age--;
        }
        return age;
    }

}
