package com.pos.main.service.impl;

import com.pos.main.security.JwtTokenUtil;
import com.pos.main.dto.UserDTO;
import com.pos.main.entity.User;
import com.pos.main.service.CustomUserDetailsService;
import com.pos.main.service.UserService;
import com.pos.main.util.ResponseDTO;
import com.pos.main.util.SystemUtils;
import com.pos.main.util.UsersContext;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final JwtTokenUtil jwtTokenUtil;
    private final UsersContext context;

    @Override
    public ResponseDTO<UserDTO> login(UserDTO dto) throws Exception{
        ResponseDTO<UserDTO> resp = new ResponseDTO<UserDTO>();
        UserDTO logUser = new UserDTO();
        authenticate(dto.getUserEmail(), dto.getUserPassword());
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(dto.getUserEmail());
        final String token = jwtTokenUtil.generateToken(userDetails);
        if(context != null) {
            User u = context.getUser();
            if(u != null) {
                logUser = convertToDTO(u);
                logUser.setToken(token);
                resp.setData(logUser);
                resp.setMessage("User fund");
                resp.setStatusMessage(SystemUtils.SUCCESS_RESPONSE);
            }else{
                resp.setMessage("User not fund");
                resp.setStatusMessage(SystemUtils.FAILURE_RESPONSE);
            }
        }else{
            resp.setMessage("Context not fund");
            resp.setStatusMessage(SystemUtils.FAILURE_RESPONSE);
        }
        return resp;
    }

    @Override
    public UserDTO convertToDTO(User u) {
        UserDTO dto = new UserDTO();
        dto.setUserEmail(u.getUserEmail());
        dto.setUserFullName(u.getUserFullName());
        dto.setUserId(u.getUserId());
        dto.setUserStatus(u.getUserStatus());
        dto.setUserRole(u.getUserRole());
        return dto;
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
