package com.carconnect.carconnect.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;

    @Column(name = "email", unique = true, nullable = false)
    @NotNull
    @Email(message = "Enter a valid email address")

    @NotBlank(message = "Email is Required")
    private String email;
    @NotBlank
    @Column(name = "password")
    private String password;


}
