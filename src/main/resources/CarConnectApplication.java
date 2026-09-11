package com.carconnect.carconnect;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CarConnectApplication {

    @Value("${GOOGLE_CLIENT_ID:NOT_FOUND}")
    private String clientId;

    @PostConstruct
    public void checkEnv() {
        System.out.println("GOOGLE_CLIENT_ID = " + clientId);
    }

    public static void main(String[] args) {
        SpringApplication.run(CarConnectApplication.class, args);
        System.out.println("Spring boot stated");

    }
}
