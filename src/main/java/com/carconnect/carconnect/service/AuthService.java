package com.carconnect.carconnect.service;
//for Login and Signup

import com.carconnect.carconnect.entity.User;
import com.carconnect.carconnect.repository.AuthServiceRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthServiceRepository authServiceRepository;

    public AuthService(AuthServiceRepository authServiceRepository) {
        this.authServiceRepository = authServiceRepository;
    }


//2.    Login. I

    public User login(String email, String password) {

        if (email.isBlank()) {
            System.out.println("Email cannot be Empty");
        } else if (password.isBlank()) {
            System.out.println("Please Enter the Password");
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(password);


        return authServiceRepository.save(user);


    }


}
