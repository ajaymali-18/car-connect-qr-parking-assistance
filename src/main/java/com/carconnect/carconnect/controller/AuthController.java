package com.carconnect.carconnect.controller;

import ch.qos.logback.core.model.Model;
import com.carconnect.carconnect.dto.LoginRequest;
import com.carconnect.carconnect.dto.SignupRequest;
import com.carconnect.carconnect.entity.User;
import com.carconnect.carconnect.service.AuthService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
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

    //    3. Google Auth 2
    @GetMapping("/home")
    public String home(@AuthenticationPrincipal OAuth2User principal, Model model) {
//        model.addAttribute("name", principal.getAttribute("name"));
        return "home";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }


}
