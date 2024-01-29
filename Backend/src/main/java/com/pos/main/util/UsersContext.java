package com.pos.main.util;

import com.pos.main.entity.User;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.List;

@Component
public class UsersContext implements Serializable {

    private ThreadLocal<User> user = new ThreadLocal<>();
    private ThreadLocal<List<String>> roles = new ThreadLocal<>();
    private ThreadLocal<List<String>> authorities = new ThreadLocal<>();

    public void setUser(User u) {
        this.user.set(u);
    }

    public User getUser() {
        return this.user.get();
    }

    public void clearUser() {
        this.user.remove();
    }

    public void setRole(List<String> roles) {
        this.roles.set(roles);
    }

    public void clearRoles() {
        this.roles.remove();
    }

    public List<String> getRoles() {
        return this.roles.get();
    }

    public void setAuths(List<String> auth) {
        this.authorities.set(auth);
    }

    public void clearAuths() {
        this.authorities.remove();
    }

    public List<String> getAuths() {
        return this.authorities.get();
    }
}
