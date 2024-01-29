package com.pos.main.service.impl;

import com.pos.main.entity.User;
import com.pos.main.repository.UserRepository;
import com.pos.main.service.CustomUserDetailsService;
import com.pos.main.util.UsersContext;
import lombok.RequiredArgsConstructor;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsServiceImpl implements CustomUserDetailsService {

    private final UserRepository userRepo;
    private final UsersContext context;

    @PersistenceContext
    private EntityManager em;

    private Log log = LogFactory.getLog(getClass());

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u = userRepo.getUserByUsername(username);
        if (u != null) {
            if (context != null) {
                context.clearUser();
                context.setUser(u);
            } else {
                log.error("Null Context");
            }

            List<GrantedAuthority> roles = getRoles(u);
            UserDetails ud = new org.springframework.security.core.userdetails.User(u.getUserEmail(), u.getUserPassword(), roles);

            return ud;
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }

    @Override
    public List<GrantedAuthority> getRoles(User u) {
        List<GrantedAuthority> authList = new ArrayList<>();
        GrantedAuthority ga = new SimpleGrantedAuthority("ROLE_" + u.getUserRole().toUpperCase());
        authList.add(ga);
        return authList;
    }
}
