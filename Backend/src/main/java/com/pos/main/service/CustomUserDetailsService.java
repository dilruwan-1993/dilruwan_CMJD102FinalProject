package com.pos.main.service;

import com.pos.main.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface CustomUserDetailsService extends UserDetailsService {

    public List<GrantedAuthority> getRoles(User u);
}
