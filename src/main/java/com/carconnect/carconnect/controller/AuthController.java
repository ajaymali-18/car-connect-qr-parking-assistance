package com.carconnect.carconnect.controller;

import com.carconnect.carconnect.dto.LoginRequest;
import com.carconnect.carconnect.dto.SignupRequest;
import com.carconnect.carconnect.entity.User;
import com.carconnect.carconnect.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    //    1 Signup method
    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequest signupRequestDTO) {
        return authService.signup(signupRequestDTO);
    }


    //    2. Login
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequestDTO) {
        return authService.login(loginRequestDTO);

    }

}
