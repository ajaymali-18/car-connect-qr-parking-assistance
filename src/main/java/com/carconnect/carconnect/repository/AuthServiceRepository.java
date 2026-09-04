package com.carconnect.carconnect.repository;

import com.carconnect.carconnect.entity.User;


import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthServiceRepository  extends JpaRepository<User,Long> {

//    User user=new User();
public User findByEmail(String email);
public User findByPassword(String password);

}
