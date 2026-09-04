package com.carconnect.carconnect.service;
//for Login and Signup

import com.carconnect.carconnect.dto.LoginRequest;
import com.carconnect.carconnect.dto.SignupRequest;
import com.carconnect.carconnect.entity.Login;
import com.carconnect.carconnect.entity.Signup;
import com.carconnect.carconnect.entity.User;
import com.carconnect.carconnect.repository.AuthServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.autoconfigure.WebMvcProperties;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthServiceRepository authServiceRepository;

    //    @Autowired
    private final PasswordEncoder passwordEncoder;

    public AuthService(AuthServiceRepository authServiceRepository, PasswordEncoder passwordEncoder) {
        this.authServiceRepository = authServiceRepository;
        this.passwordEncoder = passwordEncoder;
    }


//    1. Signup

    public String signup(SignupRequest signupRequestDTO) {
//
        if (signupRequestDTO.getEmail() == null || signupRequestDTO.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email cannot be Empty");
        }
        if (signupRequestDTO.getPassword() == null || signupRequestDTO.getPassword().isBlank()) {

            throw new IllegalArgumentException("Password Cannot be Empty");
        }

        User existingUser = authServiceRepository.findByEmail(signupRequestDTO.getEmail());
        if (existingUser != null) {
            throw new IllegalArgumentException("User with this email already Exists.");
        }
        // Map DTO to User entity
        User newUser = new User();

        newUser.setEmail(signupRequestDTO.getEmail());
//        Password encoder
        String encodedPassword = passwordEncoder.encode(signupRequestDTO.getPassword());

        System.out.println(encodedPassword);

        newUser.setPassword(encodedPassword);

        authServiceRepository.save(newUser);


        return "User Registered Succesfully";

    }


//2.    Login. I


    public String login(LoginRequest loginRequestDTO) {

        if (loginRequestDTO.getEmail() == null || loginRequestDTO.getEmail().isBlank()) {
            return "Email cannot be empty";
        }

        if (loginRequestDTO.getPassword() == null || loginRequestDTO.getPassword().isBlank()) {
            return "Please enter the password";
        }

        User user = authServiceRepository.findByEmail(loginRequestDTO.getEmail());

        if (user == null) {
            return "Email not found";
        }
//        Encode the plain password into hash
        if (!passwordEncoder.matches(loginRequestDTO.getPassword(), user.getPassword())) {
            return "Invalid Password";
        }
        return "Login Successful";
    }
}



