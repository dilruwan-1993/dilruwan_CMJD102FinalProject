package com.pos.main.repository;

import com.pos.main.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    @Query(value = "select * from user WHERE user_status = '1' AND user_email = ?1 ",nativeQuery = true)
    public User getUserByUsername(String email);
}
