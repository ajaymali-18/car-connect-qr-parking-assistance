package com.carconnect.carconnect.controller;

import com.carconnect.carconnect.entity.User;
import com.carconnect.carconnect.service.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {

    AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

//    2. Login
    @PostMapping("/login")
    public String login(@RequestBody User user){
        authService.login(user.getEmail(), user.getPassword());
        return "Login Sucess";
    }

}
