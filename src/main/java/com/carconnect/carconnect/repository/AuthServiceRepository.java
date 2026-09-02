package com.carconnect.carconnect.repository;

import com.carconnect.carconnect.entity.User;


import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthServiceRepository  extends JpaRepository<User,Long> {


}
